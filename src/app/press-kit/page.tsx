import { Metadata } from "next";
import { PressKitClient } from "./PressKitClient";

export const metadata: Metadata = {
    title: "Press Kit | Valavaara",
    description: "Download official press materials, posters, stills, and social media templates for Valavaara movie promotion.",
    openGraph: {
        title: "Valavaara - Press & Influencer Kit",
        description: "Download official press materials for Valavaara. Posters, stills, logos, and ready-to-post captions.",
        url: "https://valavaara.movie/press-kit",
    },
};

export default function PressKitPage() {
    return <PressKitClient />;
}
