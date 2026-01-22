"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Play, Download } from "lucide-react";
import { VideoModal, setCurrentModal } from "./VideoModal";

interface ShortVideoPlayerProps {
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  className?: string;
  slug?: string;
  priority?: boolean;
}

export function ShortVideoPlayer({ 
  videoUrl, 
  thumbnailUrl,
  title, 
  className = "", 
  slug,
  priority = false
}: ShortVideoPlayerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    // Close any other open modals first
    setCurrentModal(() => {
      setIsModalOpen(false);
    });
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      {/* Thumbnail Card - No video loading until click */}
      <div
        className={`relative cursor-pointer group ${className}`}
        onClick={openModal}
      >
        {/* Thumbnail Image */}
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-zinc-900">
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            priority={priority}
          />
        </div>
        
        {/* Play button overlay - always visible */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors rounded-xl">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play size={24} fill="var(--primary)" className="text-primary ml-1" />
          </div>
        </div>
        
        {/* Title and download */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2">
          <div className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-white text-xs font-medium line-clamp-1">{title}</span>
          </div>
          <a
            href={videoUrl}
            download={slug ? `valavaara-${slug}.mp4` : 'valavaara-video.mp4'}
            className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm flex-shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <Download size={14} />
          </a>
        </div>
      </div>

      {/* Video Modal - Video only loads when modal is open */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        videoSrc={videoUrl}
        title={title}
        downloadFileName={slug ? `valavaara-${slug}.mp4` : 'valavaara-video.mp4'}
      />
    </>
  );
}
