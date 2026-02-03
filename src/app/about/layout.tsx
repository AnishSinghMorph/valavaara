import type { Metadata } from "next";
import { Space_Grotesk, Sora, Playfair_Display } from "next/font/google";
import "./pitch.css";

// Premium display font for headings - modern, bold, geometric
const spaceGrotesk = Space_Grotesk({
    variable: "--font-display",
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600", "700"],
});

// Elegant body font - clean, readable, modern
const sora = Sora({
    variable: "--font-body",
    subsets: ["latin"],
    display: "swap",
    weight: ["300", "400", "500", "600", "700"],
});

// Elegant serif for special accents
const playfair = Playfair_Display({
    variable: "--font-serif",
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "About Valavaara | Morph Productions",
    description: "Learn about Valavaara - a heartwarming coming-of-age drama set in Sakleshpur, Karnataka. Produced by Morph Productions.",
};

// This is a nested layout for /pitch route
// It wraps children in a pitch-specific container
export default function PitchLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div
            className={`pitch-dark pitch-body ${spaceGrotesk.variable} ${sora.variable} ${playfair.variable}`}
            style={{ minHeight: "100vh", background: "transparent" }}
        >
            {children}
        </div>
    );
}
