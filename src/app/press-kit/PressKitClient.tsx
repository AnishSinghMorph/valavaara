"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import NextImage from "next/image";
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
    Play,
    Volume2,
    VolumeX,
    Signpost
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { FloatingBookButton } from "@/components/BookingBar";
import { PosterGallery } from "@/components/PosterGallery";
import { VideoModal, setCurrentModal } from "@/components/VideoModal";
import { pressAssets, captions, shorts, BOOKING_URL } from "@/data/content";

type CaptionLang = "en" | "kn" | "ta";

// VideoCard component for shorts - autoplay muted, click to open modal
function VideoCard({
    videoUrl,
    title,
    duration,
    slug,
    index
}: {
    videoUrl: string;
    title: string;
    duration: string;
    slug?: string;
    index: number;
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const openModal = useCallback(() => {
        setCurrentModal(() => setIsModalOpen(false));
        setIsModalOpen(true);
        // Pause inline video when modal opens
        if (videoRef.current) {
            videoRef.current.pause();
        }
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        // Resume inline video when modal closes
        if (videoRef.current) {
            videoRef.current.play().catch(() => { });
        }
    }, []);

    const toggleMute = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMuted(prev => !prev);
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
        }
    }, []);

    return (
        <>
            <div className="card overflow-hidden group cursor-pointer" onClick={openModal}>
                <div className="aspect-[9/16] relative bg-black">
                    {/* Autoplay muted video */}
                    <video
                        ref={videoRef}
                        src={videoUrl}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        autoPlay
                    />
                    {/* Play button overlay on hover */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors opacity-0 group-hover:opacity-100">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                            <Play size={20} fill="var(--primary)" className="text-primary ml-0.5" />
                        </div>
                    </div>
                    {/* Mute toggle */}
                    <button
                        onClick={toggleMute}
                        className="absolute bottom-2 left-2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full z-10"
                    >
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    {/* Download button */}
                    <a
                        href={videoUrl}
                        download={`valavaara-${slug || `short-${index + 1}`}.mp4`}
                        className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full z-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Download size={18} />
                    </a>
                </div>
                <div className="p-3">
                    <p className="text-sm font-medium truncate">{title}</p>
                    <p className="text-xs text-foreground-muted">{duration}</p>
                </div>
            </div>
            <VideoModal
                isOpen={isModalOpen}
                onClose={closeModal}
                videoSrc={videoUrl}
                title={title}
                downloadFileName={slug ? `valavaara-${slug}.mp4` : `valavaara-short-${index + 1}.mp4`}
            />
        </>
    );
}

export function PressKitClient() {
    const [copiedCaption, setCopiedCaption] = useState<string | null>(null);
    const [selectedLang, setSelectedLang] = useState<CaptionLang>("en");
    const [hoveredCelebrity, setHoveredCelebrity] = useState<number | null>(null);
    const [celebrityImagesLoaded, setCelebrityImagesLoaded] = useState<Record<number, { eng: boolean; knd: boolean }>>({});
    const [reactionModalOpen, setReactionModalOpen] = useState(false);

    const copyToClipboard = async (text: string, id: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedCaption(id);
            setTimeout(() => setCopiedCaption(null), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    // Preload the other language image on hover
    const preloadCelebrityImage = useCallback((index: number, lang: 'eng' | 'knd', url: string) => {
        if (celebrityImagesLoaded[index]?.[lang]) return;
        const img = new window.Image();
        img.src = url;
        img.onload = () => {
            setCelebrityImagesLoaded(prev => ({
                ...prev,
                [index]: { ...prev[index], [lang]: true }
            }));
        };
    }, [celebrityImagesLoaded]);

    const openReactionModal = useCallback(() => {
        setCurrentModal(() => setReactionModalOpen(false));
        setReactionModalOpen(true);
    }, []);

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
                                        className="w-full h-auto"
                                        loading={i < 3 ? undefined : "lazy"}
                                    />
                                    <div className="absolute bottom-2 right-2">
                                        <a
                                            href={promo.url}
                                            download={promo.name.toLowerCase().replace(/\s+/g, '-')}
                                            className="btn btn-secondary text-xs py-1.5 px-2 flex items-center gap-1"
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
                            <div className="relative aspect-[16/9]">
                                <NextImage
                                    src={pressAssets.award.image}
                                    alt={pressAssets.award.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 800px"
                                    className="object-cover"
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
                                            className="h-48 md:h-64 w-auto"
                                            loading={i < 2 ? undefined : "lazy"}
                                        />
                                    </div>
                                    <a
                                        href={still.url}
                                        download={still.name}
                                        className="absolute bottom-3 right-3 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full"
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
                                    onMouseEnter={() => {
                                        setHoveredCelebrity(i);
                                        // Preload Kannada image on hover
                                        preloadCelebrityImage(i, 'knd', celebrity.kndImage);
                                    }}
                                    onMouseLeave={() => setHoveredCelebrity(null)}
                                >
                                    <div className="card overflow-hidden relative">
                                        {/* English Version - always loaded */}
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={celebrity.engImage}
                                            alt={`${celebrity.name} - English`}
                                            className="w-full h-auto"
                                            style={{
                                                display: hoveredCelebrity === i ? 'none' : 'block',
                                            }}
                                        />
                                        {/* Kannada Version - only load when needed */}
                                        {(hoveredCelebrity === i || celebrityImagesLoaded[i]?.knd) && (
                                            /* eslint-disable-next-line @next/next/no-img-element */
                                            <img
                                                src={celebrity.kndImage}
                                                alt={`${celebrity.name} - Kannada`}
                                                className="w-full h-auto"
                                                style={{
                                                    display: hoveredCelebrity === i ? 'block' : 'none',
                                                }}
                                            />
                                        )}

                                        {/* Language indicator */}
                                        <div className="absolute top-2 right-2 z-10">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${hoveredCelebrity === i
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
                                <div key={i} className="card overflow-hidden group relative">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={clipping.url}
                                        alt={clipping.name}
                                        className="w-full h-auto"
                                        loading="lazy"
                                    />
                                    <a
                                        href={clipping.url}
                                        download={clipping.name}
                                        className="absolute bottom-2 right-2 btn btn-secondary text-xs py-1 px-2 flex items-center gap-1"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Download size={12} />
                                        Download
                                    </a>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* News Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.23 }}
                        className="mb-10"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                📰 News
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[1, 2, 3, 4].map((num) => (
                                <div key={num} className="card overflow-hidden group relative">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={`/assets/news/news${num}.jpeg`}
                                        alt={`News ${num}`}
                                        className="w-full h-auto"
                                        loading="lazy"
                                    />
                                    <a
                                        href={`/assets/news/news${num}.jpeg`}
                                        download={`valavaara-news-${num}.jpeg`}
                                        className="absolute bottom-2 right-2 btn btn-secondary text-xs py-1 px-2 flex items-center gap-1"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Download size={12} />
                                        Download
                                    </a>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                    {/* Hoarding Section */}
                 <motion.section
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.235 }}
  className="mb-10"
>
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl font-bold flex items-center gap-2">
      <Signpost size={20} className="text-primary" />
      Hoarding
    </h2>
    <span className="text-sm text-foreground-muted">Available in multiple sizes</span>
  </div>

  {/* ===================== DESIGN 1 ===================== */}
<div className="mb-6">
  <h3 className="text-sm font-bold mb-3 text-foreground-muted uppercase tracking-wide">
    Design 1
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* English Version - Design 1 */}
    <div className="card overflow-hidden">
      <div className="relative aspect-[2/1]">
        <NextImage
          src="/assets/posters/eng/poster7.jpg"
          alt="Hoarding - English (Design 1)"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 rounded-full text-xs font-bold bg-white/90 text-gray-800">
            ENG
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-sm mb-3">English Version</h3>

        <div className="space-y-2">
          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/design%201/30%20x%2015_Hassan_Opp%20BusStandLightENG.jpg"
            download="valavaara-hoarding-design1-30x15-hassan-eng.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 15' - Hassan Opp BusStand</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/design%201/30%20x%2015_Mysore_Hunsur%20RoadLightENG.jpg"
            download="valavaara-hoarding-design1-30x15-mysore-eng.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 15' - Mysore Hunsur Road</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/design%201/30%20x%2020_Maddur.%20IB%20circleLightENG.jpg"
            download="valavaara-hoarding-design1-30x20-maddur-eng.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 20' - Maddur IB Circle</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/design%201/30%20x%2020_chitradurga.%20Near%20bus%20standLightENG.jpg"
            download="valavaara-hoarding-design1-30x20-chitradurga-eng.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 20' - Chitradurga Near Bus Stand</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/design%201/30%20x%2020_mandya.%20Highway%20roadLightENG.jpg"
            download="valavaara-hoarding-design1-30x20-mandya-eng.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 20' - Mandya Highway Road</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/design%201/30%20x%2030_Davangare_IB%20RoadLightENG.jpg"
            download="valavaara-hoarding-design1-30x30-davangere-eng.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 30' - Davangare IB Road</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/design%201/60_%20x%2030__Mysore%20road_near%20innovativeLightENG.jpg"
            download="valavaara-hoarding-design1-60x30-mysore-road-innovative-eng.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>60' x 30' - Mysore Road Near Innovative</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/design%201/40_%20x%2020__Tumkur%20Road%2C%20NelmangalaLightENG.jpg"
            download="valavaara-hoarding-design1-40x20-tumkur-road-nelmangala-eng.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>40' x 20' - Tumkur road. Nelmangala toll</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/design%201/30%20x%2020_Tumkur.%20Gubbi%20gateLightENG.jpg"
            download="valavaara-hoarding-design1-30x20-tumkur-gubbi-gate-eng.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 20' - Tumkur. Gubbi gate</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/design%201/30%20x%2020_Hubli_Near%20Chennamma%20CircleLightENG.jpg"
            download="valavaara-hoarding-design1-30x20-hubli-chennamma-circle-eng.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 20' - Hubli. Near chennamma circle</span>
            <Download size={14} />
          </a>
        </div>
      </div>
    </div>

    {/* Kannada Version - Design 1 */}
    <div className="card overflow-hidden">
      <div className="relative aspect-[2/1]">
        <NextImage
          src="/assets/posters/knd/poster7.jpg"
          alt="Hoarding - Kannada (Design 1)"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 rounded-full text-xs font-bold bg-orange-500 text-white">
            ಕನ್ನಡ
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-sm mb-3">ಕನ್ನಡ ಆವೃತ್ತಿ</h3>

        <div className="space-y-2">
          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/design%201/30%20x%2015_Hassan_Opp%20BusStandLightKND.jpg"
            download="valavaara-hoarding-design1-30x15-hassan-knd.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 15' - Hassan Opp BusStand</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/design%201/30%20x%2015_Mysore_Hunsur%20RoadLightKND.jpg"
            download="valavaara-hoarding-design1-30x15-mysore-knd.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 15' - Mysore Hunsur Road</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/design%201/30%20x%2020_Maddur.%20IB%20circleLightKND.jpg"
            download="valavaara-hoarding-design1-30x20-maddur-knd.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 20' - Maddur IB Circle</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/design%201/30%20x%2020_Hubli_Near%20Chennamma%20CircleLightKND.jpg"
            download="valavaara-hoarding-design1-30x20-chitradurga-knd.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 20' - Chitradurga Near Bus Stand</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/design%201/30%20x%2020_mandya.%20Highway%20roadLightKND.jpg"
            download="valavaara-hoarding-design1-30x20-mandya-knd.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 20' - Mandya Highway Road</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/design%201/30%20x%2030_Davangare_IB%20RoadLightKND.jpg"
            download="valavaara-hoarding-design1-30x30-davangere-knd.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 30' - Davangare IB Road</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/design%201/30%20x%2030_Davangare_IB%20RoadLightENG.jpg"
            download="valavaara-hoarding-design1-60x30-mysore-road-innovative-knd.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>60' x 30' - Mysore Road Near Innovative</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/design%201/60_%20x%2030__Mysore%20road_near%20innovativeLightENG.jpg"
            download="valavaara-hoarding-design1-40x20-tumkur-road-nelmangala-knd.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>40' x 20' - Tumkur road. Nelmangala toll</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/design%201/40_%20x%2020__Tumkur%20Road%2C%20NelmangalaLightENG.jpg"
            download="valavaara-hoarding-design1-30x20-tumkur-gubbi-gate-knd.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 20' - Tumkur. Gubbi gate</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/design%201/30%20x%2020_Hubli_Near%20Chennamma%20CircleLightKND.jpg"
            download="valavaara-hoarding-design1-30x20-hubli-chennamma-circle-knd.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 20' - Hubli. Near chennamma circle</span>
            <Download size={14} />
          </a>
        </div>
      </div>
    </div>
  </div>
</div>




  {/* ===================== DESIGN 2 ===================== */}
<div>
  <h3 className="text-sm font-bold mb-3 text-foreground-muted uppercase tracking-wide">
    Design 2
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* English Version - Design 2 */}
    <div className="card overflow-hidden">
      <div className="relative aspect-[2/1]">
        <NextImage
          src="/assets/posters/eng/poster1.jpg"
          alt="Hoarding - English (Design 2)"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 rounded-full text-xs font-bold bg-white/90 text-gray-800">
            ENG
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-sm mb-3">English Version</h3>

        <div className="space-y-2">
          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/30_%20x%2015__Hassan_Opp%20BusStandDarkENG.jpg"
            download="valavaara-hoarding-design2-30x15-hassan-eng.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 15' - Hassan Opp BusStand</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/30_%20x%2015__Mysore.%20Hunsur%20roadDarkENG.jpg"
            download="valavaara-hoarding-design2-30x15-mysore-eng.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 15' - Mysore Hunsur Road</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/30_x20_Maddur.%20IB%20circleDarkENG.jpg"
            download="valavaara-hoarding-design2-30x20-maddur-eng.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 20' - Maddur IB Circle</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/30_%20x20__mandya.%20Highway%20roadDarkENG.jpg"
            download="valavaara-hoarding-design2-30x20-mandya-eng.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 20' - Mandya Highway Road</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/30_%20x%2030__Davangere.%20IB%20roadDARKENG.jpg"
            download="valavaara-hoarding-design2-30x30-davangere-eng.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 30' - Davangere. IB Circle</span>
            <Download size={14} />
          </a>

          {/* ✅ NEW LINKS ADDED (ENG) */}
          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/30_x20_chitradurga.%20Near%20bus%20standDarkEng.jpg"
            download="valavaara-hoarding-design2-30x20-chitradurga-eng.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 20' - Chitradurga Near Bus Stand</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/60_x30__mysore%20road.%20Near%20innovativeDarkeENG.jpg"
            download="valavaara-hoarding-design2-60x30-mysore-road-innovative-eng.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>60' x 30' - Mysore Road Near Innovative</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/40_x20_Tumkur%20road.%20Nelmangala%20tollDarlENG.jpg"
            download="valavaara-hoarding-design2-40x20-tumkur-road-nelmangala-toll-eng.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>40' x 20' - Tumkur Road Nelmangala Toll</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/30_x20_Tumkur.%20Gubbi%20gateDarkENG.jpg"
            download="valavaara-hoarding-design2-30x20-tumkur-gubbi-gate-eng.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 20' - Tumkur Gubbi Gate</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/30_x20_Hubli.%20Near%20chennamma%20circleDarkENG.jpg"
            download="valavaara-hoarding-design2-30x20-hubli-chennamma-circle-eng.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 20' - Hubli Near Chennamma Circle</span>
            <Download size={14} />
          </a>
        </div>
      </div>
    </div>

    {/* Kannada Version - Design 2 */}
    <div className="card overflow-hidden">
      <div className="relative aspect-[2/1]">
        <NextImage
          src="/assets/posters/knd/poster1.jpg"
          alt="Hoarding - Kannada (Design 2)"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 rounded-full text-xs font-bold bg-orange-500 text-white">
            ಕನ್ನಡ
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-sm mb-3">ಕನ್ನಡ ಆವೃತ್ತಿ</h3>

        <div className="space-y-2">
          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/30_%20x%2015__Hassan_Opp%20BusStandDarkKND.jpg"
            download="valavaara-hoarding-design2-30x15-hassan-knd.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 15' - Hassan Opp BusStand</span>
            <Download size={14} />
          </a>

          {/* ✅ Fixed hhttps -> https */}
          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/30_%20x%2015__Mysore.%20Hunsur%20roadDarkKND.jpg"
            download="valavaara-hoarding-design2-30x15-mysore-knd.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 15' - Mysore Hunsur Road</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/30_x20_Maddur.%20IB%20circleDarkKND.jpg"
            download="valavaara-hoarding-design2-30x20-maddur-knd.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 20' - Maddur IB Circle</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/30_%20x20__mandya.%20Highway%20roadDarkKND.jpg"
            download="valavaara-hoarding-design2-30x20-mandya-knd.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 20' - Mandya Highway Road</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/30_%20x%2030__Davangere.%20IB%20roadDARKKND.jpg"
            download="valavaara-hoarding-design2-30x30-davangere-knd.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 30' - Davangere. IB Circle</span>
            <Download size={14} />
          </a>

          {/* ✅ NEW LINKS ADDED (KND) */}
          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/30_x20_chitradurga.%20Near%20bus%20standDarkKND.jpg"
            download="valavaara-hoarding-design2-30x20-chitradurga-knd.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 20' - Chitradurga Near Bus Stand</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/60_x30__mysore%20road.%20Near%20innovativeDarkKND.jpg"
            download="valavaara-hoarding-design2-60x30-mysore-road-innovative-knd.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>60' x 30' - Mysore Road Near Innovative</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/40_x20_Tumkur%20road.%20Nelmangala%20tollDarlKnd.jpg"
            download="valavaara-hoarding-design2-40x20-tumkur-road-nelmangala-toll-knd.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>40' x 20' - Tumkur Road Nelmangala Toll</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/30_x20_Tumkur.%20Gubbi%20gateDarkKND.jpg"
            download="valavaara-hoarding-design2-30x20-tumkur-gubbi-gate-knd.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 20' - Tumkur Gubbi Gate</span>
            <Download size={14} />
          </a>

          <a
            href="https://pub-f6c1bd235a0e483e93a983775c1584c3.r2.dev/30_x20_Hubli.%20Near%20chennamma%20circleDarKND.jpg"
            download="valavaara-hoarding-design2-30x20-hubli-chennamma-circle-knd.jpg"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center justify-between w-full"
          >
            <span>30' x 20' - Hubli Near Chennamma Circle</span>
            <Download size={14} />
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

</motion.section>


                    {/* L Band Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.24 }}
                        className="mb-10"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                🎬 L Band
                            </h2>
                            <span className="text-sm text-foreground-muted">
                                Click to see Kannada version ✨
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { id: 2, engImage: "/assets/lband/VALAVAARA News promotion(2)ENG.png", kndImage: "/assets/lband/VALAVAARA News promotion(2).png", name: "L Band 1" },
                                { id: 3, engImage: "/assets/lband/VALAVAARA News promotion(3)ENG.png", kndImage: "/assets/lband/VALAVAARA News promotion(3).png", name: "L Band 2" }
                            ].map((lband, i) => (
                                <div
                                    key={lband.id}
                                    className="relative group"
                                    onMouseEnter={() => setHoveredCelebrity(100 + i)}
                                    onMouseLeave={() => setHoveredCelebrity(null)}
                                >
                                    <div className="card overflow-hidden relative">
                                        {/* English Version */}
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={lband.engImage}
                                            alt={`${lband.name} - English`}
                                            className="w-full h-auto"
                                            style={{
                                                display: hoveredCelebrity === 100 + i ? 'none' : 'block',
                                            }}
                                        />
                                        {/* Kannada Version */}
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={lband.kndImage}
                                            alt={`${lband.name} - Kannada`}
                                            className="w-full h-auto"
                                            style={{
                                                display: hoveredCelebrity === 100 + i ? 'block' : 'none',
                                            }}
                                        />

                                        {/* Language indicator */}
                                        <div className="absolute top-2 right-2 z-10">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${hoveredCelebrity === 100 + i
                                                    ? "bg-orange-500 text-white"
                                                    : "bg-white/90 text-gray-800"
                                                }`}>
                                                {hoveredCelebrity === 100 + i ? "ಕನ್ನಡ" : "ENG"}
                                            </span>
                                        </div>

                                        {/* Download buttons */}
                                        <div className="absolute bottom-2 left-2 right-2 z-10"
                                            style={{
                                                opacity: hoveredCelebrity === 100 + i ? 1 : 0,
                                                transition: 'none'
                                            }}
                                        >
                                            <div className="flex flex-col sm:flex-row gap-2">
                                                <a
                                                    href={lband.engImage}
                                                    download={`valavaara-lband-${lband.id}-eng.png`}
                                                    className="flex-1 btn btn-secondary text-xs sm:text-sm py-2 px-3 flex items-center justify-center gap-1.5"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <Download size={14} />
                                                    English
                                                </a>
                                                <a
                                                    href={lband.kndImage}
                                                    download={`valavaara-lband-${lband.id}-knd.png`}
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
                                        <NextImage
                                            src={logo.url}
                                            alt={logo.name}
                                            fill
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                            className="object-contain p-4"
                                            loading="lazy"
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
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                    WhatsApp
                                </button>
                                <button
                                    onClick={() => shareToTwitter(captions[selectedLang].caption + '\n\n' + captions[selectedLang].hashtags)}
                                    className="bg-black hover:bg-gray-900 text-white text-xs py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-1.5"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Film size={20} className="text-primary" />
                                Shorts / Reels
                            </h2>
                        </div>
                        <p className="text-sm text-foreground-muted mb-4">
                            Click on any video to see full screen and download 📥
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {shorts.map((short, i) => (
                                <VideoCard
                                    key={short.id}
                                    videoUrl={short.videoUrl}
                                    title={short.title}
                                    duration={short.duration}
                                    slug={short.slug}
                                    index={i}
                                />
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
                        <div
                            className="card overflow-hidden relative group cursor-pointer"
                            onClick={openReactionModal}
                        >
                            {/* Thumbnail placeholder */}
                            <div className="aspect-video bg-gradient-to-br from-primary/30 via-accent-pink/20 to-secondary/30 relative">
                                {/* Play button overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        <Play size={28} fill="var(--primary)" className="text-primary ml-1" />
                                    </div>
                                </div>
                                {/* Title */}
                                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                                    <span className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
                                        Creator Reactions
                                    </span>
                                    {/* Download button */}
                                    <a
                                        href="/assets/videos/reaction.mp4"
                                        download="valavaara-reaction.mp4"
                                        className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors backdrop-blur-sm"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Download size={16} />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <VideoModal
                            isOpen={reactionModalOpen}
                            onClose={() => setReactionModalOpen(false)}
                            videoSrc="/assets/videos/reaction.mp4"
                            title="Creator Reactions"
                            downloadFileName="valavaara-reaction.mp4"
                        />
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
