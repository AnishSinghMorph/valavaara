"use client";

import { useEffect, useState, useRef } from "react";
import { Download, Volume2, VolumeX } from "lucide-react";
import { ShortVideoPlayer } from "./ShortVideoPlayer";

interface InstagramReel {
  id: string;
  media_url: string;
  thumbnail_url: string;
  permalink: string;
  caption: string;
}

interface InstagramReelsProps {
  fallbackVideos?: Array<{
    id: string;
    videoUrl: string;
    title: string;
    description: string;
  }>;
  limit?: number;
}

export function InstagramReels({ fallbackVideos = [], limit = 10 }: InstagramReelsProps) {
  const [reels, setReels] = useState<InstagramReel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mutedVideos, setMutedVideos] = useState<Record<string, boolean>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  useEffect(() => {
    async function fetchReels() {
      try {
        const response = await fetch(`/api/instagram/reels?limit=${limit}`);
        const data = await response.json();

        if (data.success && data.reels.length > 0) {
          setReels(data.reels);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Failed to fetch Instagram reels:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchReels();
  }, [limit]);

  const toggleMute = (videoId: string) => {
    setMutedVideos(prev => ({
      ...prev,
      [videoId]: !prev[videoId]
    }));
    const video = videoRefs.current[videoId];
    if (video) {
      video.muted = !video.muted;
    }
  };

  // Show fallback videos if Instagram fetch fails or not configured
  if (error || (!loading && reels.length === 0)) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {fallbackVideos.map((video) => (
          <div key={video.id} className="card overflow-hidden">
            <div className="aspect-[9/16] relative bg-black group">
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                ref={(el) => {
                  videoRefs.current[video.id] = el;
                }}
                src={video.videoUrl}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2 z-10">
                <button
                  onClick={() => toggleMute(video.id)}
                  className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                >
                  {mutedVideos[video.id] !== false ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <a
                  href={video.videoUrl}
                  download={`valavaara-${video.id}.mp4`}
                  className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Download size={18} />
                </a>
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-bold text-sm text-foreground truncate">
                {video.title}
              </h3>
              <p className="text-xs text-foreground-muted mt-0.5 line-clamp-1">
                {video.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card overflow-hidden animate-pulse">
            <div className="aspect-[9/16] bg-gray-200" />
            <div className="p-3">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Show Instagram reels
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {reels.map((reel) => (
        <div key={reel.id} className="card overflow-hidden">
          <div className="aspect-[9/16] relative bg-black group">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              ref={(el) => {
                videoRefs.current[reel.id] = el;
              }}
              src={reel.media_url}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2 z-10">
              <button
                onClick={() => toggleMute(reel.id)}
                className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
              >
                {mutedVideos[reel.id] !== false ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <a
                href={reel.media_url}
                download={`valavaara-${reel.id}.mp4`}
                className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <Download size={18} />
              </a>
            </div>
          </div>
          <div className="p-3">
            <h3 className="font-bold text-sm text-foreground truncate">
              {reel.caption?.split('\n')[0] || 'Valavaara Reel'}
            </h3>
            <p className="text-xs text-foreground-muted mt-0.5 line-clamp-1">
              {reel.caption?.split('\n')[1] || 'From our Instagram'}
            </p>
            <a
              href={reel.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline mt-1 inline-block"
            >
              View on Instagram →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
