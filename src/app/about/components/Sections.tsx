"use client";

import { ReactNode } from "react";
import { AnimatedSection, TextReveal, Floating } from "./AnimatedSection";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
    title: string;
    subtitle?: string;
    badge?: string;
    backgroundImage?: string;
    children?: ReactNode;
    transparent?: boolean;
}

export function HeroSection({
    title,
    subtitle,
    badge,
    backgroundImage,
    children,
    transparent = false,
}: HeroSectionProps) {
    return (
        <section className="pitch-hero" id="hero">
            {/* Background - only show if not transparent */}
            {!transparent && (
                <div className="pitch-hero-bg">
                    {backgroundImage && (
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                backgroundImage: `url(${backgroundImage})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                opacity: 0.15,
                                filter: "blur(2px)",
                            }}
                        />
                    )}
                </div>
            )}

            {/* Floating orbs */}
            <Floating amplitude={15} duration={4} delay={0}>
                <div
                    className="pitch-orb pitch-orb-gold"
                    style={{
                        width: "400px",
                        height: "400px",
                        top: "10%",
                        left: "5%",
                        position: "absolute",
                    }}
                />
            </Floating>
            <Floating amplitude={20} duration={5} delay={1}>
                <div
                    className="pitch-orb pitch-orb-purple"
                    style={{
                        width: "300px",
                        height: "300px",
                        top: "60%",
                        right: "10%",
                        position: "absolute",
                    }}
                />
            </Floating>
            <Floating amplitude={12} duration={6} delay={2}>
                <div
                    className="pitch-orb pitch-orb-pink"
                    style={{
                        width: "250px",
                        height: "250px",
                        bottom: "20%",
                        left: "20%",
                        position: "absolute",
                    }}
                />
            </Floating>

            {/* Content */}
            <div className="pitch-hero-content">
                {badge && (
                    <AnimatedSection animation="fadeUp" delay={0}>
                        <span className="pitch-badge pitch-badge-gold">{badge}</span>
                    </AnimatedSection>
                )}

                <AnimatedSection animation="fadeUp" delay={0.2}>
                    <h1 className="pitch-title-xl" style={{ marginTop: "24px" }}>
                        <TextReveal text={title} delay={0.4} />
                    </h1>
                </AnimatedSection>

                {subtitle && (
                    <AnimatedSection animation="fadeUp" delay={0.6}>
                        <p className="pitch-subtitle" style={{ margin: "32px auto 0", textAlign: "center" }}>
                            {subtitle}
                        </p>
                    </AnimatedSection>
                )}

                {children && (
                    <AnimatedSection animation="fadeUp" delay={0.8}>
                        <div style={{ marginTop: "48px" }}>{children}</div>
                    </AnimatedSection>
                )}
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="pitch-scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
            >
                <span style={{ fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase" }}>
                    Scroll to explore
                </span>
                <ChevronDown size={20} />
                <div className="pitch-scroll-line" />
            </motion.div>
        </section>
    );
}

// Section wrapper component
interface SectionProps {
    children: ReactNode;
    className?: string;
    gradient?: 1 | 2 | 3;
    id?: string;
    fullHeight?: boolean;
    transparent?: boolean;
}

export function Section({
    children,
    className = "",
    gradient = 1,
    id,
    fullHeight = true,
    transparent = false,
}: SectionProps) {
    return (
        <section
            id={id}
            className={`pitch-section ${!transparent ? `pitch-section-gradient-${gradient}` : ""} ${className}`}
            style={{
                minHeight: fullHeight ? "100vh" : "auto",
                background: transparent ? 'transparent' : undefined
            }}
        >
            <div className="pitch-section-content">{children}</div>
        </section>
    );
}

// Section header component
interface SectionHeaderProps {
    label?: string;
    title: string;
    subtitle?: string;
    align?: "left" | "center";
}

export function SectionHeader({
    label,
    title,
    subtitle,
    align = "center",
}: SectionHeaderProps) {
    return (
        <div style={{ textAlign: align, marginBottom: "64px" }}>
            {label && (
                <AnimatedSection animation="fadeUp">
                    <span className="pitch-label">{label}</span>
                </AnimatedSection>
            )}
            <AnimatedSection animation="fadeUp" delay={0.1}>
                <h2
                    className="pitch-title-lg"
                    style={{ marginTop: label ? "16px" : 0 }}
                >
                    {title}
                </h2>
            </AnimatedSection>
            {subtitle && (
                <AnimatedSection animation="fadeUp" delay={0.2}>
                    <p
                        className="pitch-subtitle"
                        style={{
                            marginTop: "24px",
                            marginLeft: align === "center" ? "auto" : 0,
                            marginRight: align === "center" ? "auto" : 0,
                        }}
                    >
                        {subtitle}
                    </p>
                </AnimatedSection>
            )}
        </div>
    );
}
