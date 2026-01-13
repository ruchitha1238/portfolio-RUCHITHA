'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

export default function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    // Track scroll direction
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;

        // Hide if scrolling down AND scrolled past 100px
        if (latest > previous && latest > 100) {
            setHidden(true);
        }
        // Show if scrolling up
        else {
            setHidden(false);
        }
    });

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else if (id === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <motion.nav
            variants={{
                visible: { y: 0, opacity: 1 },
                hidden: { y: "-100%", opacity: 0 }
            }}
            initial="visible"
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-md bg-black/30 border-b border-white/10"
        >
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    TR
                </div>
                <span className="text-white font-bold tracking-tight text-lg">Ruchitha</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
                {['Home', 'Projects', 'Contact'].map((item) => (
                    <button
                        key={item}
                        onClick={() => scrollToSection(item.toLowerCase())}
                        className="text-gray-300 hover:text-white hover:text-cyan-400 transition-colors text-sm uppercase tracking-widest font-medium"
                    >
                        {item}
                    </button>
                ))}
            </div>

            {/* Mobile Menu Button - simplified for now */}
            <div className="md:hidden text-white">
                <span className="text-xs uppercase tracking-widest">Menu</span>
            </div>
        </motion.nav>
    );
}
