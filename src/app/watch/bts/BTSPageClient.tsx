"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Film, Clapperboard, Music, Play, Ticket, Download } from "lucide-react";
import { Footer } from "@/components/Footer";
import { FloatingBookButton } from "@/components/BookingBar";
import { btsImages, BOOKING_URL } from "@/data/content";

const tabs = [
    { id: "trailer", label: "Trailer", href: "/watch/trailer", icon: Film },
    { id: "shorts", label: "Shorts", href: "/watch/shorts", icon: Film },
    { id: "bts", label: "BTS", href: "/watch/bts", icon: Clapperboard },
];

export function BTSPageClient() {
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
                                className={`tab ${tab.id === "bts" ? "active" : ""}`}
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
                            Behind the <span className="gradient-text">Scenes Photos</span>
                        </h1>
                        <p className="text-foreground-muted">
                            Exclusive behind-the-scenes moments from the making of Valavaara!
                        </p>
                    </motion.div>

                    {/* BTS Images */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-10"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {btsImages.map((image, i) => (
                                <motion.div
                                    key={image.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.05 }}
                                    className="card overflow-hidden group relative"
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={image.image}
                                        alt={image.title}
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="absolute bottom-2 right-2">
                                        <a
                                            href={image.image}
                                            download={`valavaara-bts-${i + 1}.jpg`}
                                            className="btn btn-secondary text-xs py-1.5 px-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Download size={12} />
                                            Download
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Book CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="card p-6 bg-gradient-to-r from-primary/10 to-accent-pink/10 text-center"
                    >
                        <h3 className="font-bold text-lg mb-2">Ready to watch the movie?</h3>
                        <p className="text-foreground-muted mb-4">
                            Book your tickets and experience the magic on the big screen!
                        </p>
                        <a
                            href={BOOKING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-book"
                        >
                            <Ticket size={18} />
                            Book on BookMyShow
                        </a>
                    </motion.div>
                </div>
            </div>

            <Footer />
            <FloatingBookButton />
        </>
    );
}
