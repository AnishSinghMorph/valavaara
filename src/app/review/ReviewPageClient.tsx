"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { instagramReels } from "@/data/reviews";
import { reviewVideos, youtubeReviews, pressAssets } from "@/data/content";
import { VideoModal, setCurrentModal } from "@/components/VideoModal";
import { Play, Volume2, VolumeX } from "lucide-react";

// VideoCard component matching press-kit style
function VideoCard({
  videoUrl,
  title,
  description,
}: {
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
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
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
      <div className="card overflow-hidden group cursor-pointer" onClick={openModal}>
        <div className="aspect-[9/16] relative bg-black">
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            autoPlay
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors opacity-0 group-hover:opacity-100">
            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
              <Play size={20} fill="var(--primary)" className="text-primary ml-0.5" />
            </div>
          </div>
          <button
            onClick={toggleMute}
            className="absolute bottom-2 left-2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full z-10"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <div className="absolute bottom-2 right-2 left-14 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
            <p className="text-white text-xs font-medium truncate">{title}</p>
          </div>
        </div>
        <div className="p-3">
          <p className="text-foreground-muted text-sm line-clamp-2">{description}</p>
        </div>
      </div>

      <VideoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        videoSrc={videoUrl}
        title={title}
      />
    </>
  );
}

export default function ReviewPageClient() {
  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement("script");
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Process embeds when script loads
    script.onload = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="py-12 px-4 text-center border-b border-foreground-light/20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary" style={{ fontFamily: 'var(--font-title)' }}>Reviews</h1>
        <p className="text-foreground-muted text-lg">
          Watch what people are saying about Valavaara
        </p>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* YouTube Review Shorts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">Celebrity Review Shorts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {youtubeReviews.shorts.map((video) => (
              <div key={video.id} className="card overflow-hidden">
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
                  <h3 className="font-bold text-sm text-foreground line-clamp-2">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* YouTube Full Reviews */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">Full Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {youtubeReviews.fullVideos.map((video) => (
              <div key={video.id} className="card overflow-hidden">
                <div className="aspect-video relative">
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
                  <h3 className="font-bold text-sm text-foreground line-clamp-2">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Celebrity Interviews Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">Celebrity Interviews</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {reviewVideos.bengaluru
              .filter(video =>
                ['bengaluru-girish', 'bengaluru-nagathihalli', 'bengaluru-pavan',
                  'bengaluru-lokesh', 'bengaluru-ananya', 'bengaluru-interview-1', 'bengaluru-interview-2', 'celebrities-interview-1',
                  'celebrities-interview-2', 'celebrities-interview-3', 'celebrities-interview-4', 'celebrities-interview-5', 'celebrities-interview-6',
                  'celebrities-interview-7', 'celebrities-interview-8', 'celebrities-interview-9', 'celebrities-interview-10'].includes(video.id)
              )
              .map((video, index) => (
                <VideoCard
                  key={video.id}
                  videoUrl={video.videoUrl}
                  title={video.title}
                  description={video.description}
                />
              ))}
          </div>
        </section>

        {/* Celebrity Trailer Launches */}
        {pressAssets.celebrityLaunches && pressAssets.celebrityLaunches.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-primary">Celebrity Trailer Launches</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {pressAssets.celebrityLaunches.map((celebrity, i) => (
                <div key={i} className="card overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={celebrity.engImage}
                    alt={celebrity.name}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                  <div className="p-3">
                    <h3 className="font-bold text-sm text-foreground">{celebrity.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Celebrity Reviews (Images) */}
        {pressAssets.celebrityReviews && pressAssets.celebrityReviews.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-primary">Celebrity Reviews</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {pressAssets.celebrityReviews.map((review, i) => (
                <div key={i} className="card overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={review.url}
                    alt={review.name}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Audience Reviews by City */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">Audience Reviews</h2>

          {/* Bengaluru */}
          {reviewVideos.bengaluru.filter(v => !['bengaluru-girish', 'bengaluru-nagathihalli', 'bengaluru-pavan', 'bengaluru-lokesh', 'bengaluru-ananya', 'bengaluru-interview-1', 'bengaluru-interview-2', 'celebrities-interview-1', 'celebrities-interview-2', 'celebrities-interview-3', 'celebrities-interview-4', 'celebrities-interview-5', 'celebrities-interview-6', 'celebrities-interview-7', 'celebrities-interview-8', 'celebrities-interview-9', 'celebrities-interview-10'].includes(v.id)).length > 0 && (
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-4"><span className="gradient-text">🏙️ Bengaluru Reviews</span></h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
                {reviewVideos.bengaluru
                  .filter(v => !['bengaluru-girish', 'bengaluru-nagathihalli', 'bengaluru-pavan', 'bengaluru-lokesh', 'bengaluru-ananya', 'bengaluru-interview-1', 'bengaluru-interview-2', 'celebrities-interview-1', 'celebrities-interview-2', 'celebrities-interview-3', 'celebrities-interview-4', 'celebrities-interview-5', 'celebrities-interview-6', 'celebrities-interview-7', 'celebrities-interview-8', 'celebrities-interview-9', 'celebrities-interview-10'].includes(v.id))
                  .map((video) => (
                    <VideoCard key={video.id} videoUrl={video.videoUrl} title={video.title} description={video.description} />
                  ))}
              </div>
            </div>
          )}

          {/* Shivamogga */}
          {reviewVideos.shivamogga && reviewVideos.shivamogga.length > 0 && (
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-4"><span className="gradient-text">🎭 Shivamogga Reviews</span></h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
                {reviewVideos.shivamogga.map((video) => (
                  <VideoCard key={video.id} videoUrl={video.videoUrl} title={video.title} description={video.description} />
                ))}
              </div>
            </div>
          )}

          {/* Mysuru */}
          {reviewVideos.mysuru && reviewVideos.mysuru.length > 0 && (
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-4"><span className="gradient-text">🌟 Mysuru Reviews</span></h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
                {reviewVideos.mysuru.map((video) => (
                  <VideoCard key={video.id} videoUrl={video.videoUrl} title={video.title} description={video.description} />
                ))}
              </div>
            </div>
          )}

          {/* General */}
          {reviewVideos.general && reviewVideos.general.length > 0 && (
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-4"><span className="gradient-text">❤️ General Reviews</span></h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
                {reviewVideos.general.map((video) => (
                  <VideoCard key={video.id} videoUrl={video.videoUrl} title={video.title} description={video.description} />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Instagram Reviews Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">Social Media Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {instagramReels.map((reel, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center"
              >
                <div
                  className="instagram-embed-wrapper w-full flex justify-center"
                  dangerouslySetInnerHTML={{ __html: reel.embedCode }}
                />
                <p className="text-gray-500 text-sm mt-4">
                  Posted on {new Date(reel.date.split("-").reverse().join("-")).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer Note */}
      <footer className="py-8 px-4 text-center text-foreground-muted text-sm border-t border-foreground-light/20">
        <p>More reviews coming soon...</p>
      </footer>
    </div>
  );
}

// Add TypeScript declaration for Instagram embed
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}
