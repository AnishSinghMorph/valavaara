"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
];

interface PosterCardProps {
  poster: Poster;
  index: number;
}

function PosterCard({ poster, index }: PosterCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card overflow-hidden relative">
        {/* English Poster (default) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster.engSrc}
          alt={`${poster.alt} - English`}
          className="w-full h-auto object-contain"
          style={{ 
            opacity: isHovered ? 0 : 1,
            transition: 'none'
          }}
        />
        {/* Kannada Poster (on hover) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster.kndSrc}
          alt={`${poster.alt} - Kannada`}
          className="absolute inset-0 w-full h-full object-contain"
          style={{ 
            opacity: isHovered ? 1 : 0,
            transition: 'none'
          }}
        />
        
        {/* Language indicator */}
        <div className="absolute top-2 right-2 z-10">
          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
            isHovered 
              ? "bg-orange-500 text-white" 
              : "bg-white/90 text-gray-800"
          }`}>
            {isHovered ? "ಕನ್ನಡ" : "ENG"}
          </span>
        </div>

        {/* Download buttons on hover */}
        <div className="absolute bottom-1 left-1 right-1 z-10 flex justify-between"
          style={{ 
            opacity: isHovered ? 1 : 0,
            transition: 'none'
          }}
        >
          <a
            href={poster.engSrc}
            download={`valavaara-poster-${poster.id}-eng.jpg`}
            className="bg-orange-500 hover:bg-orange-600 text-white text-[12px] py-0.5 px-1 rounded flex items-center gap-0.9"
            onClick={(e) => e.stopPropagation()}
          >
            <Download size={10} />
            ENG
          </a>
          <a
            href={poster.kndSrc}
            download={`valavaara-poster-${poster.id}-knd.jpg`}
            className="bg-orange-500 hover:bg-orange-600 text-white text-[12px] py-0.5 px-1 rounded flex items-center gap-0.9"
            onClick={(e) => e.stopPropagation()}
          >
            <Download size={10} />
            ಕನ್ನಡ
          </a>
        </div>
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
