"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Download, Film, Clapperboard, ImageIcon, X } from "lucide-react";
import { CharacterCard } from "@/components/CharacterCard";
import { Footer } from "@/components/Footer";
import { FloatingBookButton } from "@/components/BookingBar";
import { PosterGallery } from "@/components/PosterGallery";
import { VideoModal, setCurrentModal } from "@/components/VideoModal";
import { characters, crew, trustBadges, shorts, youtubeReviews, reviewVideos, pressAssets } from "@/data/content";
import { analytics } from "@/lib/analytics";

function HomePageContent() {
  const searchParams = useSearchParams();

  // Track URL params for analytics
  useEffect(() => {
    const trailerParam = searchParams.get("trailer");
    if (trailerParam === "1" || trailerParam === "true") {
      analytics.autoOpenTrailer();
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [searchParams]);

  // IDs of celebrity interview videos
  const celebrityInterviewIds = [
    'bengaluru-girish', 'bengaluru-nagathihalli', 'bengaluru-pavan',
    'bengaluru-lokesh', 'bengaluru-ananya', 'bengaluru-interview-1', 'bengaluru-interview-2',
    'celebrities-interview-1', 'celebrities-interview-2', 'celebrities-interview-3',
    'celebrities-interview-4', 'celebrities-interview-5', 'celebrities-interview-6',
    'celebrities-interview-7', 'celebrities-interview-8', 'celebrities-interview-9', 'celebrities-interview-10'
  ];
  const interviewVideos = reviewVideos.bengaluru.filter(v => celebrityInterviewIds.includes(v.id)).slice(0, 4);

  // Modal state for interview videos
  const [modalVideo, setModalVideo] = useState<{ src: string; title: string } | null>(null);
  const openModal = useCallback((src: string, title: string) => {
    setCurrentModal(() => setModalVideo(null));
    setModalVideo({ src, title });
  }, []);
  const closeModal = useCallback(() => setModalVideo(null), []);

  // Lightbox state for images
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string; downloadName: string } | null>(null);

  // Interview IDs filter (excluding audience reviews)
  const interviewExcludeIds = [
    'bengaluru-girish', 'bengaluru-nagathihalli', 'bengaluru-pavan', 'bengaluru-lokesh',
    'bengaluru-ananya', 'bengaluru-interview-1', 'bengaluru-interview-2',
    'celebrities-interview-1', 'celebrities-interview-2', 'celebrities-interview-3',
    'celebrities-interview-4', 'celebrities-interview-5', 'celebrities-interview-6',
    'celebrities-interview-7', 'celebrities-interview-8', 'celebrities-interview-9', 'celebrities-interview-10'
  ];
  const bengaluruAudienceReviews = reviewVideos.bengaluru.filter(v => !interviewExcludeIds.includes(v.id));

  return (
    <>
      {/* Image Lightbox */}
      {lightboxImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={lightboxImage.src} alt={lightboxImage.alt} className="w-full h-auto rounded-lg shadow-2xl" />
            <div className="mt-3 flex justify-between items-center">
              <p className="text-white font-semibold">{lightboxImage.alt}</p>
              <a
                href={lightboxImage.src}
                download={lightboxImage.downloadName}
                className="flex items-center gap-1 bg-primary text-white px-3 py-1.5 rounded-full text-sm font-medium hover:bg-primary/80 transition-colors"
                onClick={e => e.stopPropagation()}
              >
                <Download size={14} /> Download
              </a>
            </div>
          </div>
        </motion.div>
      )}

      {/* Video Modal */}
      {modalVideo && (
        <VideoModal
          isOpen={!!modalVideo}
          onClose={closeModal}
          videoSrc={modalVideo.src}
          title={modalVideo.title}
          downloadFileName={`valavaara-${modalVideo.title.toLowerCase().replace(/\s+/g, '-')}.mp4`}
        />
      )}

      {/* Videos Section - Trailers & Songs */}
      <section className="pt-24 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Watch <span className="gradient-text">Trailers & Songs</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Trailer 2 */}
            <div className="card overflow-hidden">
              <div className="aspect-video relative">
                <iframe
                  src="https://www.youtube.com/embed/LAVMwUT3cZc"
                  title="Valavaara | Trailer 2 | In Cinemas Now | Trending Kannada Family Entertainer"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <div className="p-3">
                <h4 className="font-bold text-xs md:text-sm text-foreground line-clamp-2">Trailer 2</h4>
              </div>
            </div>
            {/* Trailer 1 */}
            <div className="card overflow-hidden">
              <div className="aspect-video relative">
                <iframe
                  src="https://www.youtube.com/embed/q95vVeOrjfQ"
                  title="Valavaara | Official Trailer | Kannada | Releasing Jan 30th 2026"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <div className="p-3">
                <h4 className="font-bold text-xs md:text-sm text-foreground line-clamp-2">Official Trailer</h4>
              </div>
            </div>
            {/* Song 1 - Valavaara Anthem */}
            <div className="card overflow-hidden">
              <div className="aspect-video relative">
                <iframe
                  src="https://www.youtube.com/embed/vPISchnA_S8"
                  title="Valavaara Anthem | Lyrical Video | Valavaara | Sutan Gowda"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <div className="p-3">
                <h4 className="font-bold text-xs md:text-sm text-foreground line-clamp-2">Valavaara Anthem</h4>
              </div>
            </div>
            {/* Song 2 - Gowra */}
            <div className="card overflow-hidden">
              <div className="aspect-video relative">
                <iframe
                  src="https://www.youtube.com/embed/xEaxAY-IWUY"
                  title="Gowra - Lyrical Video | Valavaara - 30 Jan, 2026 Release | Kadri Manikanth | Pramod Maravanthe"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <div className="p-3">
                <h4 className="font-bold text-xs md:text-sm text-foreground line-clamp-2">Gowra - Lyrical Video</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              Celebrity <span className="gradient-text">Reviews</span>
            </h2>
            <Link href="/review" className="text-primary font-medium hover:underline">
              More Reviews →
            </Link>
          </div>

          {/* 1. Celebrity Review Shorts (YouTube) */}
          <h3 className="text-lg font-bold mb-4"><span className="gradient-text">⭐ Celebrity Review Shorts</span></h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {youtubeReviews.shorts.slice(0, 3).map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="card overflow-hidden">
                  <div className="aspect-[9/16] relative">
                    <iframe
                      src={video.embedUrl}
                      title={video.title}
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="font-bold text-xs md:text-sm text-foreground line-clamp-2">{video.title}</h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 2. Celebrity Interviews — click to open fullscreen */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold"><span className="gradient-text">🎬 Celebrity Interviews</span></h3>
            <Link href="/review" className="text-primary text-sm font-medium hover:underline">More Reviews →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {interviewVideos.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card overflow-hidden cursor-pointer group"
                onClick={() => openModal(video.videoUrl, video.title)}
              >
                <div className="aspect-[9/16] relative bg-black">
                  <video
                    src={video.videoUrl}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
                      <Play size={20} fill="var(--primary)" className="text-primary ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                    <p className="text-white text-xs font-medium truncate">{video.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 3. Celebrity Launches & Reviews — combined 2-col grid with download */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold"><span className="gradient-text">🌟 Celebrity Launches & 📸 Reviews</span></h3>
            <Link href="/review" className="text-primary text-sm font-medium hover:underline">More Reviews →</Link>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-10">
            {(pressAssets.celebrityLaunches || [])
              .filter(c => c.name === "Dr. Shivarajkumar" || c.name === "Daali")
              .map((celebrity, i) => (
                <motion.div
                  key={`cl-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="card overflow-hidden group relative cursor-pointer"
                  onClick={() => setLightboxImage({ src: celebrity.engImage, alt: celebrity.name, downloadName: `valavaara-${celebrity.name.toLowerCase().replace(/\s+/g, '-')}.jpg` })}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={celebrity.engImage} alt={celebrity.name} className="w-full h-auto group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                  <div className="p-2 flex items-center justify-between">
                    <h4 className="font-bold text-xs text-foreground">{celebrity.name}</h4>
                    <a
                      href={celebrity.engImage}
                      download={`valavaara-${celebrity.name.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                      className="text-primary hover:text-primary/80 transition-colors"
                      onClick={e => e.stopPropagation()}
                    >
                      <Download size={14} />
                    </a>
                  </div>
                </motion.div>
              ))}
            {(pressAssets.celebrityReviews || []).map((review, i) => (
              <motion.div
                key={`cr-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card overflow-hidden group relative cursor-pointer"
                onClick={() => setLightboxImage({ src: review.url, alt: review.name, downloadName: `valavaara-celebrity-review-${i + 1}.png` })}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={review.url} alt={review.name} className="w-full h-auto group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                <div className="p-2 flex justify-end">
                  <a
                    href={review.url}
                    download={`valavaara-celebrity-review-${i + 1}.png`}
                    className="text-primary hover:text-primary/80 transition-colors"
                    onClick={e => e.stopPropagation()}
                  >
                    <Download size={14} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 4. Bengaluru Audience Reviews */}
          {bengaluruAudienceReviews.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold"><span className="gradient-text">🏙️ Bengaluru Audience Reviews</span></h3>
                <Link href="/review" className="text-primary text-sm font-medium hover:underline">More Reviews →</Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {bengaluruAudienceReviews.slice(0, 6).map((video, i) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="card overflow-hidden cursor-pointer group"
                    onClick={() => openModal(video.videoUrl, video.title)}
                  >
                    <div className="aspect-[9/16] relative bg-black">
                      <video
                        src={video.videoUrl}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        autoPlay
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors">
                        <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all">
                          <Play size={16} fill="var(--primary)" className="text-primary ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                        <p className="text-white text-xs font-medium truncate">{video.title}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>




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
              { href: "/watch/reviews", icon: Film, label: "Reviews", emoji: "⭐", color: "from-accent-pink/20 to-secondary/20" },
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
              src="/assets/press-kit/News Paper Review_forInsta.jpg"
              alt="Valavaara Newspaper Review"
              className="w-full h-auto"
            />
            <button
              onClick={() => {
                analytics.download('press', 'news-1', 'valavaara-newspaper-review.jpg');
                const link = document.createElement('a');
                link.href = '/assets/press-kit/News Paper Review_forInsta.jpg';
                link.download = 'valavaara-newspaper-review.jpg';
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
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingBookButton />
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
