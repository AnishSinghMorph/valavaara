"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import MainPage from "@/app/main/page";

const HERO_SCROLL_HEIGHT = "220vh";
const FILM_SCROLL_HEIGHT = "200vh";

const FILM_EMBEDS = [
  { code: "kn", label: "Kannada", videoId: "0HNt5F_lEq4" },
  { code: "hi", label: "Hindi", videoId: "f6K89V1VGH4" },
  { code: "ta", label: "Tamil", videoId: "aHneBgdc4KQ" },
  { code: "te", label: "Telugu", videoId: "KXth3Cikz0k" },
] as const;

const RATING_BADGES = [
  { src: "/Asset 1@2x.png", alt: "BookMyShow rates Valavaara 9.9/10", width: 247, height: 154 },
  { src: "/Asset 2@2x.png", alt: "IMDb rates Valavaara 7.3/10", width: 247, height: 154 },
  { src: "/Asset 3@2x.png", alt: "Critic rating 4/5", width: 355, height: 152 },
  { src: "/Asset 4@2x.png", alt: "TV9 Kannada rates Valavaara 4/5", width: 355, height: 181 },
  { src: "/Asset 5@2x.png", alt: "Times of India rates Valavaara 4/5", width: 355, height: 174 },
  { src: "/Asset 6@2x.png", alt: "Critic rating 3.5/5", width: 386, height: 157 },
  { src: "/Asset 7@2x.png", alt: "Critic rating 4/5", width: 385, height: 178 },
  { src: "/Asset 8@2x.png", alt: "Critic rating 3.5/5", width: 355, height: 164 },
  { src: "/Asset 9@2x.png", alt: "Critic rating 3.5/5", width: 386, height: 154 },
  { src: "/Asset 10@2x.png", alt: "Critic rating 3.5/5", width: 386, height: 163 },
];

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Scroll cue fades out as soon as the user starts scrolling
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  // Rating badges slide/fade in together, hold, then fade out with the poster
  const badgesOpacity = useTransform(scrollYProgress, [0.12, 0.32, 0.65, 0.88], [0, 1, 1, 0]);
  const badgesY = useTransform(scrollYProgress, [0.12, 0.32], [24, 0]);

  // Poster + overlay fade out near the end, revealing the main page underneath
  const posterOpacity = useTransform(scrollYProgress, [0.65, 0.95], [1, 0]);

  // Full-length film embed: fades in as it's scrolled to, holds fullscreen, then fades into the main site
  const filmRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: filmScrollYProgress } = useScroll({
    target: filmRef,
    offset: ["start start", "end start"],
  });
  const filmOpacity = useTransform(filmScrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const [activeLanguage, setActiveLanguage] = useState<(typeof FILM_EMBEDS)[number]["code"]>("kn");
  const activeFilm = FILM_EMBEDS.find((f) => f.code === activeLanguage) ?? FILM_EMBEDS[0];

  return (
    <>
      {/* Cancel out the global `main { padding-top }` (reserved for the fixed header)
          so the poster sits flush against the top of the viewport while it's hidden. */}
      <div ref={heroRef} className="relative -mt-[52px] md:-mt-[60px]" style={{ height: HERO_SCROLL_HEIGHT }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
          <motion.div style={{ opacity: posterOpacity }} className="absolute inset-0">
            {/* Full-screen poster background - Mobile */}
            <Image
              src="/assets/images/Mob Preview.png"
              alt="Valavaara Movie Poster"
              fill
              className="object-cover object-top md:hidden"
              priority
              quality={100}
            />

            {/* Full-screen poster background - Desktop */}
            <Image
              src="/assets/images/Web Preview.jpg"
              alt="Valavaara Movie Poster"
              fill
              className="object-cover hidden md:block"
              priority
              quality={100}
            />

            {/* Dark overlay for better visibility */}
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>

          {/* Rating badges - all revealed side by side on scroll.
              Desktop-only: the mobile poster already has these baked into the artwork. */}
          <motion.div
            style={{ opacity: badgesOpacity, y: badgesY }}
            className="absolute inset-x-0 bottom-28 z-20 hidden md:flex flex-wrap justify-center items-center gap-3 px-6 max-w-2xl mx-auto"
          >
            {RATING_BADGES.map((badge) => (
              <div key={badge.src} className="relative h-11 md:h-[52px] w-24 md:w-28 drop-shadow-2xl">
                <Image
                  src={badge.src}
                  alt={badge.alt}
                  fill
                  sizes="112px"
                  className="object-contain"
                />
              </div>
            ))}
          </motion.div>

          {/* Bouncing scroll cue */}
          <motion.a
            href="#landing-main-content"
            style={{ opacity: indicatorOpacity }}
            className="absolute bottom-8 left-0 right-0 z-20 flex flex-col items-center gap-1 text-white"
            aria-label="Scroll to explore Valavaara"
          >
            <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
            <ChevronDown className="animate-bounce" size={28} />
          </motion.a>
        </div>
      </div>

      {/* Full-length film, pinned fullscreen while scrolling through it */}
      <div ref={filmRef} className="relative" style={{ height: FILM_SCROLL_HEIGHT }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
          <motion.div
            style={{ opacity: filmOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4"
          >
            {/* Heading */}
            <h2 className="text-xl md:text-3xl font-bold text-center text-foreground px-4">
              Watch the Full Film in <span className="gradient-text">Multiple Languages</span>
            </h2>

            {/* Language switcher - own row above the video, always fully visible */}
            <div className="flex justify-center gap-2 px-4 flex-wrap z-20">
              {FILM_EMBEDS.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setActiveLanguage(lang.code)}
                  className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-medium backdrop-blur-sm transition-colors ${
                    activeLanguage === lang.code
                      ? "bg-primary text-white"
                      : "bg-black/50 text-white/80 hover:bg-black/70"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Video - 90% of the screen, not true fullscreen, so the tabs above stay clear */}
            <div className="relative w-[95%] md:w-[90%] max-w-6xl aspect-video max-h-[75vh] rounded-lg overflow-hidden shadow-2xl">
              <iframe
                key={activeFilm.code}
                src={`https://www.youtube.com/embed/${activeFilm.videoId}?rel=0&modestbranding=1`}
                title={`Valavaara Full Movie - ${activeFilm.label}`}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div id="landing-main-content">
        <MainPage />
      </div>
    </>
  );
}
