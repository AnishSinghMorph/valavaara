"use client";

import { ReactNode } from "react";
import { AnimatedSection, AnimatedCounter, StaggerItem } from "./AnimatedSection";
import { motion } from "framer-motion";

// Card component
interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
    return (
        <div className={`pitch-card ${hover ? "" : "no-hover"} ${className}`}>
            {children}
        </div>
    );
}

// Image card for cast, team, etc.
interface ImageCardProps {
    image: string;
    name: string;
    role?: string;
    description?: string;
    delay?: number;
}

export function ImageCard({
    image,
    name,
    role,
    description,
    delay = 0,
}: ImageCardProps) {
    return (
        <AnimatedSection animation="scaleUp" delay={delay}>
            <div className="pitch-image-card">
                <img src={image} alt={name} />
                <div className="pitch-image-overlay">
                    <h4 className="pitch-title-sm">{name}</h4>
                    {role && (
                        <span className="pitch-label" style={{ marginTop: "4px" }}>
                            {role}
                        </span>
                    )}
                    {description && (
                        <p className="pitch-text-muted" style={{ marginTop: "8px", fontSize: "14px" }}>
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </AnimatedSection>
    );
}

// Stats card
interface StatCardProps {
    value: number;
    label: string;
    prefix?: string;
    suffix?: string;
    delay?: number;
}

export function StatCard({
    value,
    label,
    prefix = "",
    suffix = "",
    delay = 0,
}: StatCardProps) {
    return (
        <AnimatedSection animation="fadeUp" delay={delay}>
            <div className="pitch-card pitch-stat">
                <div className="pitch-stat-value">
                    <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
                </div>
                <div className="pitch-stat-label">{label}</div>
            </div>
        </AnimatedSection>
    );
}

// Quote card
interface QuoteCardProps {
    quote: string;
    author: string;
    role?: string;
    image?: string;
    delay?: number;
}

export function QuoteCard({
    quote,
    author,
    role,
    image,
    delay = 0,
}: QuoteCardProps) {
    return (
        <AnimatedSection animation="fadeUp" delay={delay}>
            <div className="pitch-card" style={{ padding: "40px" }}>
                <p className="pitch-quote-text" style={{ marginBottom: "24px" }}>"{quote}"</p>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        marginTop: "32px",
                    }}
                >
                    {image && (
                        <img
                            src={image}
                            alt={author}
                            style={{
                                width: "56px",
                                height: "56px",
                                borderRadius: "50%",
                                objectFit: "cover",
                            }}
                        />
                    )}
                    <div>
                        <div className="pitch-title-sm">{author}</div>
                        {role && <div className="pitch-text-muted" style={{ marginTop: "4px" }}>{role}</div>}
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}

// Feature card
interface FeatureCardProps {
    icon?: ReactNode;
    title: string;
    description: string;
    delay?: number;
}

export function FeatureCard({
    icon,
    title,
    description,
    delay = 0,
}: FeatureCardProps) {
    return (
        <AnimatedSection animation="fadeUp" delay={delay}>
            <div className="pitch-card">
                {icon && (
                    <div
                        style={{
                            width: "56px",
                            height: "56px",
                            borderRadius: "16px",
                            background: "rgba(212, 175, 55, 0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--pitch-accent-primary)",
                            marginBottom: "20px",
                        }}
                    >
                        {icon}
                    </div>
                )}
                <h4 className="pitch-title-sm">{title}</h4>
                <p className="pitch-text" style={{ marginTop: "12px" }}>
                    {description}
                </p>
            </div>
        </AnimatedSection>
    );
}

// Media card (for press, social media, etc.)
interface MediaCardProps {
    image?: string;
    outlet: string;
    headline?: string;
    type?: "newspaper" | "tv" | "social";
    delay?: number;
}

export function MediaCard({
    image,
    outlet,
    headline,
    type = "newspaper",
    delay = 0,
}: MediaCardProps) {
    return (
        <AnimatedSection animation="scaleUp" delay={delay}>
            <div className="pitch-card" style={{ padding: 0, overflow: "hidden" }}>
                {image && (
                    <div
                        style={{
                            aspectRatio: type === "social" ? "1/1" : "16/10",
                            overflow: "hidden",
                        }}
                    >
                        <img
                            src={image}
                            alt={outlet}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                transition: "transform 0.6s ease",
                            }}
                            onMouseOver={(e) => {
                                (e.target as HTMLImageElement).style.transform = "scale(1.05)";
                            }}
                            onMouseOut={(e) => {
                                (e.target as HTMLImageElement).style.transform = "scale(1)";
                            }}
                        />
                    </div>
                )}
                <div style={{ padding: "20px" }}>
                    <span className="pitch-label">{type.toUpperCase()}</span>
                    <h5 className="pitch-title-sm" style={{ marginTop: "8px" }}>
                        {outlet}
                    </h5>
                    {headline && (
                        <p className="pitch-text-muted" style={{ marginTop: "8px", fontSize: "14px" }}>
                            {headline}
                        </p>
                    )}
                </div>
            </div>
        </AnimatedSection>
    );
}

// Gallery card
interface GalleryCardProps {
    image: string;
    caption?: string;
    delay?: number;
}

export function GalleryCard({ image, caption, delay = 0 }: GalleryCardProps) {
    return (
        <AnimatedSection animation="scaleUp" delay={delay}>
            <motion.div
                className="pitch-card"
                style={{ padding: 0, overflow: "hidden", cursor: "pointer" }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                    <img
                        src={image}
                        alt={caption || "Gallery image"}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                </div>
                {caption && (
                    <div style={{ padding: "16px" }}>
                        <p className="pitch-text-muted" style={{ fontSize: "14px" }}>
                            {caption}
                        </p>
                    </div>
                )}
            </motion.div>
        </AnimatedSection>
    );
}

// Rating card for critics
interface RatingCardProps {
    source: string;
    rating: string;
    maxRating?: string;
    delay?: number;
}

export function RatingCard({
    source,
    rating,
    maxRating = "5",
    delay = 0,
}: RatingCardProps) {
    return (
        <AnimatedSection animation="fadeUp" delay={delay}>
            <div className="pitch-card" style={{ textAlign: "center" }}>
                <div
                    className="pitch-gradient-gold"
                    style={{ fontSize: "48px", fontWeight: "800" }}
                >
                    {rating}
                    <span style={{ fontSize: "24px", opacity: 0.5 }}>/{maxRating}</span>
                </div>
                <div className="pitch-label" style={{ marginTop: "12px" }}>
                    {source}
                </div>
            </div>
        </AnimatedSection>
    );
}

// Award card
interface AwardCardProps {
    icon?: ReactNode;
    title: string;
    category: string;
    year?: string;
    delay?: number;
}

export function AwardCard({
    icon,
    title,
    category,
    year,
    delay = 0,
}: AwardCardProps) {
    return (
        <AnimatedSection animation="scaleUp" delay={delay}>
            <div
                className="pitch-glass-card"
                style={{
                    padding: "32px",
                    textAlign: "center",
                }}
            >
                {icon && (
                    <div
                        style={{
                            fontSize: "48px",
                            marginBottom: "16px",
                        }}
                    >
                        {icon}
                    </div>
                )}
                <h4 className="pitch-title-sm pitch-gradient-gold">{title}</h4>
                <p className="pitch-text-muted" style={{ marginTop: "8px" }}>
                    {category}
                </p>
                {year && (
                    <span className="pitch-badge" style={{ marginTop: "16px" }}>
                        {year}
                    </span>
                )}
            </div>
        </AnimatedSection>
    );
}
