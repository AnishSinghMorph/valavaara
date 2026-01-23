"use client";

import { Star, Sparkles, Calendar } from "lucide-react";

export function ReleaseMarquee() {
    const announcements = [
        "🎬 VALAVAARA RELEASING ON 30TH JANUARY",
        "⭐ DON'T MISS THE MOST HEARTWARMING MOVIE OF THE YEAR",
        "🎥 VALAVAARA IN CINEMAS - 30TH JANUARY",
        "❤️ A STORY THAT WILL MELT YOUR HEART",
        "🐄 VALAVAARA - RELEASING 30TH JAN",
        "🎞️ BOOK YOUR TICKETS NOW",
    ];

    return (
        <div className="release-marquee-wrapper">
            <div className="release-marquee">
                <div className="release-marquee-content">
                    {/* Duplicate the content multiple times for seamless loop */}
                    {[...Array(3)].map((_, setIndex) => (
                        <div key={setIndex} className="release-marquee-set">
                            {announcements.map((text, i) => (
                                <div key={`${setIndex}-${i}`} className="release-marquee-item">
                                    <Star className="marquee-icon" size={16} fill="currentColor" />
                                    <span className="marquee-text">{text}</span>
                                    <Sparkles className="marquee-icon" size={16} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
