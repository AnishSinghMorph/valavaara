"use client";

import { useCallback, useRef, useState } from "react";
import { Play, Download, Volume2, VolumeX } from "lucide-react";
import { VideoModal, setCurrentModal, clearCurrentModal } from "./VideoModal";

interface ShortsGridProps {
  videos: Array<{
    id: string;
    videoUrl: string;
    title: string;
    description: string;
    thumbnail?: string;
  }>;
}

// Video Card Component - autoplay muted in grid, opens modal with sound on click
function VideoCard({
  id,
  videoUrl,
  title,
  description
}: {
  id: string;
  videoUrl: string;
  title: string;
  description: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const openModal = useCallback(() => {
    setCurrentModal(() => setIsModalOpen(false));
    setIsModalOpen(true);
    // Pause the inline video when modal opens
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    clearCurrentModal();
    // Resume the inline video when modal closes
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
      <div className="card overflow-hidden cursor-pointer" onClick={openModal}>
        <div className="aspect-[9/16] relative bg-black group">
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
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
              <Play size={28} fill="var(--primary)" className="text-primary ml-1" />
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
            download={`valavaara-${id}.mp4`}
            className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <Download size={18} />
          </a>
        </div>
        <div className="p-3">
          <h3 className="font-bold text-sm text-foreground truncate">{title}</h3>
          <p className="text-xs text-foreground-muted mt-0.5 line-clamp-1">{description}</p>
        </div>
      </div>

      {/* Video Modal for fullscreen with sound */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        videoSrc={videoUrl}
        title={title}
        downloadFileName={`valavaara-${id}.mp4`}
      />
    </>
  );
}

export function ShortsGrid({ videos }: ShortsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          id={video.id}
          videoUrl={video.videoUrl}
          title={video.title}
          description={video.description}
        />
      ))}
    </div>
  );
}
