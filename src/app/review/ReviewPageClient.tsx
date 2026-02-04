"use client";

import { useEffect } from "react";
import { instagramReels } from "@/data/reviews";

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

      {/* Instagram Reels Grid */}
      <main className="container mx-auto px-4 py-12">
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
