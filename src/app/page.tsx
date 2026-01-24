"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Ticket, Download, Film, Clapperboard, ImageIcon } from "lucide-react";
import { CharacterCard } from "@/components/CharacterCard";
import { Footer } from "@/components/Footer";
import { FloatingBookButton } from "@/components/BookingBar";
import { TrailerModal } from "@/components/TrailerModal";
import { PosterGallery } from "@/components/PosterGallery";
import { characters, crew, movieInfo, trustBadges, shorts, trailer, BOOKING_URL } from "@/data/content";
import { analytics } from "@/lib/analytics";

// Extract YouTube video ID from trailer URL
const getYouTubeVideoId = (url: string) => {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : "";
};

function HomePageContent() {
  const searchParams = useSearchParams();
  const [showTrailer, setShowTrailer] = useState(false);

  // Auto-open trailer if URL has ?trailer=1 parameter
  useEffect(() => {
    const trailerParam = searchParams.get("trailer");
    if (trailerParam === "1" || trailerParam === "true") {
      setShowTrailer(true);
      analytics.autoOpenTrailer();
      // Remove the parameter from URL without page reload
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [searchParams]);

  const handleTrailerClose = () => {
    setShowTrailer(false);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background-alt via-background to-background" />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 text-6xl md:text-8xl opacity-20"
          >
            🐄
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-40 right-10 text-5xl md:text-7xl opacity-20"
          >
            🌾
          </motion.div>
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-40 right-20 text-4xl md:text-6xl opacity-15"
          >
            ☀️
          </motion.div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 text-center">
          {/* Certification Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-6"
          >
            <span className="badge-certified text-sm">
              ✓ U Certified — Family Friendly
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4"
          >
            <Image 
              src="/assets/logos/Eng.png" 
              alt="Valavaara" 
              width={400}
              height={160}
              className="mx-auto h-24 md:h-32 lg:h-40 w-auto"
              priority
            />
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-foreground-muted mb-8 max-w-2xl mx-auto"
          >
            {movieInfo.tagline}
          </motion.p>

          {/* Trailer Thumbnail */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative max-w-3xl mx-auto mb-10 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
            onClick={() => setShowTrailer(true)}
          >
            <div>
              <div className="aspect-video relative">
                {/* Trailer Thumbnail Image */}
                <Image 
                  src="/assets/images/trailer-thumbnail.jpg" 
                  alt="Valavaara Official Trailer"
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-xl"
                >
                  <Play size={36} fill="var(--primary)" className="text-primary ml-1" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button onClick={() => {
              setShowTrailer(true);
              analytics.playVideo(getYouTubeVideoId(trailer.videoUrl), 'trailer', 'Valavaara Official Trailer');
            }} className="btn btn-primary">
              <Play size={20} />
              Watch Trailer
            </button>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-book"
              onClick={() => analytics.bookingClick('hero_section')}
            >
              <Ticket size={20} />
              Book Tickets
            </a>
          </motion.div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="py-16 px-4 bg-background-alt">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-10"
          >
            Explore <span className="gradient-text">Valavaara</span>
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { href: "/watch/shorts", icon: Film, label: "Shorts", emoji: "🎬", color: "from-primary/20 to-accent-pink/20" },
              { href: "/watch/bts", icon: Clapperboard, label: "BTS", emoji: "🎥", color: "from-secondary/20 to-accent-purple/20" },
              { href: "/press-kit", icon: Download, label: "Press Kit", emoji: "📰", color: "from-accent-purple/20 to-primary/20" },
            ].map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={item.href}>
                  <div className={`card p-6 text-center bg-gradient-to-br ${item.color} hover:shadow-lg`}>
                    <span className="text-4xl mb-3 block">{item.emoji}</span>
                    <span className="font-bold text-foreground">{item.label}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Poster Gallery Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold"
              >
                <ImageIcon size={24} className="inline mr-2 text-primary" />
                Official <span className="gradient-text">Posters</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-foreground-muted text-sm mt-1"
              >
                Click to see Kannada version ✨
              </motion.p>
            </div>
            <Link href="/press-kit" className="text-primary font-medium hover:underline">
              Press Kit →
            </Link>
          </div>
          <PosterGallery maxPosters={4} />
        </div>
      </section>

      {/* Featured Shorts */}
      <section className="py-16 px-4 bg-background-alt">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              Watch <span className="gradient-text">Shorts</span>
            </h2>
            <Link href="/watch/shorts" className="text-primary font-medium hover:underline">
              View All →
            </Link>
          </div>

          {/* Horizontal scroll on mobile */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {shorts.slice(0, 4).map((short, i) => (
              <motion.div
                key={short.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="card overflow-hidden group cursor-pointer">
                  <Link href="/watch/shorts">
                    <div className="relative aspect-[9/16] bg-black">
                      {/* Autoplaying video */}
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                      >
                        <source src={short.videoUrl} type="video/mp4" />
                      </video>
                      
                      {/* Play button overlay on hover */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all">
                          <Play size={20} fill="var(--primary)" className="text-primary ml-1" />
                        </div>
                      </div>
                      
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 rounded text-white text-xs">
                        {short.duration}
                      </div>
                    </div>
                  </Link>
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        const filename = `valavaara-${short.slug}.mp4`;
                        analytics.download('short', short.id, filename);
                        const link = document.createElement('a');
                        link.href = short.videoUrl;
                        link.download = filename;
                        link.click();
                      }}
                      className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-sm text-foreground">{short.title}</h3>
                    <p className="text-xs text-foreground-muted mt-1 line-clamp-2">{short.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Characters Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-background to-background-alt">
        <div className="max-w-6xl mx-auto">


          {/* Horizontal scroll for character cards */}
          <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 justify-start md:justify-center">
            {characters.map((character, i) => (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex-shrink-0"
              >
                <CharacterCard {...character} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Crew Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-4"
          >
            Meet the <span className="gradient-text">Crew</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-foreground-muted mb-10"
          >
            The talented team behind Valavaara
            <br />
            <span className="text-sm text-primary">Hover over photos to download</span>
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {crew.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card overflow-hidden group"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform group-hover:scale-105"
                    loading={i < 3 ? undefined : "lazy"}
                    priority={i < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-bold text-lg mb-1" style={{ color: '#ffda27' }}>{member.name}</h3>
                    <p className="text-sm text-white/90">{member.role}</p>
                  </div>
                  <button
                    onClick={() => {
                      const filename = `valavaara-crew-${member.name.toLowerCase().replace(/\s+/g, '-')}.jpg`;
                      analytics.download('crew', member.name, filename);
                      const link = document.createElement('a');
                      link.href = member.image;
                      link.download = filename;
                      link.click();
                    }}
                    className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                  >
                    <Download size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotion Banner */}
      <section className="py-16 px-4 bg-gradient-to-b from-background-alt to-background">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card overflow-hidden group relative"
          >
            <img
              src="/assets/promotions/promotion.jpeg"
              alt="Valavaara Promotion"
              className="w-full h-auto"
            />
            <button
              onClick={() => {
                analytics.download('promotion', 'promo-1', 'valavaara-promotion.jpeg');
                const link = document.createElement('a');
                link.href = '/assets/promotions/promotion.jpeg';
                link.download = 'valavaara-promotion.jpeg';
                link.click();
              }}
              className="absolute bottom-4 right-4 btn btn-secondary text-sm py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Download size={16} />
              Download
            </button>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-10"
          >
            Perfect for the <span className="gradient-text">Whole Family</span>
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustBadges.map((badge, i) => (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-6 text-center"
              >
                <span className="text-3xl mb-2 block">{badge.icon}</span>
                <h3 className="font-bold text-foreground">{badge.text}</h3>
                <p className="text-sm text-foreground-muted mt-1">{badge.subtext}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-primary-dark">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-6xl mb-4 block"></span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Experience the Magic in Cinemas
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Now showing in theaters near you!
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-white text-primary hover:bg-white/90 shadow-xl"
            >
              <Ticket size={20} />
              Book Tickets on BookMyShow
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingBookButton />
      
      {/* Trailer Modal - Opens automatically when ?trailer=1 is in URL */}
      <TrailerModal 
        isOpen={showTrailer} 
        onClose={handleTrailerClose}
        videoId={getYouTubeVideoId(trailer.videoUrl)}
      />
    </>
  );
}

// Wrap in Suspense for useSearchParams
export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomePageContent />
    </Suspense>
  );
}
