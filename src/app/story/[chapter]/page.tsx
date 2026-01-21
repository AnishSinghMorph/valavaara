import { Metadata } from "next";
import { notFound } from "next/navigation";
import { storyChapters } from "@/data/content";
import { ChapterPageClient } from "./ChapterPageClient";

interface Props {
    params: Promise<{ chapter: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { chapter } = await params;
    const chapterData = storyChapters.find((c) => c.id === chapter);

    if (!chapterData) {
        return {
            title: "Chapter Not Found | Valavaara",
        };
    }

    return {
        title: `Chapter ${chapterData.number}: ${chapterData.title} | Valavaara`,
        description: chapterData.description,
        openGraph: {
            title: `Valavaara Story - Chapter ${chapterData.number}: ${chapterData.title}`,
            description: chapterData.description,
            url: `https://valavaara.movie/story/${chapter}`,
            images: [
                {
                    url: chapterData.thumbnail,
                    width: 1200,
                    height: 628,
                    alt: `Chapter ${chapterData.number}`,
                },
            ],
        },
    };
}

export async function generateStaticParams() {
    return storyChapters.map((chapter) => ({
        chapter: chapter.id,
    }));
}

export default async function ChapterPage({ params }: Props) {
    const { chapter } = await params;
    const chapterData = storyChapters.find((c) => c.id === chapter);

    if (!chapterData) {
        notFound();
    }

    return <ChapterPageClient chapter={chapterData} />;
}
