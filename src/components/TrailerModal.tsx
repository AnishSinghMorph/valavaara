"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId?: string;
}

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        config: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (event: { target: YTPlayer }) => void;
            onStateChange?: (event: { data: number }) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YTPlayer {
  destroy: () => void;
  playVideo: () => void;
  pauseVideo: () => void;
}

export function TrailerModal({ isOpen, onClose, videoId = "q95vVeOrjfQ" }: TrailerModalProps) {
  const playerRef = useRef<YTPlayer | null>(null);
  const [isAPIReady, setIsAPIReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load YouTube IFrame API
  useEffect(() => {
    if (typeof window !== "undefined" && !window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        setIsAPIReady(true);
      };
    } else if (window.YT) {
      setIsAPIReady(true);
    }
  }, []);

  const initPlayer = useCallback(() => {
    if (!isAPIReady || !isOpen || playerRef.current) return;

    // Small delay to ensure DOM is ready
    setTimeout(() => {
      if (document.getElementById("youtube-player")) {
        playerRef.current = new window.YT.Player("youtube-player", {
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
          },
          events: {
            onReady: (event) => {
              event.target.playVideo();
            },
            onStateChange: (event) => {
              // Video ended
              if (event.data === window.YT.PlayerState.ENDED) {
                onClose();
              }
            },
          },
        });
      }
    }, 100);
  }, [isAPIReady, isOpen, videoId, onClose]);

  useEffect(() => {
    if (isOpen && isAPIReady) {
      initPlayer();
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [isOpen, isAPIReady, initPlayer]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Cleanup player when modal closes
  useEffect(() => {
    if (!isOpen && playerRef.current) {
      playerRef.current.destroy();
      playerRef.current = null;
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

          {/* Modal Content */}
          <motion.div
            ref={containerRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, type: "spring", damping: 25 }}
            className="relative w-full max-w-5xl mx-4 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="Close trailer"
            >
              <X size={28} />
            </button>

            {/* Skip hint */}
            <div className="absolute -top-12 left-0 text-white/60 text-sm flex items-center gap-2">
              <span className="px-2 py-1 bg-white/10 rounded text-xs">ESC</span>
              <span>or click outside to close</span>
            </div>

            {/* Video Container */}
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
              <div id="youtube-player" className="absolute inset-0 w-full h-full" />
            </div>

            {/* Auto-close message */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center text-white/60 text-sm mt-4"
            >
              Video will close automatically when finished • Enjoy the trailer! 🎬
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
