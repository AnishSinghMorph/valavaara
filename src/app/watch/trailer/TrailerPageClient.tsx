"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Ticket, Film, Clapperboard, Music, Download } from "lucide-react";
import { ShareBar } from "@/components/ShareButton";
import { Footer } from "@/components/Footer";
import { FloatingBookButton } from "@/components/BookingBar";
import { trailer, movieInfo, shorts, BOOKING_URL } from "@/data/content";

const tabs = [
    { id: "trailer", label: "Trailer", href: "/watch/trailer", icon: Film },
    { id: "shorts", label: "Shorts", href: "/watch/shorts", icon: Film },
    { id: "bts", label: "BTS", href: "/watch/bts", icon: Clapperboard },
];

// Extract YouTube video ID from trailer URL
const getYouTubeVideoId = (url: string) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : "";
};

const YOUTUBE_VIDEO_ID = getYouTubeVideoId(trailer.videoUrl);

export function TrailerPageClient() {
    return (
        <>
            <div className="pt-20 pb-16 px-4">
                <div className="max-w-4xl mx-auto">
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
                                className={`tab ${tab.id === "trailer" ? "active" : ""}`}
                            >
                                <tab.icon size={16} className="inline mr-1" />
                                {tab.label}
                            </Link>
                        ))}
                    </div>

                    {/* YouTube Iframe Player */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black"
                    >
                        <iframe
                            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1`}
                            title={trailer.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                        />
                    </motion.div>

                    {/* Video Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-6"
                    >
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold">{trailer.title}</h1>
                                <p className="text-foreground-muted mt-1">
                                    {movieInfo.title} • {trailer.duration}
                                </p>
                            </div>
                            <span className="badge-certified flex-shrink-0">U Certified</span>
                        </div>

                        <p className="text-foreground-muted mb-6">{trailer.description}</p>

                        {/* Share buttons */}
                        <div className="mb-8">
                            <h3 className="font-bold mb-3">Share Trailer</h3>
                            <ShareBar
                                url="/?trailer=1"
                                title="Valavaara - Official Trailer"
                                whatsappText="Watch the official trailer of Valavaara! 🐄❤️ A heartwarming family movie you don't want to miss!"
                            />
                        </div>

                        {/* Book Tickets CTA */}
                        <div className="card p-6 bg-gradient-to-r from-primary/10 to-accent-pink/10">
                            <div className="flex flex-col md:flex-row items-center gap-4">
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="font-bold text-lg">Loved the trailer?</h3>
                                    <p className="text-foreground-muted">Book your tickets now!</p>
                                </div>
                                <a
                                    href={BOOKING_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-book"
                                >
                                    <Ticket size={20} />
                                    Book on BookMyShow
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Watch Shorts */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-12"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold">Watch Shorts</h2>
                            <Link href="/watch/shorts" className="text-primary font-medium hover:underline">
                                View All →
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {shorts.map((short) => (
                                <div key={short.id} className="card overflow-hidden group cursor-pointer">
                                    <Link href="/watch/shorts">
                                        <div className="aspect-[9/16] relative">
                                            <video
                                                src={short.videoUrl}
                                                muted
                                                loop
                                                playsInline
                                                autoPlay
                                                className="w-full h-full object-cover"
                                            />
                                            {/* Play overlay */}
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center">
                                                    <Film size={24} className="text-primary ml-1" />
                                                </div>
                                            </div>
                                            {/* Click to view all */}
                                            <div className="absolute bottom-2 left-2 right-2">
                                                <div className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 text-center">
                                                    <span className="text-white text-xs">Click to view all shorts</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                    {/* Download button outside Link */}
                                    <button
                                        onClick={() => {
                                            const link = document.createElement('a');
                                            link.href = short.videoUrl;
                                            link.download = `valavaara-${short.slug}.mp4`;
                                            link.click();
                                        }}
                                        className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm opacity-0 group-hover:opacity-100 z-10"
                                    >
                                        <Download size={16} />
                                    </button>
                                    <div className="p-3">
                                        <h3 className="font-bold text-sm text-foreground truncate">
                                            {short.title}
                                        </h3>
                                        <p className="text-xs text-foreground-muted mt-0.5 line-clamp-1">
                                            {short.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
            <FloatingBookButton />
        </>
    );
}
