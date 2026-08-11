"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import MainPage from "@/app/main/page";

const HERO_SCROLL_HEIGHT = "220vh";

const RATING_BADGES = [
  { src: "/Asset 1@2x.png", alt: "BookMyShow rates Valavaara 9.9/10" },
  { src: "/Asset 2@2x.png", alt: "IMDb rates Valavaara 7.3/10" },
  { src: "/Asset 3@2x.png", alt: "Critic rating 4/5" },
  { src: "/Asset 4@2x.png", alt: "TV9 Kannada rates Valavaara 4/5" },
  { src: "/Asset 5@2x.png", alt: "Times of India rates Valavaara 4/5" },
  { src: "/Asset 6@2x.png", alt: "Critic rating 3.5/5" },
  { src: "/Asset 7@2x.png", alt: "Critic rating 4/5" },
  { src: "/Asset 8@2x.png", alt: "Critic rating 3.5/5" },
  { src: "/Asset 9@2x.png", alt: "Critic rating 3.5/5" },
  { src: "/Asset 10@2x.png", alt: "Critic rating 3.5/5" },
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
              <Image
                key={badge.src}
                src={badge.src}
                alt={badge.alt}
                width={355}
                height={174}
                className="w-24 md:w-28 h-auto drop-shadow-2xl"
              />
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

      <div id="landing-main-content">
        <MainPage />
      </div>
    </>
  );
}
