'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export default function Overlay() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Parallax transforms
    // Section 1: Fades out quickly
    const opacity1 = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.1], [0, -100]);

    // Section 2: Fades in/out around 30%
    const opacity2 = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.15, 0.45], [100, -100]);

    // Section 3: Fades in/out around 60%
    const opacity3 = useTransform(scrollYProgress, [0.45, 0.55, 0.65, 0.75], [0, 1, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.45, 0.75], [100, -100]);

    // Colors
    const color1 = useTransform(scrollYProgress, [0, 0.2], ["#ffffff", "#22d3ee"]); // White -> Cyan
    const color2 = useTransform(scrollYProgress, [0.15, 0.45], ["#e879f9", "#22d3ee"]); // Fuchsia -> Cyan
    const color3 = useTransform(scrollYProgress, [0.45, 0.75], ["#4ade80", "#60a5fa"]); // Green -> Blue

    return (
        <div ref={containerRef} className="absolute inset-0 h-[500vh] w-full z-10 pointer-events-none">

            {/* Section 1 */}
            <div className="sticky top-0 h-screen flex items-center justify-center">
                <motion.div style={{ opacity: opacity1, y: y1 }} className="text-center px-4">
                    {/* Fallback Avatar */}


                    <motion.h1 style={{ color: color1 }} className="text-6xl md:text-8xl font-bold tracking-tighter drop-shadow-lg">
                        Tadimarri Ruchitha
                    </motion.h1>
                    <p className="mt-4 text-xl md:text-2xl text-gray-200 font-light tracking-wide uppercase drop-shadow-md">
                        Computer Science Student
                    </p>
                </motion.div>
            </div>

            {/* Section 2 */}
            <div className="sticky top-0 h-screen flex items-center justify-start pl-10 md:pl-32">
                <motion.div style={{ opacity: opacity2, y: y2 }} className="max-w-xl">
                    <motion.h2 style={{ color: color2 }} className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">
                        Turning complex problems<br />into simple solutions.
                    </motion.h2>
                    <p className="mt-6 text-lg text-white font-medium drop-shadow-md">
                        Passionate about web development and problem-solving.
                    </p>
                </motion.div>
            </div>

            {/* Section 3 */}
            <div className="sticky top-0 h-screen flex items-center justify-end pr-10 md:pr-32">
                <motion.div style={{ opacity: opacity3, y: y3 }} className="max-w-xl text-right">
                    <motion.h2 style={{ color: color3 }} className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">
                        Aspiring Full-Stack<br />Developer.
                    </motion.h2>
                    <p className="mt-6 text-lg text-white font-medium drop-shadow-md">
                        Building impactful web applications.
                    </p>
                </motion.div>
            </div>

        </div>
    );
}
