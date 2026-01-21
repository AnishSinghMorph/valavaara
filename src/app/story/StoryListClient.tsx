"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, ChevronRight, Ticket } from "lucide-react";
import { Footer } from "@/components/Footer";
import { FloatingBookButton } from "@/components/BookingBar";
import { storyChapters, BOOKING_URL } from "@/data/content";

export function StoryListClient() {
    return (
        <>
            <div className="pt-20 pb-16 px-4">
                <div className="max-w-2xl mx-auto">
                    {/* Back button */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground mb-6 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Back to Home
                    </Link>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-10"
                    >
                        <span className="text-6xl mb-4 block">📖</span>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                            The Story of <span className="gradient-text">Valavaara</span>
                        </h1>
                        <p className="text-foreground-muted">
                            Scroll through our webtoon-style chapters
                        </p>
                    </motion.div>

                    {/* Chapter Cards */}
                    <div className="space-y-4 mb-10">
                        {storyChapters.map((chapter, i) => (
                            <motion.div
                                key={chapter.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link href={`/story/${chapter.id}`}>
                                    <div className="card flex overflow-hidden group hover:shadow-lg transition-shadow">
                                        {/* Thumbnail */}
                                        <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                                            <div className="absolute inset-0 bg-gradient-to-br from-accent-yellow/40 to-primary/30 flex items-center justify-center">
                                                <BookOpen size={32} className="text-primary" />
                                            </div>
                                            <div className="absolute top-2 left-2 w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                {chapter.number}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 p-4 flex flex-col justify-center">
                                            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                                                Chapter {chapter.number}: {chapter.title}
                                            </h3>
                                            <p className="text-sm text-foreground-muted mt-1">
                                                {chapter.description}
                                            </p>
                                        </div>

                                        {/* Arrow */}
                                        <div className="flex items-center px-4">
                                            <ChevronRight size={24} className="text-foreground-light group-hover:text-primary transition-colors" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}

                        {/* Coming Soon */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="card p-6 text-center bg-background-alt"
                        >
                            <span className="text-3xl mb-2 block">✨</span>
                            <p className="font-medium text-foreground-muted">More chapters coming soon!</p>
                        </motion.div>
                    </div>

                    {/* Book CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="card p-6 bg-gradient-to-r from-primary/10 to-accent-pink/10 text-center"
                    >
                        <h3 className="font-bold text-lg mb-2">Love the story?</h3>
                        <p className="text-foreground-muted mb-4">
                            Watch the complete adventure on the big screen!
                        </p>
                        <a
                            href={BOOKING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-book"
                        >
                            <Ticket size={18} />
                            Book Tickets Now
                        </a>
                    </motion.div>
                </div>
            </div>

            <Footer />
            <FloatingBookButton />
        </>
    );
}
