"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface CharacterCardProps {
    name: string;
    role: string;
    description: string;
    frontImage?: string;
    emoji: string;
}

export function CharacterCard({
    name,
    role,
    frontImage,
    emoji,
}: CharacterCardProps) {
    return (
        <motion.div
            className="relative h-64 w-44"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="relative w-full h-full">
                {/* Front */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg">
                    {frontImage ? (
                        <Image
                            src={frontImage}
                            alt={name}
                            fill
                            sizes="176px"
                            className="object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                            <span className="text-7xl">{emoji}</span>
                        </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="text-yellow-400 font-bold text-lg">{name}</h3>
                        <p className="text-white/80 text-sm">{role}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
