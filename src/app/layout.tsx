import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { BookingBar } from "@/components/BookingBar";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Valavaara - A Heartwarming Family Movie",
  description: "Experience the most heartwarming movie of the year! Valavaara tells the story of friendship between a young boy and his beloved pet cow. Rated U - Perfect for the whole family.",
  keywords: ["Valavaara", "family movie", "U certified", "kids movie", "pet cow", "heartwarming", "Kannada movie"],
  openGraph: {
    title: "Valavaara - A Heartwarming Family Movie",
    description: "Experience the most heartwarming movie of the year! A story of friendship that will melt your heart. 🐄❤️",
    url: "https://valavaara.movie",
    siteName: "Valavaara",
    images: [
      {
        url: "/assets/posters/poster-1200x628.jpg",
        width: 1200,
        height: 628,
        alt: "Valavaara Movie Poster",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Valavaara - A Heartwarming Family Movie",
    description: "A story of friendship that will melt your heart. 🐄❤️ Now in cinemas!",
    images: ["/assets/posters/poster-1200x628.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${inter.variable} antialiased`}>
        <Header />
        <main className="min-h-screen safe-bottom">
          {children}
        </main>
        <BookingBar />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'} />
        <Analytics />
      </body>
    </html>
  );
}
