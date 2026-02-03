"use client";

import { useEffect, useRef, ReactNode, createContext, useContext } from "react";
import Lenis from "lenis";

// Create context for Lenis instance
const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

interface SmoothScrollProviderProps {
    children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis
        lenisRef.current = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            touchMultiplier: 2,
            infinite: false,
        });

        // Add lenis class to html element
        document.documentElement.classList.add("lenis");

        // Animation frame loop
        function raf(time: number) {
            lenisRef.current?.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenisRef.current?.destroy();
            document.documentElement.classList.remove("lenis");
        };
    }, []);

    return (
        <LenisContext.Provider value={lenisRef.current}>
            {children}
        </LenisContext.Provider>
    );
}

// Scroll progress hook
export function useScrollProgress() {
    const progressRef = useRef(0);
    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) return;

        const handleScroll = ({ progress }: { progress: number }) => {
            progressRef.current = progress;
        };

        lenis.on("scroll", handleScroll);

        return () => {
            lenis.off("scroll", handleScroll);
        };
    }, [lenis]);

    return progressRef;
}
