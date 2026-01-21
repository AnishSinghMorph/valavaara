"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Share2 } from "lucide-react";
import { ShareButton } from "./ShareButton";

interface ShortCardProps {
    slug: string;
    title: string;
    description: string;
    thumbnail?: string;
    duration: string;
    whatsappText: string;
}

export function ShortCard({
    slug,
    title,
    description,
    thumbnail,
    duration,
    whatsappText,
}: ShortCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card group"
        >
            <Link href={`/watch/shorts/${slug}`}>
                <div className="relative aspect-[9/16] overflow-hidden">
                    {thumbnail ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={thumbnail}
                            alt={title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent-pink/20 to-secondary/30 flex items-center justify-center">
                            <span className="text-6xl">🎬</span>
                        </div>
                    )}

                    {/* Play overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center shadow-lg">
                            <Play size={28} fill="var(--primary)" className="text-primary ml-1" />
                        </div>
                    </div>

                    {/* Duration badge */}
                    <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/70 rounded-md text-white text-xs font-medium">
                        {duration}
                    </div>
                </div>
            </Link>

            <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                        <Link href={`/watch/shorts/${slug}`}>
                            <h3 className="font-bold text-foreground hover:text-primary transition-colors truncate">
                                {title}
                            </h3>
                        </Link>
                        <p className="text-sm text-foreground-muted mt-1 line-clamp-2">
                            {description}
                        </p>
                    </div>
                    <ShareButton
                        url={`/watch/shorts/${slug}`}
                        title={title}
                        whatsappText={whatsappText}
                        variant="compact"
                    />
                </div>
            </div>
        </motion.div>
    );
}

// Horizontal short card for "more shorts" sections
export function ShortCardHorizontal({
    slug,
    title,
    thumbnail,
    duration,
}: {
    slug: string;
    title: string;
    thumbnail?: string;
    duration: string;
}) {
    return (
        <Link href={`/watch/shorts/${slug}`}>
            <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex-shrink-0 w-28"
            >
                <div className="relative aspect-[9/16] rounded-xl overflow-hidden mb-2">
                    {thumbnail ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={thumbnail}
                            alt={title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                            <span className="text-3xl">🎬</span>
                        </div>
                    )}
                    <div className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-black/70 rounded text-white text-[10px] font-medium">
                        {duration}
                    </div>
                </div>
                <p className="text-xs font-medium text-foreground truncate">{title}</p>
            </motion.div>
        </Link>
    );
}
