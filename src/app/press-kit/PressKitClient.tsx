"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Download,
    Image,
    Film,
    FileText,
    Copy,
    Check,
    Link2,
    Ticket,
    Instagram,
    Star,
    Volume2,
    VolumeX,
    Share2,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { FloatingBookButton } from "@/components/BookingBar";
import { PosterGallery } from "@/components/PosterGallery";
import { pressAssets, captions, shorts, BOOKING_URL } from "@/data/content";

type CaptionLang = "en" | "kn" | "ta";

export function PressKitClient() {
    const [copiedCaption, setCopiedCaption] = useState<string | null>(null);
    const [selectedLang, setSelectedLang] = useState<CaptionLang>("en");
    const [hoveredCelebrity, setHoveredCelebrity] = useState<number | null>(null);
    const [mutedVideos, setMutedVideos] = useState<Record<string, boolean>>(() => {
        const initial: Record<string, boolean> = {};
        shorts.forEach(short => {
            initial[short.id] = true;
        });
        return initial;
    });
    const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

    const copyToClipboard = async (text: string, id: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedCaption(id);
            setTimeout(() => setCopiedCaption(null), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const toggleMute = (videoId: string) => {
        setMutedVideos(prev => ({
            ...prev,
            [videoId]: !prev[videoId]
        }));
        const video = videoRefs.current[videoId];
        if (video) {
            video.muted = !video.muted;
        }
    };

    const shareToWhatsApp = (text: string) => {
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    const shareToTwitter = (text: string) => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    const shareToInstagram = () => {
        // Instagram doesn't support direct text sharing via URL, so we copy and notify
        copyToClipboard(captions[selectedLang].caption + '\n\n' + captions[selectedLang].hashtags, 'instagram-share');
        alert('Caption and hashtags copied! Open Instagram to paste.');
    };

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

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10"
                    >
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                            📰 Press & <span className="gradient-text">Influencer Kit</span>
                        </h1>
                        <p className="text-foreground-muted">
                            Download official assets for promotion. No login required!
                        </p>
                    </motion.div>

                    {/* Posters Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-10"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Image size={20} className="text-primary" />
                                Posters
                            </h2>
                            <span className="text-sm text-foreground-muted">
                                Click to see Kannada version ✨
                            </span>
                        </div>
                        <PosterGallery showAll />
                    </motion.section>

                    {/* Promotions Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12 }}
                        className="mb-10"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Star size={20} className="text-primary" />
                                Promotional Materials
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {pressAssets.promotions.map((promo, i) => (
                                <div key={i} className="card overflow-hidden group relative">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={promo.url}
                                        alt={promo.name}
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="absolute bottom-2 right-2">
                                        <a
                                            href={promo.url}
                                            download={promo.name.toLowerCase().replace(/\s+/g, '-')}
                                            className="btn btn-secondary text-xs py-1.5 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Download size={12} />
                                            Download
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Award Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.145 }}
                        className="mb-10"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                🏆 Award
                            </h2>
                        </div>
                        <div className="card overflow-hidden">
                            <div className="relative">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={pressAssets.award.image}
                                    alt={pressAssets.award.title}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            <div className="p-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-bold text-sm mb-1">{pressAssets.award.title}</h3>
                                        <p className="text-xs">{pressAssets.award.description}</p>
                                    </div>
                                    <a
                                        href={pressAssets.award.image}
                                        download="valavaara-award.jpg"
                                        className="btn bg-white/20 hover:bg-white/30 text-white text-xs py-1.5 px-2 flex items-center gap-1"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Download size={12} />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Stills Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="mb-10"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Image size={20} className="text-primary" />
                                Movie Stills
                            </h2>
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
                            {pressAssets.stills.map((still, i) => (
                                <div key={i} className="flex-shrink-0 relative group">
                                    <div className="card overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={still.url}
                                            alt={still.name}
                                            className="h-48 md:h-64 w-auto object-contain"
                                        />
                                    </div>
                                    <a
                                        href={still.url}
                                        download={still.name}
                                        className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 hover:bg-black/90 text-white p-2 rounded-full"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Download size={14} />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Celebrity Trailer Launches */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.16 }}
                        className="mb-10"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Star size={20} className="text-primary" />
                                Celebrity Trailer Launches
                            </h2>
                            <span className="text-sm text-foreground-muted">
                                Click to see Kannada version ✨
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {pressAssets.celebrityLaunches?.map((celebrity, i) => (
                                <div
                                    key={i}
                                    className="relative group"
                                    onMouseEnter={() => setHoveredCelebrity(i)}
                                    onMouseLeave={() => setHoveredCelebrity(null)}
                                >
                                    <div className="card overflow-hidden relative">
                                        {/* English Version */}
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={celebrity.engImage}
                                            alt={`${celebrity.name} - English`}
                                            className="w-full h-auto object-contain"
                                            style={{ 
                                                opacity: hoveredCelebrity === i ? 0 : 1,
                                                transition: 'none'
                                            }}
                                        />
                                        {/* Kannada Version */}
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={celebrity.kndImage}
                                            alt={`${celebrity.name} - Kannada`}
                                            className="absolute inset-0 w-full h-full object-contain"
                                            style={{ 
                                                opacity: hoveredCelebrity === i ? 1 : 0,
                                                transition: 'none'
                                            }}
                                        />
                                        
                                        {/* Language indicator */}
                                        <div className="absolute top-2 right-2 z-10">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                                hoveredCelebrity === i
                                                    ? "bg-orange-500 text-white" 
                                                    : "bg-white/90 text-gray-800"
                                            }`}>
                                                {hoveredCelebrity === i ? "ಕನ್ನಡ" : "ENG"}
                                            </span>
                                        </div>

                                        {/* Download buttons */}
                                        <div className="absolute bottom-2 left-2 right-2 z-10"
                                            style={{ 
                                                opacity: hoveredCelebrity === i ? 1 : 0,
                                                transition: 'none'
                                            }}
                                        >
                                            <div className="flex flex-col sm:flex-row gap-2">
                                                <a
                                                    href={celebrity.engImage}
                                                    download={`${celebrity.name}-eng.jpg`}
                                                    className="flex-1 btn btn-secondary text-xs sm:text-sm py-2 px-3 flex items-center justify-center gap-1.5"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <Download size={14} />
                                                    English
                                                </a>
                                                <a
                                                    href={celebrity.kndImage}
                                                    download={`${celebrity.name}-knd.jpg`}
                                                    className="flex-1 btn btn-secondary text-xs sm:text-sm py-2 px-3 flex items-center justify-center gap-1.5"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <Download size={14} />
                                                    ಕನ್ನಡ
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Trailer Links */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-10"
                    >
                        <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                            <Film size={20} className="text-primary" />
                            Trailer Links
                        </h2>
                        <div className="card p-4">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <Link2 size={18} className="text-foreground-muted" />
                                    <span className="text-sm">YouTube Link</span>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(pressAssets.trailerLinks.youtube, "youtube")}
                                    className="btn btn-secondary text-xs py-1.5 px-3"
                                >
                                    {copiedCaption === "youtube" ? <Check size={14} /> : <Copy size={14} />}
                                    {copiedCaption === "youtube" ? "Copied!" : "Copy"}
                                </button>
                            </div>
                        </div>
                    </motion.section>

                    {/* Social Media */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.21 }}
                        className="mb-10"
                    >
                        <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                            <Instagram size={20} className="text-primary" />
                            Instagram
                        </h2>
                        <div className="p-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <Instagram size={20} className="text-white" />
                                    <span className="text-sm font-medium text-white">@valavaarathefilm</span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => copyToClipboard(pressAssets.socialMedia?.instagram || "", "instagram")}
                                        className="bg-white/20 hover:bg-white/30 text-white text-xs py-1.5 px-3 rounded transition-colors"
                                    >
                                        {copiedCaption === "instagram" ? <Check size={14} /> : <Copy size={14} />}
                                        {copiedCaption === "instagram" ? "Copied!" : "Copy"}
                                    </button>
                                    <a
                                        href={pressAssets.socialMedia?.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white text-pink-600 hover:bg-white/90 text-xs py-1.5 px-3 rounded font-medium transition-colors"
                                    >
                                        Visit
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Press Clippings Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.22 }}
                        className="mb-10"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <FileText size={20} className="text-primary" />
                                Press Coverage
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {pressAssets.pressClippings.filter(c => !c.url.endsWith('.webp')).map((clipping, i) => (
                                <div key={i} className="card overflow-hidden group">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={clipping.url}
                                        alt={clipping.name}
                                        className="w-full h-auto object-cover"
                                    />
                                    <div className="p-2 flex justify-between items-center">
                                        <span className="text-xs font-medium">{clipping.name}</span>
                                        <a
                                            href={clipping.url}
                                            download={clipping.name}
                                            className="btn btn-secondary text-xs py-1 px-2"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Download size={12} />
                                            Download
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Logos */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="mb-10"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <FileText size={20} className="text-primary" />
                                Logos
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {pressAssets.logos.map((logo, i) => (
                                <div key={i} className="card p-4">
                                    <div className="aspect-video relative bg-white rounded-lg mb-3 flex items-center justify-center p-4">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={logo.url}
                                            alt={logo.name}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">{logo.name}</span>
                                        <a
                                            href={logo.url}
                                            download={logo.name.toLowerCase().replace(/\s+/g, '-')}
                                            className="text-primary hover:underline text-sm"
                                        >
                                            <Download size={16} />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Ready-to-Post Captions */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-10"
                    >
                        <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                            📝 Ready-to-Post Captions
                        </h2>

                        {/* Language Tabs */}
                        <div className="tabs mb-4 inline-flex">
                            {[
                                { id: "en" as CaptionLang, label: "English" },
                                { id: "kn" as CaptionLang, label: "ಕನ್ನಡ" },
                            ].map((lang) => (
                                <button
                                    key={lang.id}
                                    onClick={() => setSelectedLang(lang.id)}
                                    className={`tab ${selectedLang === lang.id ? "active" : ""}`}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>

                        <div className="card p-4">
                            <div className="bg-background-alt rounded-lg p-4 mb-4 whitespace-pre-wrap text-sm">
                                {captions[selectedLang].caption}
                            </div>
                            <button
                                onClick={() => copyToClipboard(captions[selectedLang].caption, "caption")}
                                className="btn btn-primary w-full"
                            >
                                {copiedCaption === "caption" ? <Check size={18} /> : <Copy size={18} />}
                                {copiedCaption === "caption" ? "Copied!" : "Copy Caption"}
                            </button>

                            {/* Share Buttons */}
                            <div className="mt-3 grid grid-cols-3 gap-2">
                                <button
                                    onClick={() => shareToWhatsApp(captions[selectedLang].caption + '\n\n' + captions[selectedLang].hashtags)}
                                    className="bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-1.5"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                    </svg>
                                    WhatsApp
                                </button>
                                <button
                                    onClick={() => shareToTwitter(captions[selectedLang].caption + '\n\n' + captions[selectedLang].hashtags)}
                                    className="bg-black hover:bg-gray-900 text-white text-xs py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-1.5"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                    </svg>
                                    X
                                </button>
                                <button
                                    onClick={shareToInstagram}
                                    className="bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] hover:opacity-90 text-white text-xs py-2 px-3 rounded-lg font-medium transition-opacity flex items-center justify-center gap-1.5"
                                >
                                    <Instagram size={16} />
                                    Instagram
                                </button>
                            </div>

                            <div className="mt-4 pt-4 border-t border-foreground-light/20">
                                <p className="text-sm text-foreground-muted mb-2">Hashtags:</p>
                                <div className="bg-background-alt rounded-lg p-3 text-sm text-primary">
                                    {captions[selectedLang].hashtags}
                                </div>
                                <button
                                    onClick={() => copyToClipboard(captions[selectedLang].hashtags, "hashtags")}
                                    className="btn btn-secondary w-full mt-2 text-sm"
                                >
                                    {copiedCaption === "hashtags" ? <Check size={16} /> : <Copy size={16} />}
                                    {copiedCaption === "hashtags" ? "Copied!" : "Copy Hashtags"}
                                </button>
                            </div>
                        </div>
                    </motion.section>

                    {/* Shorts/Reels */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="mb-10"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Film size={20} className="text-primary" />
                                Shorts / Reels
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {shorts.map((short, i) => (
                                <div key={short.id} className="card overflow-hidden group">
                                    <div className="aspect-[9/16] relative bg-black">
                                        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                                        <video
                                            ref={(el) => {
                                                videoRefs.current[short.id] = el;
                                            }}
                                            src={short.videoUrl}
                                            className="w-full h-full object-cover"
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                        />
                                        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2 z-10">
                                            <button
                                                onClick={() => toggleMute(short.id)}
                                                className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                                            >
                                                {mutedVideos[short.id] ? <VolumeX size={18} /> : <Volume2 size={18} />}
                                            </button>
                                            <a
                                                href={short.videoUrl}
                                                download={`valavaara-${short.slug || `short-${i + 1}`}.mp4`}
                                                className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Download size={18} />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <p className="text-sm font-medium truncate">{short.title}</p>
                                        <p className="text-xs text-foreground-muted">{short.duration}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Reactions Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.36 }}
                        className="mb-10"
                    >
                        <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                            <Film size={20} className="text-primary" />
                            Creator Reactions
                        </h2>
                        <div className="card overflow-hidden relative group">
                            <video
                                ref={(el) => {
                                    if (el) {
                                        videoRefs.current['reaction'] = el;
                                    }
                                }}
                                autoPlay
                                loop
                                muted={mutedVideos['reaction'] !== false}
                                playsInline
                                className="w-full h-auto"
                                src="/assets/videos/reaction.mp4"
                                onLoadedMetadata={(e) => {
                                    const video = e.currentTarget;
                                    if (mutedVideos['reaction'] === undefined) {
                                        setMutedVideos(prev => ({ ...prev, reaction: true }));
                                    }
                                }}
                            >
                                Your browser does not support the video tag.
                            </video>
                            {/* Mute button */}
                            <button
                                onClick={() => toggleMute('reaction')}
                                className="absolute bottom-2 left-2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                            >
                                {mutedVideos['reaction'] !== false ? <VolumeX size={16} /> : <Volume2 size={16} />}
                            </button>
                            {/* Download button */}
                            <a
                                href="/assets/videos/reaction.mp4"
                                download="valavaara-reaction.mp4"
                                className="absolute bottom-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Download size={16} />
                            </a>
                        </div>
                    </motion.section>

                    {/* Book CTA */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="card p-6 bg-gradient-to-r from-primary/10 to-accent-pink/10 text-center">
                            <h3 className="font-bold text-lg mb-2">Booking Link for Your Posts</h3>
                            <p className="text-foreground-muted text-sm mb-4">
                                Include this link in your content to help fans book tickets:
                            </p>
                            <div className="bg-white rounded-lg p-3 flex items-center gap-2 mb-4">
                                <span className="text-sm text-foreground-muted truncate flex-1">
                                    {BOOKING_URL}
                                </span>
                                <button
                                    onClick={() => copyToClipboard(BOOKING_URL, "bookingurl")}
                                    className="btn btn-secondary text-xs py-1.5 px-3 flex-shrink-0"
                                >
                                    {copiedCaption === "bookingurl" ? <Check size={14} /> : <Copy size={14} />}
                                    {copiedCaption === "bookingurl" ? "Copied!" : "Copy"}
                                </button>
                            </div>
                            <a
                                href={BOOKING_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-book"
                            >
                                <Ticket size={18} />
                                Open BookMyShow
                            </a>
                        </div>
                    </motion.section>
                </div>
            </div>

            <Footer />
            <FloatingBookButton />
        </>
    );
}
