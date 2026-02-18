"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Film, Clapperboard } from "lucide-react";
import { Footer } from "@/components/Footer";
import { FloatingBookButton } from "@/components/BookingBar";
import { ShortsGridWithSections } from "@/components/ShortsGrid";
import { reviewVideos, youtubeReviews } from "@/data/content";
import { instagramReels } from "@/data/reviews";
import { useEffect } from "react";

const tabs = [
    { id: "trailer", label: "Trailer", href: "/watch/trailer", icon: Film },
    { id: "shorts", label: "Shorts", href: "/watch/shorts", icon: Film },
    { id: "bts", label: "BTS", href: "/watch/bts", icon: Clapperboard },
    { id: "reviews", label: "Reviews", href: "/watch/reviews", icon: Film },
];

export function ReviewsPageClient() {
    // Load Instagram embed script
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <>
            <div className="pt-20 pb-16 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Back button */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground mb-6 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Back to Home
                    </Link>

                    {/* Tabs */}
                    <div className="tabs mb-8">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.id}
                                href={tab.href}
                                className={`tab ${tab.id === "reviews" ? "active" : ""}`}
                            >
                                <tab.icon size={16} className="inline mr-1" />
                                {tab.label}
                            </Link>
                        ))}
                    </div>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                            Watch <span className="gradient-text">Reviews</span>
                        </h1>
                        <p className="text-foreground-muted">
                            See what audiences and celebrities are saying about Valavaara 🎭
                        </p>
                    </motion.div>

                    {/* YouTube Celebrity Reviews */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-12"
                    >
                        <h2 className="text-2xl font-bold mb-6">
                            <span className="gradient-text">⭐ Celebrity Review Shorts</span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {youtubeReviews.shorts.map((video) => (
                                <div key={video.id} className="card overflow-hidden">
                                    <div className="aspect-[9/16] relative">
                                        <iframe
                                            src={video.embedUrl}
                                            title={video.title}
                                            className="absolute inset-0 w-full h-full"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        />
                                    </div>
                                    <div className="p-3">
                                        <h3 className="font-bold text-sm text-foreground line-clamp-2">{video.title}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* YouTube Full Reviews */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="mb-12"
                    >
                        <h2 className="text-2xl font-bold mb-6">
                            <span className="gradient-text">🎬 Full Reviews</span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {youtubeReviews.fullVideos.map((video) => (
                                <div key={video.id} className="card overflow-hidden">
                                    <div className="aspect-video relative">
                                        <iframe
                                            src={video.embedUrl}
                                            title={video.title}
                                            className="absolute inset-0 w-full h-full"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        />
                                    </div>
                                    <div className="p-3">
                                        <h3 className="font-bold text-sm text-foreground line-clamp-2">{video.title}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Audience Reviews by City */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-12"
                    >
                        <h2 className="text-2xl font-bold mb-6">
                            <span className="gradient-text">🏙️ Audience Reviews</span>
                        </h2>
                        <p className="text-foreground-muted mb-6">
                            Click on any video to see full screen and download 📥
                        </p>
                        <ShortsGridWithSections
                            sections={[
                                {
                                    title: "🏙️ Bengaluru Reviews",
                                    videos: reviewVideos.bengaluru,
                                },
                                {
                                    title: "🎭 Shivamogga Reviews",
                                    videos: reviewVideos.shivamogga,
                                },
                                {
                                    title: "🌟 Mysuru Reviews",
                                    videos: reviewVideos.mysuru,
                                },
                                {
                                    title: "❤️ General Reviews",
                                    videos: reviewVideos.general,
                                },
                            ]}
                        />
                    </motion.div>

                    {/* Instagram / Social Media Reviews */}
                    {instagramReels && instagramReels.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                        >
                            <h2 className="text-2xl font-bold mb-6">
                                <span className="gradient-text">📱 Social Media Reviews</span>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                {instagramReels.map((reel, index) => (
                                    <div key={index} className="flex flex-col items-center justify-center">
                                        <div
                                            className="instagram-embed-wrapper w-full flex justify-center"
                                            dangerouslySetInnerHTML={{ __html: reel.embedCode }}
                                        />
                                        {reel.date && (
                                            <p className="text-xs text-foreground-muted mt-2">
                                                {new Date(reel.date).toLocaleDateString("en-IN", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            <Footer />
            <FloatingBookButton />
        </>
    );
}
