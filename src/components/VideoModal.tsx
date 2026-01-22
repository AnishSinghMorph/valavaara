"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  title?: string;
  downloadFileName?: string;
}

export function VideoModal({ 
  isOpen, 
  onClose, 
  videoSrc, 
  title,
  downloadFileName 
}: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Pause video when modal closes
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isOpen]);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>

            {/* Title */}
            {title && (
              <h3 className="text-white text-lg font-bold mb-2">{title}</h3>
            )}

            {/* Video */}
            <div className="relative rounded-lg overflow-hidden bg-black">
              <video
                ref={videoRef}
                src={videoSrc}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                controls
                preload="metadata"
                className="w-full h-auto max-h-[80vh]"
              />

              {/* Controls overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <button
                  onClick={toggleMute}
                  className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>

                {downloadFileName && (
                  <a
                    href={videoSrc}
                    download={downloadFileName}
                    className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Download size={20} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Global video modal manager to ensure only 1 video plays at a time
let currentModalCloseCallback: (() => void) | null = null;

export function setCurrentModal(closeCallback: () => void | null) {
  if (currentModalCloseCallback && currentModalCloseCallback !== closeCallback) {
    currentModalCloseCallback();
  }
  currentModalCloseCallback = closeCallback;
}

export function clearCurrentModal() {
  currentModalCloseCallback = null;
}
