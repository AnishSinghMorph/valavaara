import { Metadata } from "next";
import { notFound } from "next/navigation";
import { shorts } from "@/data/content";
import { ShortPageClient } from "./ShortPageClient";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const short = shorts.find((s) => s.slug === slug);

    if (!short) {
        return {
            title: "Short Not Found | Valavaara",
        };
    }

    return {
        title: `${short.title} | Valavaara`,
        description: short.description,
        openGraph: {
            title: `${short.title} - Valavaara`,
            description: short.description,
            url: `https://valavaara.movie/watch/shorts/${slug}`,
            images: [
                {
                    url: short.thumbnail,
                    width: 1080,
                    height: 1920,
                    alt: short.title,
                },
            ],
            type: "video.other",
        },
        twitter: {
            card: "summary_large_image",
            title: `${short.title} - Valavaara`,
            description: short.description,
            images: [short.thumbnail],
        },
    };
}

export async function generateStaticParams() {
    return shorts.map((short) => ({
        slug: short.slug,
    }));
}

export default async function ShortPage({ params }: Props) {
    const { slug } = await params;
    const short = shorts.find((s) => s.slug === slug);

    if (!short) {
        notFound();
    }

    return <ShortPageClient short={short} />;
}
