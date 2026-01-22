"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Download } from "lucide-react";

interface Poster {
  id: number;
  engSrc: string;
  kndSrc: string;
  alt: string;
}

const posters: Poster[] = [
  { id: 1, engSrc: "/assets/posters/eng/poster1.jpg", kndSrc: "/assets/posters/knd/poster1.jpg", alt: "Valavaara Poster 1" },
  { id: 2, engSrc: "/assets/posters/eng/poster2.jpg", kndSrc: "/assets/posters/knd/poster2.jpg", alt: "Valavaara Poster 2" },
  { id: 3, engSrc: "/assets/posters/eng/poster3.jpg", kndSrc: "/assets/posters/knd/poster3.jpg", alt: "Valavaara Poster 3" },
  { id: 4, engSrc: "/assets/posters/eng/poster4.jpg", kndSrc: "/assets/posters/knd/poster4.jpg", alt: "Valavaara Poster 4" },
  { id: 6, engSrc: "/assets/posters/eng/poster6.jpg", kndSrc: "/assets/posters/knd/poster6.jpg", alt: "Valavaara Poster 6" },
  { id: 7, engSrc: "/assets/posters/eng/poster7.jpg", kndSrc: "/assets/posters/knd/poster7.jpg", alt: "Valavaara Poster 7" },
  { id: 8, engSrc: "/assets/posters/eng/poster8.jpg", kndSrc: "/assets/posters/knd/poster8.jpg", alt: "Valavaara Poster 8" },
  { id: 9, engSrc: "/assets/promotions/posterPromotion1.jpeg", kndSrc: "/assets/promotions/posterPromotion1.jpeg", alt: "Poster Promotion" },
  { id: 10, engSrc: "/assets/promotions/theatreStandeeENG.jpeg", kndSrc: "/assets/promotions/theatreStandeeKND.jpeg", alt: "Theatre Standee" },
];

interface PosterCardProps {
  poster: Poster;
  index: number;
}

function PosterCard({ poster, index }: PosterCardProps) {
  const [showKannada, setShowKannada] = useState(false);
  const [kannadaLoaded, setKannadaLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Preload Kannada image on first hover
  const handleHover = useCallback(() => {
    setIsHovered(true);
    if (!kannadaLoaded && poster.engSrc !== poster.kndSrc) {
      const img = new window.Image();
      img.src = poster.kndSrc;
      img.onload = () => setKannadaLoaded(true);
    }
  }, [kannadaLoaded, poster.kndSrc, poster.engSrc]);

  const handleClick = useCallback(() => {
    if (poster.engSrc !== poster.kndSrc) {
      setShowKannada((prev) => !prev);
    }
  }, [poster.engSrc, poster.kndSrc]);

  const currentSrc = showKannada ? poster.kndSrc : poster.engSrc;
  const currentLang = showKannada ? "ಕನ್ನಡ" : "ENG";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.05, 0.3) }}
      className="relative group cursor-pointer"
      onMouseEnter={handleHover}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="card overflow-hidden relative aspect-[3/4]">
        {/* Current language image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSrc}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <Image
              src={currentSrc}
              alt={`${poster.alt} - ${currentLang}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover"
              priority={index < 3}
              loading={index < 3 ? "eager" : "lazy"}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Language indicator */}
        <div className="absolute top-2 right-2 z-10">
          <span className={`px-2 py-1 rounded-full text-xs font-bold transition-colors ${
            showKannada 
              ? "bg-orange-500 text-white" 
              : "bg-white/90 text-gray-800"
          }`}>
            {currentLang}
          </span>
        </div>

        {/* Download buttons on hover */}
        <div 
          className={`absolute bottom-1 left-1 right-1 z-10 flex justify-between transition-opacity ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <a
            href={poster.engSrc}
            download={`valavaara-poster-${poster.id}-eng.jpg`}
            className="bg-orange-500 hover:bg-orange-600 text-white text-[12px] py-0.5 px-1 rounded flex items-center gap-0.5"
            onClick={(e) => e.stopPropagation()}
          >
            <Download size={10} />
            ENG
          </a>
          {poster.engSrc !== poster.kndSrc && (
            <a
              href={poster.kndSrc}
              download={`valavaara-poster-${poster.id}-knd.jpg`}
              className="bg-orange-500 hover:bg-orange-600 text-white text-[12px] py-0.5 px-1 rounded flex items-center gap-0.5"
              onClick={(e) => e.stopPropagation()}
            >
              <Download size={10} />
              ಕನ್ನಡ
            </a>
          )}
        </div>

        {/* Click hint for language toggle */}
        {poster.engSrc !== poster.kndSrc && (
          <div className={`absolute bottom-8 left-0 right-0 text-center transition-opacity ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}>
            <span className="bg-black/50 text-white text-[10px] px-2 py-0.5 rounded">
              Click to toggle language
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

interface PosterGalleryProps {
  showAll?: boolean;
  maxPosters?: number;
}

export function PosterGallery({ showAll = false, maxPosters = 6 }: PosterGalleryProps) {
  const displayPosters = showAll ? posters : posters.slice(0, maxPosters);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {displayPosters.map((poster, index) => (
        <PosterCard key={poster.id} poster={poster} index={index} />
      ))}
    </div>
  );
}

export { posters };
