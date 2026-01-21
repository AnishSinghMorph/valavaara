"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

interface VideoPlayerProps {
    src: string;
    poster?: string;
    title?: string;
    aspectRatio?: "16:9" | "9:16";
    autoPlay?: boolean;
}

export function VideoPlayer({
    src,
    poster,
    title,
    aspectRatio = "16:9",
    autoPlay = false,
}: VideoPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showOverlay, setShowOverlay] = useState(!autoPlay);

    const handlePlay = () => {
        setShowOverlay(false);
        setIsPlaying(true);
    };

    return (
        <div
            className={`video-container ${aspectRatio === "9:16" ? "vertical" : ""}`}
        >
            {/* Placeholder for actual video - will use real video when assets are provided */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                {poster ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={poster}
                        alt={title || "Video thumbnail"}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <div className="text-center text-white">
                        <span className="text-6xl mb-4 block">🎬</span>
                        <p className="text-lg font-medium">{title || "Video Player"}</p>
                        <p className="text-sm opacity-70 mt-2">Video placeholder</p>
                    </div>
                )}
            </div>

            {/* Play Button Overlay */}
            {showOverlay && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="play-button-overlay"
                    onClick={handlePlay}
                >
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="play-button"
                    >
                        <Play size={32} fill="var(--primary)" />
                    </motion.div>
                </motion.div>
            )}

            {/* Video Controls (placeholder) */}
            {isPlaying && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
                >
                    <div className="flex items-center gap-4 text-white">
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="hover:text-primary transition-colors"
                        >
                            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                        </button>
                        <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                            <div className="h-full w-1/3 bg-primary rounded-full" />
                        </div>
                        <span className="text-sm">0:00 / 2:34</span>
                        <button className="hover:text-primary transition-colors">
                            <Volume2 size={20} />
                        </button>
                        <button className="hover:text-primary transition-colors">
                            <Maximize size={20} />
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

// Simple thumbnail video card
interface VideoThumbnailProps {
    thumbnail?: string;
    title: string;
    duration: string;
    onClick?: () => void;
}

export function VideoThumbnail({
    thumbnail,
    title,
    duration,
    onClick,
}: VideoThumbnailProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group"
            onClick={onClick}
        >
            {thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={thumbnail}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                    <span className="text-4xl">🎬</span>
                </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                    <Play size={24} fill="var(--primary)" className="text-primary ml-1" />
                </div>
            </div>

            {/* Duration badge */}
            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-white text-xs font-medium">
                {duration}
            </div>
        </motion.div>
    );
}
