import { Metadata } from "next";
import { TrailerPageClient } from "./TrailerPageClient";

export const metadata: Metadata = {
    title: "Watch Trailer | Valavaara",
    description: "Watch the official trailer of Valavaara - A heartwarming story of a young boy and his beloved pet cow. Rated U - Perfect for the whole family.",
    openGraph: {
        title: "Valavaara - Official Trailer",
        description: "Watch the official trailer! A heartwarming story of friendship that will melt your heart. 🐄❤️",
        url: "https://valavaara.movie/watch/trailer",
        images: [
            {
                url: "/assets/videos/trailer-thumbnail.jpg",
                width: 1200,
                height: 628,
                alt: "Valavaara Trailer",
            },
        ],
    },
};

export default function TrailerPage() {
    return <TrailerPageClient />;
}
