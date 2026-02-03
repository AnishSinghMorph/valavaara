"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

// Marquee component
interface MarqueeProps {
    items: string[];
    speed?: number;
    separator?: ReactNode;
}

export function Marquee({
    items,
    speed = 30,
    separator = "★",
}: MarqueeProps) {
    const content = items.map((item, i) => (
        <span key={i} className="pitch-marquee-item">
            {item}
            <span>{separator}</span>
        </span>
    ));

    return (
        <div className="pitch-marquee">
            <div
                className="pitch-marquee-content"
                style={{
                    animationDuration: `${speed}s`,
                }}
            >
                {content}
                {content}
                {content}
            </div>
        </div>
    );
}

// Loading screen with animation
interface LoadingScreenProps {
    onComplete?: () => void;
    movieTitle?: string;
}

export function LoadingScreen({ movieTitle = "VALAVAARA" }: LoadingScreenProps) {
    return (
        <motion.div
            className="pitch-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="pitch-loader-content">
                <motion.div
                    className="pitch-gradient-gold"
                    style={{
                        fontSize: "clamp(32px, 6vw, 56px)",
                        fontWeight: "800",
                        letterSpacing: "8px",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {movieTitle}
                </motion.div>
                <motion.div
                    style={{
                        marginTop: "16px",
                        fontSize: "12px",
                        letterSpacing: "4px",
                        color: "var(--pitch-text-muted)",
                        textTransform: "uppercase",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Pitch Deck
                </motion.div>
                <div className="pitch-loader-bar">
                    <div className="pitch-loader-progress" />
                </div>
            </div>
        </motion.div>
    );
}

// Divider components
export function Divider() {
    return <div className="pitch-divider" />;
}

export function GlowDivider() {
    return <div className="pitch-divider-glow" />;
}

// Background orb for sections
interface BackgroundOrbProps {
    color: "gold" | "purple" | "pink" | "blue";
    size?: number;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
}

export function BackgroundOrb({
    color,
    size = 300,
    top,
    left,
    right,
    bottom,
}: BackgroundOrbProps) {
    return (
        <div
            className={`pitch-orb pitch-orb-${color}`}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                top,
                left,
                right,
                bottom,
                position: "absolute",
            }}
        />
    );
}

// Grid wrappers
interface GridProps {
    children: ReactNode;
    columns?: 2 | 3 | 4;
    className?: string;
}

export function Grid({ children, columns = 3, className = "" }: GridProps) {
    return (
        <div className={`pitch-grid-${columns} ${className}`}>{children}</div>
    );
}

// Horizontal scroll container
interface HorizontalScrollProps {
    children: ReactNode;
    className?: string;
}

export function HorizontalScroll({ children, className = "" }: HorizontalScrollProps) {
    return (
        <div className={`pitch-horizontal-scroll ${className}`}>
            <div className="pitch-horizontal-content">{children}</div>
        </div>
    );
}

// Video embed
interface VideoEmbedProps {
    src: string;
    poster?: string;
    aspectRatio?: string;
}

export function VideoEmbed({
    src,
    poster,
    aspectRatio = "16/9",
}: VideoEmbedProps) {
    return (
        <div
            className="pitch-card"
            style={{
                padding: 0,
                overflow: "hidden",
                aspectRatio,
            }}
        >
            <video
                src={src}
                poster={poster}
                controls
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />
        </div>
    );
}

// YouTube embed
interface YouTubeEmbedProps {
    videoId: string;
    aspectRatio?: string;
}

export function YouTubeEmbed({ videoId, aspectRatio = "16/9" }: YouTubeEmbedProps) {
    return (
        <div
            className="pitch-card"
            style={{
                padding: 0,
                overflow: "hidden",
                aspectRatio,
            }}
        >
            <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: "none" }}
            />
        </div>
    );
}

// CTA Section
interface CTASectionProps {
    title: string;
    subtitle?: string;
    primaryButton?: {
        label: string;
        href?: string;
        onClick?: () => void;
    };
    secondaryButton?: {
        label: string;
        href?: string;
        onClick?: () => void;
    };
}

export function CTASection({
    title,
    subtitle,
    primaryButton,
    secondaryButton,
}: CTASectionProps) {
    return (
        <div
            style={{
                textAlign: "center",
                padding: "80px 24px",
                background:
                    "radial-gradient(ellipse at center, rgba(212, 175, 55, 0.15) 0%, transparent 60%), var(--pitch-bg-primary)",
            }}
        >
            <h2 className="pitch-title-lg">{title}</h2>
            {subtitle && (
                <p className="pitch-subtitle" style={{ margin: "24px auto 0" }}>
                    {subtitle}
                </p>
            )}
            <div
                style={{
                    display: "flex",
                    gap: "16px",
                    justifyContent: "center",
                    marginTop: "40px",
                    flexWrap: "wrap",
                }}
            >
                {primaryButton && (
                    <a
                        href={primaryButton.href}
                        onClick={primaryButton.onClick}
                        className="pitch-btn-primary"
                    >
                        {primaryButton.label}
                    </a>
                )}
                {secondaryButton && (
                    <a
                        href={secondaryButton.href}
                        onClick={secondaryButton.onClick}
                        className="pitch-btn-outline"
                    >
                        {secondaryButton.label}
                    </a>
                )}
            </div>
        </div>
    );
}

// Footer
interface FooterProps {
    companyName?: string;
    contactEmail?: string;
}

export function Footer({
    companyName = "Morph Productions",
    contactEmail = "contact@morphproductions.in",
}: FooterProps) {
    return (
        <footer
            style={{
                padding: "60px 24px",
                textAlign: "center",
                borderTop: "1px solid var(--pitch-glass-border)",
                background: "var(--pitch-bg-primary)",
            }}
        >
            <div
                className="pitch-gradient-gold"
                style={{
                    fontSize: "24px",
                    fontWeight: "800",
                    letterSpacing: "4px",
                }}
            >
                VALAVAARA
            </div>
            <p
                className="pitch-text-muted"
                style={{ marginTop: "16px", fontSize: "14px" }}
            >
                A {companyName} Film
            </p>

            {/* Social Media Links */}
            <div style={{ marginTop: "32px", display: "flex", gap: "16px", justifyContent: "center", alignItems: "center" }}>
                <a
                    href="https://www.facebook.com/morphproductionsofficial/?rdid=XrXxq15HnL1pYfVR"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        color: "var(--pitch-text-muted)",
                        transition: "color 0.3s",
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = "var(--pitch-accent-primary)"}
                    onMouseOut={(e) => e.currentTarget.style.color = "var(--pitch-text-muted)"}
                    aria-label="Facebook"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                </a>
                <a
                    href="https://www.youtube.com/@morph_productions"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        color: "var(--pitch-text-muted)",
                        transition: "color 0.3s",
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = "var(--pitch-accent-primary)"}
                    onMouseOut={(e) => e.currentTarget.style.color = "var(--pitch-text-muted)"}
                    aria-label="YouTube"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                </a>
                <a
                    href="https://x.com/MorphProX"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        color: "var(--pitch-text-muted)",
                        transition: "color 0.3s",
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = "var(--pitch-accent-primary)"}
                    onMouseOut={(e) => e.currentTarget.style.color = "var(--pitch-text-muted)"}
                    aria-label="X (Twitter)"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                </a>
                <a
                    href="https://www.instagram.com/morph_productions/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        color: "var(--pitch-text-muted)",
                        transition: "color 0.3s",
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = "var(--pitch-accent-primary)"}
                    onMouseOut={(e) => e.currentTarget.style.color = "var(--pitch-text-muted)"}
                    aria-label="Instagram"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                </a>
            </div>

            {contactEmail && (
                <a
                    href={`mailto:${contactEmail}`}
                    style={{
                        display: "inline-block",
                        marginTop: "24px",
                        color: "var(--pitch-accent-primary)",
                        fontSize: "14px",
                        textDecoration: "none",
                    }}
                >
                    {contactEmail}
                </a>
            )}
            <p
                className="pitch-text-muted"
                style={{ marginTop: "40px", fontSize: "12px" }}
            >
                © {new Date().getFullYear()} All Rights Reserved
            </p>
        </footer>
    );
}
