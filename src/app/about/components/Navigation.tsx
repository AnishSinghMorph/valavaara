"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "./SmoothScroll";

interface NavItem {
    id: string;
    label: string;
}

interface NavigationDotsProps {
    items: NavItem[];
}

export function NavigationDots({ items }: NavigationDotsProps) {
    const [activeSection, setActiveSection] = useState(items[0]?.id || "");
    const lenis = useLenis();

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            for (const item of items) {
                const element = document.getElementById(item.id);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight
                    ) {
                        setActiveSection(item.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [items]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element && lenis) {
            lenis.scrollTo(element, { offset: 0 });
        } else if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav className="pitch-nav-dots">
            {items.map((item) => (
                <motion.button
                    key={item.id}
                    className={`pitch-nav-dot ${activeSection === item.id ? "active" : ""}`}
                    onClick={() => scrollToSection(item.id)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    title={item.label}
                />
            ))}
        </nav>
    );
}

// Full navigation menu (mobile friendly)
interface NavigationMenuProps {
    items: NavItem[];
    movieTitle?: string;
}

export function NavigationMenu({ items, movieTitle = "VALAVAARA" }: NavigationMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const lenis = useLenis();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element && lenis) {
            lenis.scrollTo(element, { offset: 0 });
        } else if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setIsOpen(false);
    };

    return (
        <>
            {/* Fixed header */}
            <motion.header
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    padding: "20px 32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: scrolled
                        ? "rgba(10, 10, 15, 0.9)"
                        : "transparent",
                    backdropFilter: scrolled ? "blur(20px)" : "none",
                    borderBottom: scrolled
                        ? "1px solid rgba(255, 255, 255, 0.1)"
                        : "none",
                    transition: "all 0.3s ease",
                }}
            >
                <motion.div
                    className="pitch-gradient-gold"
                    style={{
                        fontSize: "24px",
                        fontWeight: "800",
                        letterSpacing: "4px",
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    {movieTitle}
                </motion.div>

                {/* Menu button */}
                <motion.button
                    onClick={() => setIsOpen(true)}
                    style={{
                        background: "transparent",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "8px",
                        padding: "10px 20px",
                        color: "var(--pitch-text-primary)",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "600",
                        letterSpacing: "1px",
                    }}
                    whileHover={{ borderColor: "var(--pitch-accent-primary)" }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    MENU
                </motion.button>
            </motion.header>

            {/* Full screen menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 2000,
                            background: "rgba(10, 10, 15, 0.98)",
                            backdropFilter: "blur(40px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                position: "absolute",
                                top: "20px",
                                right: "32px",
                                background: "transparent",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                borderRadius: "8px",
                                padding: "10px 20px",
                                color: "var(--pitch-text-primary)",
                                cursor: "pointer",
                                fontSize: "14px",
                                fontWeight: "600",
                                letterSpacing: "1px",
                            }}
                        >
                            CLOSE
                        </button>

                        <nav style={{ textAlign: "center" }}>
                            {items.map((item, index) => (
                                <motion.button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    style={{
                                        display: "block",
                                        width: "100%",
                                        padding: "16px 32px",
                                        margin: "8px 0",
                                        background: "transparent",
                                        border: "none",
                                        color: "var(--pitch-text-secondary)",
                                        fontSize: "clamp(24px, 4vw, 36px)",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                        transition: "color 0.3s ease",
                                    }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ color: "var(--pitch-accent-primary)" }}
                                >
                                    {item.label}
                                </motion.button>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

// Progress bar
export function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = (scrollTop / docHeight) * 100;
            setProgress(scrollProgress);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: "rgba(255, 255, 255, 0.05)",
                zIndex: 1001,
            }}
        >
            <motion.div
                style={{
                    height: "100%",
                    background: "linear-gradient(90deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%)",
                    width: `${progress}%`,
                }}
                transition={{ duration: 0.1 }}
            />
        </div>
    );
}
