"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Play, Download, Ticket } from "lucide-react";
import { BOOKING_URL } from "@/data/content";

const navLinks = [
    { href: "/watch/trailer", label: "Watch", icon: Play },
    { href: "/press-kit", label: "Press Kit", icon: Download },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image 
                        src="/assets/logos/morph.png" 
                        alt="Morph Productions" 
                        width={120}
                        height={40}
                        className="h-10 w-auto"
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center gap-2 text-sm font-medium text-foreground-muted hover:text-primary transition-colors"
                        >
                            <link.icon size={16} />
                            {link.label}
                        </Link>
                    ))}
                    <a
                        href={BOOKING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-book text-sm py-2 px-4"
                    >
                        <Ticket size={16} />
                        Book Tickets
                    </a>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 text-foreground"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t border-white/20"
                    >
                        <nav className="flex flex-col p-4 gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 transition-colors"
                                >
                                    <link.icon size={20} className="text-primary" />
                                    <span className="font-medium">{link.label}</span>
                                </Link>
                            ))}
                            <a
                                href={BOOKING_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsOpen(false)}
                                className="btn btn-book mt-2"
                            >
                                <Ticket size={18} />
                                Book Tickets on BookMyShow
                            </a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
