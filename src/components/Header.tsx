"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Play, Download, Ticket, Info } from "lucide-react";
import { BOOKING_URL } from "@/data/content";

const navLinks = [
    { href: "/watch/trailer", label: "Watch", icon: Play },
    { href: "/about", label: "About", icon: Info },
    { href: "/review", label: "Reviews", icon: Play },
    { href: "/press-kit", label: "Press Kit", icon: Download },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass header-bg">
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

                {/* Mobile Review Link and Menu Button */}
                <div className="md:hidden flex items-center gap-3">
                    <Link
                        href="/review"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/30 border border-primary/40 text-primary hover:text-primary hover:bg-primary/40 hover:border-primary/60 transition-all text-sm font-medium"
                    >
                        <Play size={16} className="opacity-100" />
                        Reviews
                    </Link>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-foreground"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
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
