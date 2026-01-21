"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Ticket, Play } from "lucide-react";
import { VideoPlayer } from "@/components/VideoPlayer";
import { ShareBar } from "@/components/ShareButton";
import { Footer } from "@/components/Footer";
import { FloatingBookButton } from "@/components/BookingBar";
import { shorts, BOOKING_URL } from "@/data/content";

interface ShortData {
    id: string;
    slug: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnail: string;
    duration: string;
    whatsappText: string;
}

interface ShortPageClientProps {
    short: ShortData;
}

export function ShortPageClient({ short }: ShortPageClientProps) {
    const otherShorts = shorts.filter((s) => s.id !== short.id);

    return (
        <>
            <div className="pt-20 pb-16 px-4">
                <div className="max-w-lg mx-auto">
                    {/* Back button */}
                    <Link
                        href="/watch/shorts"
                        className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground mb-6 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Back to Shorts
                    </Link>

                    {/* Vertical Video Player */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <VideoPlayer
                            src={short.videoUrl}
                            poster={short.thumbnail}
                            title={short.title}
                            aspectRatio="9:16"
                        />
                    </motion.div>

                    {/* Video Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-6"
                    >
                        <h1 className="text-2xl font-bold mb-1">{short.title}</h1>
                        <p className="text-foreground-muted mb-1">{short.duration}</p>
                        <p className="text-foreground-muted mb-6">{short.description}</p>

                        {/* Share buttons */}
                        <div className="mb-8">
                            <h3 className="font-bold mb-3">Share this clip</h3>
                            <ShareBar
                                url={`/watch/shorts/${short.slug}`}
                                title={short.title}
                                whatsappText={short.whatsappText}
                            />
                        </div>

                        {/* Book Tickets CTA */}
                        <a
                            href={BOOKING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-book w-full"
                        >
                            <Ticket size={20} />
                            Book Tickets on BookMyShow
                        </a>
                    </motion.div>

                    {/* More Shorts */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-12"
                    >
                        <h2 className="text-xl font-bold mb-4">More Shorts</h2>
                        <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4">
                            {otherShorts.map((s) => (
                                <Link
                                    key={s.id}
                                    href={`/watch/shorts/${s.slug}`}
                                    className="flex-shrink-0 w-28"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="relative aspect-[9/16] rounded-xl overflow-hidden mb-2 bg-gradient-to-br from-primary/30 via-accent-pink/20 to-secondary/30 flex items-center justify-center group">
                                            <span className="text-3xl">🎬</span>
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                                    <Play size={16} fill="var(--primary)" className="text-primary ml-0.5" />
                                                </div>
                                            </div>
                                            <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 bg-black/70 rounded text-white text-[10px]">
                                                {s.duration}
                                            </div>
                                        </div>
                                        <p className="text-xs font-medium truncate">{s.title}</p>
                                    </motion.div>
                                </Link>
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
