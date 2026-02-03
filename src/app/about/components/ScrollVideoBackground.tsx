"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "./SmoothScroll";

export function ScrollVideoBackground() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [duration, setDuration] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const lenis = useLenis();

    // Handle video metadata loading
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoadedMetadata = () => {
            setDuration(video.duration);
            setIsLoaded(true);
        };

        // Check if metadata is already loaded
        if (video.readyState >= 1) {
            handleLoadedMetadata();
        } else {
            video.addEventListener('loadedmetadata', handleLoadedMetadata);
            // Fallback: force load state after 1s just in case
            setTimeout(() => setIsLoaded(true), 1000);
        }

        // Ensure video is loaded
        video.load();

        return () => video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    }, []);

    // Sync video time with Lenis scroll using Lerp for smoothness
    useEffect(() => {
        if (!lenis) return;

        let animationFrameId: number;
        // Use a ref to track the "desired" time vs current time
        let targetTimeRef = 0;

        const updateVideo = () => {
            const video = videoRef.current;
            if (video && duration > 0) {
                // Lerp factor - lower is smoother/heavier, higher is faster/stiffer.
                // 0.1 provides a good cinematic weight to the scrubbing.
                const smoothing = 0.1;

                const diff = targetTimeRef - video.currentTime;

                // Only seek if the difference is noticeable to avoid micro-stutters
                if (Math.abs(diff) > 0.05) {
                    video.currentTime += diff * smoothing;
                }
            }
            animationFrameId = requestAnimationFrame(updateVideo);
        };

        const handleScroll = ({ progress }: { progress: number }) => {
            if (duration > 0) {
                // Map scroll progress (0-1) to video duration
                const rawTarget = progress * (duration - 0.1);
                if (Number.isFinite(rawTarget)) {
                    targetTimeRef = rawTarget;
                }
            }
        };

        // Start the loop
        updateVideo();

        lenis.on("scroll", handleScroll);

        return () => {
            lenis.off("scroll", handleScroll);
            cancelAnimationFrame(animationFrameId);
        };
    }, [lenis, duration]);

    return (
        <div
            ref={containerRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                zIndex: -1,
                overflow: "hidden",
                backgroundColor: "#000",
            }}
        >
            <video
                ref={videoRef}
                src="/assets/videos/morph-logo-4k.mp4"
                preload="auto"
                muted
                playsInline
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: isLoaded ? 0.4 : 0, // Lower opacity to make content readable
                    transition: "opacity 1s ease-in-out",
                    willChange: "contents" // Hint to browser to optimize for changes
                }}
            />

            {/* Overlay gradient to help text readability */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.4), rgba(0,0,0,0.8))",
                    pointerEvents: "none",
                }}
            />
        </div>
    );
}
