"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight } from "lucide-react";

interface ChapterCardProps {
    id: string;
    number: number;
    title: string;
    description: string;
    thumbnail?: string;
}

export function ChapterCard({
    id,
    number,
    title,
    description,
    thumbnail,
}: ChapterCardProps) {
    return (
        <Link href={`/story/${id}`}>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ x: 8 }}
                className="card flex overflow-hidden"
            >
                {/* Thumbnail */}
                <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                    {thumbnail ? (
                        <Image
                            src={thumbnail}
                            alt={title}
                            fill
                            sizes="128px"
                            className="object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-yellow/40 to-primary/30 flex items-center justify-center">
                            <BookOpen size={32} className="text-primary" />
                        </div>
                    )}
                    <div className="absolute top-2 left-2 w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {number}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-4 flex flex-col justify-center">
                    <h3 className="font-bold text-foreground">Chapter {number}: {title}</h3>
                    <p className="text-sm text-foreground-muted mt-1 line-clamp-2">
                        {description}
                    </p>
                </div>

                {/* Arrow */}
                <div className="flex items-center px-4">
                    <ChevronRight size={24} className="text-foreground-light" />
                </div>
            </motion.div>
        </Link>
    );
}
