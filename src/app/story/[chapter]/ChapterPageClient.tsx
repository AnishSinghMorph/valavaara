"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Volume2, VolumeX, Share2, Ticket } from "lucide-react";
import { Footer } from "@/components/Footer";
import { FloatingBookButton } from "@/components/BookingBar";
import { ShareBar } from "@/components/ShareButton";
import { storyChapters, BOOKING_URL } from "@/data/content";

interface ChapterData {
    id: string;
    number: number;
    title: string;
    description: string;
    thumbnail: string;
    panels: Array<{
        image: string;
        text: string;
    }>;
}

interface ChapterPageClientProps {
    chapter: ChapterData;
}

export function ChapterPageClient({ chapter }: ChapterPageClientProps) {
    const [audioOn, setAudioOn] = useState(false);
    const { scrollYProgress } = useScroll();
    const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    const currentIndex = storyChapters.findIndex((c) => c.id === chapter.id);
    const prevChapter = currentIndex > 0 ? storyChapters[currentIndex - 1] : null;
    const nextChapter = currentIndex < storyChapters.length - 1 ? storyChapters[currentIndex + 1] : null;

    return (
        <>
            {/* Progress bar */}
            <motion.div
                className="fixed top-16 left-0 right-0 h-1 bg-background-alt z-40"
            >
                <motion.div
                    className="h-full bg-primary"
                    style={{ width: progressWidth }}
                />
            </motion.div>

            <div className="pt-20 pb-16 px-4">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <Link
                            href="/story"
                            className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors"
                        >
                            <ArrowLeft size={20} />
                            All Chapters
                        </Link>
                        <button
                            onClick={() => setAudioOn(!audioOn)}
                            className={`p-2 rounded-full transition-colors ${audioOn ? 'bg-primary text-white' : 'bg-background-alt text-foreground-muted hover:text-foreground'}`}
                        >
                            {audioOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
                        </button>
                    </div>

                    {/* Chapter Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-10"
                    >
                        <span className="text-sm text-primary font-medium">Chapter {chapter.number}</span>
                        <h1 className="text-3xl md:text-4xl font-bold mt-1">{chapter.title}</h1>
                    </motion.div>

                    {/* Story Panels */}
                    <div className="space-y-8">
                        {chapter.panels.map((panel, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                            >
                                {/* Panel Image */}
                                <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-lg">
                                    <div className="absolute inset-0 bg-gradient-to-br from-accent-yellow/30 via-primary/20 to-secondary/30 flex items-center justify-center">
                                        <span className="text-6xl">🖼️</span>
                                    </div>
                                </div>

                                {/* Panel Text */}
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 }}
                                    className="text-lg md:text-xl text-center text-foreground leading-relaxed px-4"
                                >
                                    {panel.text}
                                </motion.p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Share Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12 p-6 card bg-background-alt"
                    >
                        <h3 className="font-bold mb-3 flex items-center gap-2">
                            <Share2 size={18} />
                            Share this chapter
                        </h3>
                        <ShareBar
                            url={`/story/${chapter.id}`}
                            title={`Valavaara - Chapter ${chapter.number}: ${chapter.title}`}
                            whatsappText={`Read this beautiful chapter from Valavaara! 📖🐄 Chapter ${chapter.number}: ${chapter.title}`}
                        />
                    </motion.div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center mt-8 gap-4">
                        {prevChapter ? (
                            <Link
                                href={`/story/${prevChapter.id}`}
                                className="btn btn-secondary flex-1"
                            >
                                <ChevronLeft size={18} />
                                Previous
                            </Link>
                        ) : (
                            <div className="flex-1" />
                        )}
                        {nextChapter ? (
                            <Link
                                href={`/story/${nextChapter.id}`}
                                className="btn btn-primary flex-1"
                            >
                                Next
                                <ChevronRight size={18} />
                            </Link>
                        ) : (
                            <a
                                href={BOOKING_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-book flex-1"
                            >
                                <Ticket size={18} />
                                Book Tickets
                            </a>
                        )}
                    </div>

                    {/* Book CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-10 p-6 card bg-gradient-to-r from-primary/10 to-accent-pink/10 text-center"
                    >
                        <span className="text-4xl mb-2 block">🐄❤️</span>
                        <h3 className="font-bold text-lg mb-2">Want to see the full story?</h3>
                        <p className="text-foreground-muted mb-4">
                            Watch Valavaara in cinemas now!
                        </p>
                        <a
                            href={BOOKING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-book"
                        >
                            <Ticket size={18} />
                            Book Tickets
                        </a>
                    </motion.div>
                </div>
            </div>

            <Footer />
            <FloatingBookButton />
        </>
    );
}
