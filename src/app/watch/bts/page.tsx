import { Metadata } from "next";
import { BTSPageClient } from "./BTSPageClient";

export const metadata: Metadata = {
    title: "Behind The Scenes | Valavaara",
    description: "Go behind the scenes of Valavaara! Watch exclusive BTS footage of the making of this heartwarming family movie.",
    openGraph: {
        title: "Valavaara - Behind The Scenes",
        description: "Go behind the scenes of Valavaara! 🎬 Exclusive making-of footage.",
        url: "https://valavaara.movie/watch/bts",
    },
};

export default function BTSPage() {
    return <BTSPageClient />;
}
