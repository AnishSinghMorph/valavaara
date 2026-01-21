"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Share2, MessageCircle, Link2, Twitter, Facebook, Check } from "lucide-react";

interface ShareButtonProps {
    url: string;
    title: string;
    whatsappText?: string;
    variant?: "full" | "compact" | "icon";
}

export function ShareButton({
    url,
    title,
    whatsappText,
    variant = "full",
}: ShareButtonProps) {
    const [showMenu, setShowMenu] = useState(false);
    const [copied, setCopied] = useState(false);

    const fullUrl = typeof window !== "undefined"
        ? `${window.location.origin}${url}`
        : url;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(fullUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleWhatsAppShare = () => {
        const text = whatsappText
            ? `${whatsappText}\n\n${fullUrl}`
            : `Check out ${title}!\n\n${fullUrl}`;
        window.open(
            `https://wa.me/?text=${encodeURIComponent(text)}`,
            "_blank"
        );
    };

    const handleTwitterShare = () => {
        const text = `Check out ${title}! 🐄❤️`;
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(fullUrl)}`,
            "_blank"
        );
    };

    const handleFacebookShare = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
            "_blank"
        );
    };

    if (variant === "icon") {
        return (
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-foreground/10 rounded-full transition-colors"
            >
                <Share2 size={20} />
            </button>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="btn btn-secondary text-sm"
            >
                <Share2 size={18} />
                {variant === "full" && "Share"}
            </button>

            {/* Share Menu */}
            {showMenu && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowMenu(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="absolute right-0 top-full mt-2 z-50 bg-white rounded-xl shadow-xl p-2 min-w-[200px]"
                    >
                        <button
                            onClick={handleWhatsAppShare}
                            className="share-btn share-btn-whatsapp w-full mb-2"
                        >
                            <MessageCircle size={18} />
                            WhatsApp
                        </button>
                        <button
                            onClick={handleCopyLink}
                            className="share-btn share-btn-copy w-full mb-2"
                        >
                            {copied ? <Check size={18} /> : <Link2 size={18} />}
                            {copied ? "Copied!" : "Copy Link"}
                        </button>
                        <button
                            onClick={handleTwitterShare}
                            className="share-btn share-btn-twitter w-full mb-2"
                        >
                            <Twitter size={18} />
                            Twitter
                        </button>
                        <button
                            onClick={handleFacebookShare}
                            className="share-btn w-full"
                            style={{ background: "#1877F2", color: "white" }}
                        >
                            <Facebook size={18} />
                            Facebook
                        </button>
                    </motion.div>
                </>
            )}
        </div>
    );
}

// Inline share buttons row
interface ShareBarProps {
    url: string;
    title: string;
    whatsappText?: string;
}

export function ShareBar({ url, title, whatsappText }: ShareBarProps) {
    const [copied, setCopied] = useState(false);

    const fullUrl = typeof window !== "undefined"
        ? `${window.location.origin}${url}`
        : url;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(fullUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleWhatsAppShare = () => {
        const text = whatsappText
            ? `${whatsappText}\n\n${fullUrl}`
            : `Check out ${title}!\n\n${fullUrl}`;
        window.open(
            `https://wa.me/?text=${encodeURIComponent(text)}`,
            "_blank"
        );
    };

    const handleTwitterShare = () => {
        const text = `Check out ${title}! 🐄❤️`;
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(fullUrl)}`,
            "_blank"
        );
    };

    return (
        <div className="flex flex-wrap gap-2">
            <button
                onClick={handleWhatsAppShare}
                className="share-btn share-btn-whatsapp flex-1 min-w-[120px]"
            >
                <MessageCircle size={18} />
                WhatsApp
            </button>
            <button
                onClick={handleCopyLink}
                className="share-btn share-btn-copy flex-1 min-w-[120px]"
            >
                {copied ? <Check size={18} /> : <Link2 size={18} />}
                {copied ? "Copied!" : "Copy Link"}
            </button>
            <button
                onClick={handleTwitterShare}
                className="share-btn share-btn-twitter flex-1 min-w-[120px]"
            >
                <Twitter size={18} />
                Tweet
            </button>
        </div>
    );
}
