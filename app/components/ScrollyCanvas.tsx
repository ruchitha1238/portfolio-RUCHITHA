'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { useScroll, useMotionValueEvent, useTransform } from 'framer-motion';

interface ScrollyCanvasProps {
    framePaths: string[];
}

export default function ScrollyCanvas({ framePaths }: ScrollyCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Store loaded images
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const [allLoaded, setAllLoaded] = useState(false);

    // Scroll Progress
    const { scrollYProgress } = useScroll({
        target: containerRef, // The 500vh container
        offset: ['start start', 'end end'],
    });

    // Map 0-1 to Frame Index 0..N-1
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, framePaths.length - 1]);

    // Preload Images
    useEffect(() => {
        let active = true;
        const preload = async () => {
            const loaded: HTMLImageElement[] = [];
            let count = 0;

            // We load all images. In production, could chunk this.
            const promises = framePaths.map((path) => {
                return new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    img.src = path;
                    img.onload = () => {
                        resolve(img);
                        if (active) setLoadedCount((prev) => prev + 1);
                    };
                    img.onerror = () => reject(path);
                });
            });

            try {
                const results = await Promise.all(promises);
                if (active) {
                    imagesRef.current = results;
                    setAllLoaded(true);
                    // Initial draw
                    requestAnimationFrame(() => draw(0));
                }
            } catch (e) {
                console.error("Failed to load frames", e);
            }
        };

        preload();
        return () => { active = false; };
    }, [framePaths]);

    // Draw Function (Cover Logic)
    const draw = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !imagesRef.current.length) return;

        // Safety clamp
        const safeIndex = Math.max(0, Math.min(Math.floor(index), imagesRef.current.length - 1));
        const img = imagesRef.current[safeIndex];
        if (!img) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Dimensions
        const cw = canvas.width;
        const ch = canvas.height;
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;

        // Object-Fit: Cover Logic
        const targetRatio = cw / ch;
        const sourceRatio = iw / ih;

        let sx = 0, sy = 0, sw = iw, sh = ih;

        if (sourceRatio > targetRatio) {
            // Source is wider than target. Crop width.
            sw = ih * targetRatio;
            sx = (iw - sw) / 2;
        } else {
            // Source is taller than target. Crop height.
            sh = iw / targetRatio;
            sy = (ih - sh) / 2;
        }

        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
    };

    // Sync Scroll to Draw
    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (allLoaded) {
            requestAnimationFrame(() => draw(latest));
        }
    });

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                // Redraw current frame
                draw(frameIndex.get());
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial
        return () => window.removeEventListener('resize', handleResize);
    }, [allLoaded]);

    return (
        <div ref={containerRef} className="relative h-[500vh] bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {!allLoaded && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black text-white">
                        <div className="text-2xl font-light tracking-widest">
                            INITIALIZING SEQUENCE {Math.round((loadedCount / framePaths.length) * 100)}%
                        </div>
                    </div>
                )}
                <canvas
                    ref={canvasRef}
                    className="block h-full w-full object-cover"
                />
            </div>
        </div>
    );
}
