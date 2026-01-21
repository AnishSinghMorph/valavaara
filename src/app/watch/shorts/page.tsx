import { Metadata } from "next";
import { ShortsHubClient } from "./ShortsHubClient";

export const metadata: Metadata = {
    title: "Watch Shorts | Valavaara",
    description: "Watch adorable short clips from Valavaara - A heartwarming story of a young boy and his beloved pet cow. Share your favorites!",
    openGraph: {
        title: "Valavaara - Watch Shorts",
        description: "Watch adorable short clips from Valavaara! 🐄❤️ Perfect for sharing with friends and family.",
        url: "https://valavaara.movie/watch/shorts",
        images: [
            {
                url: "/assets/posters/poster-1200x628.jpg",
                width: 1200,
                height: 628,
                alt: "Valavaara Shorts",
            },
        ],
    },
};

export default function ShortsPage() {
    return <ShortsHubClient />;
}
