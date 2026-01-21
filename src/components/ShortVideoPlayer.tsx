"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX, Play, Pause, Download } from "lucide-react";

interface ShortVideoPlayerProps {
  videoUrl: string;
  title: string;
  className?: string;
  slug?: string;
}

export function ShortVideoPlayer({ videoUrl, title, className = "", slug }: ShortVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fullscreenVideoRef = useRef<HTMLVideoElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play muted video when in view
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // Handle fullscreen video
  useEffect(() => {
    if (isFullscreen && fullscreenVideoRef.current) {
      fullscreenVideoRef.current.currentTime = videoRef.current?.currentTime || 0;
      fullscreenVideoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [isFullscreen]);

  // Prevent body scroll when fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  const handleVideoClick = () => {
    setIsFullscreen(true);
    setIsMuted(false);
  };

  const handleClose = () => {
    setIsFullscreen(false);
    setIsMuted(true);
    if (fullscreenVideoRef.current) {
      fullscreenVideoRef.current.pause();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (fullscreenVideoRef.current) {
      if (isPlaying) {
        fullscreenVideoRef.current.pause();
      } else {
        fullscreenVideoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {/* Thumbnail/Preview Video - Muted Auto-play */}
      <div
        className={`relative cursor-pointer group ${className}`}
        onClick={handleVideoClick}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          loop
          playsInline
          className="w-full h-full object-cover rounded-xl"
        />
        {/* Play indicator overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
            <Play size={28} fill="var(--primary)" className="text-primary ml-1" />
          </div>
        </div>
        {/* Tap to watch with sound indicator */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2">
          <div className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
            <VolumeX size={14} className="text-white" />
            <span className="text-white text-xs">Tap for sound</span>
          </div>
          <a
            href={videoUrl}
            download={slug ? `valavaara-${slug}.mp4` : 'valavaara-video.mp4'}
            className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <Download size={14} />
          </a>
        </div>
      </div>

      {/* Fullscreen Modal with Audio */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
            onClick={handleClose}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={28} />
            </button>

            {/* Title */}
            <div className="absolute top-4 left-4 z-10">
              <h3 className="text-white font-bold text-lg">{title}</h3>
            </div>

            {/* Video */}
            <video
              ref={fullscreenVideoRef}
              src={videoUrl}
              muted={isMuted}
              playsInline
              loop
              className="max-h-screen max-w-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Controls */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
              </button>
              <button
                onClick={toggleMute}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
              <a
                href={videoUrl}
                download={slug ? `valavaara-${slug}.mp4` : 'valavaara-video.mp4'}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Download size={24} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
