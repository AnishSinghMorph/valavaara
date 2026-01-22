"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Film, Clapperboard, Music } from "lucide-react";
import { Footer } from "@/components/Footer";
import { FloatingBookButton } from "@/components/BookingBar";
import { InstagramReels } from "@/components/InstagramReels";
import { shorts } from "@/data/content";

const tabs = [
  { id: "trailer", label: "Trailer", href: "/watch/trailer", icon: Film },
  { id: "shorts", label: "Shorts", href: "/watch/shorts", icon: Film },
  { id: "bts", label: "BTS", href: "/watch/bts", icon: Clapperboard },
];

export function ShortsHubClient() {
  return (
    <>
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
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
                className={`tab ${tab.id === "shorts" ? "active" : ""}`}
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
              Watch <span className="gradient-text">Shorts</span>
            </h1>
            <p className="text-foreground-muted">
              Click on any video to see full screen and download 📥
            </p>
          </motion.div>

          {/* Instagram Reels (with fallback to local videos) */}
          <InstagramReels fallbackVideos={shorts} limit={20} />
        </div>
      </div>

      <Footer />
      <FloatingBookButton />
    </>
  );
}
