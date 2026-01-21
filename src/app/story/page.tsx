import { Metadata } from "next";
import { StoryListClient } from "./StoryListClient";

export const metadata: Metadata = {
    title: "Read the Story | Valavaara",
    description: "Experience the story of Valavaara through our interactive webtoon-style chapters. A heartwarming tale for the whole family.",
    openGraph: {
        title: "Valavaara - Read the Story",
        description: "Experience the heartwarming story of Raju and Vallu through interactive chapters. 🐄❤️",
        url: "https://valavaara.movie/story",
    },
};

export default function StoryPage() {
    return <StoryListClient />;
}
