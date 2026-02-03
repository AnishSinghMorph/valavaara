"use client";

import { useEffect, useRef, ReactNode, CSSProperties } from "react";
import { motion, useInView, Variants } from "framer-motion";

// Animation variants
const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
        }
    },
};

const fadeLeftVariants: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
        }
    },
};

const fadeRightVariants: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
        }
    },
};

const scaleUpVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
        }
    },
};

const staggerContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

type AnimationType = "fadeUp" | "fadeLeft" | "fadeRight" | "scaleUp" | "stagger";

interface AnimatedSectionProps {
    children: ReactNode;
    animation?: AnimationType;
    delay?: number;
    className?: string;
    style?: CSSProperties;
    id?: string;
}

const variantMap: Record<AnimationType, Variants> = {
    fadeUp: fadeUpVariants,
    fadeLeft: fadeLeftVariants,
    fadeRight: fadeRightVariants,
    scaleUp: scaleUpVariants,
    stagger: staggerContainerVariants,
};

export function AnimatedSection({
    children,
    animation = "fadeUp",
    delay = 0,
    className = "",
    style,
    id,
}: AnimatedSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const variants = variantMap[animation];

    return (
        <motion.div
            ref={ref}
            id={id}
            className={className}
            style={style}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                ...variants,
                visible: {
                    ...variants.visible,
                    transition: {
                        ...(variants.visible as Record<string, unknown>).transition,
                        delay,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
}

// Stagger item for use inside stagger containers
interface StaggerItemProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
}

export function StaggerItem({ children, className = "", style }: StaggerItemProps) {
    return (
        <motion.div
            className={className}
            style={style}
            variants={fadeUpVariants}
        >
            {children}
        </motion.div>
    );
}

// Text reveal animation (character by character)
interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
}

export function TextReveal({ text, className = "", delay = 0 }: TextRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            {text.split("").map((char, index) => (
                <motion.span
                    key={index}
                    style={{ display: "inline-block" }}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 0.5,
                                delay: delay + index * 0.03,
                            },
                        },
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.div>
    );
}

// Counter animation for stats
interface AnimatedCounterProps {
    value: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
}

export function AnimatedCounter({
    value,
    suffix = "",
    prefix = "",
    duration = 2,
    className = "",
}: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const countRef = useRef(0);

    useEffect(() => {
        if (!isInView) return;

        const startTime = Date.now();
        const endTime = startTime + duration * 1000;

        const updateCount = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / (duration * 1000), 1);

            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            countRef.current = Math.round(value * easeOutQuart);

            if (ref.current) {
                ref.current.textContent = `${prefix}${countRef.current.toLocaleString()}${suffix}`;
            }

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            }
        };

        requestAnimationFrame(updateCount);
    }, [isInView, value, duration, prefix, suffix]);

    return (
        <span ref={ref} className={className}>
            {prefix}0{suffix}
        </span>
    );
}

// Parallax wrapper
interface ParallaxProps {
    children: ReactNode;
    speed?: number;
    className?: string;
}

export function Parallax({ children, speed = 0.5, className = "" }: ParallaxProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleScroll = () => {
            const rect = element.getBoundingClientRect();
            const scrolled = window.innerHeight - rect.top;
            const yOffset = scrolled * speed * 0.1;
            element.style.transform = `translateY(${yOffset}px)`;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [speed]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

// Floating animation
interface FloatingProps {
    children: ReactNode;
    amplitude?: number;
    duration?: number;
    delay?: number;
    className?: string;
}

export function Floating({
    children,
    amplitude = 10,
    duration = 3,
    delay = 0,
    className = "",
}: FloatingProps) {
    return (
        <motion.div
            className={className}
            animate={{
                y: [-amplitude, amplitude, -amplitude],
            }}
            transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
            }}
        >
            {children}
        </motion.div>
    );
}

// Glow pulse animation
interface GlowPulseProps {
    children: ReactNode;
    color?: string;
    className?: string;
}

export function GlowPulse({
    children,
    color = "rgba(212, 175, 55, 0.5)",
    className = "",
}: GlowPulseProps) {
    return (
        <motion.div
            className={className}
            animate={{
                boxShadow: [
                    `0 0 20px ${color}`,
                    `0 0 60px ${color}`,
                    `0 0 20px ${color}`,
                ],
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            {children}
        </motion.div>
    );
}
