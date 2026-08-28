import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPodcastEpisodes,
  getPodcastShows,
} from "@/lib/content/repository";
import { absoluteUrl, formatDate } from "@/lib/site";
import styles from "../../../media-pages.module.css";

type Props = {
  params: Promise<{ showSlug: string; episodeSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { showSlug, episodeSlug } = await params;
  const [show, episodes] = await Promise.all([
    getPodcastShows().then((items) => items.find((item) => item.slug === showSlug)),
    getPodcastEpisodes(showSlug),
  ]);
  const episode = episodes.find((item) => item.slug === episodeSlug);
  if (!episode) return {};
  const ogImageUrl = show?.cover?.url ? absoluteUrl(show.cover.url) : absoluteUrl("/og.png");
  return {
    title: episode.title,
    description: episode.summary,
    alternates: { canonical: `/podcasts/${showSlug}/${episodeSlug}` },
    openGraph: {
      type: "article",
      siteName: "GlobHub Media",
      title: episode.title,
      description: episode.summary,
      images: [
        {
          url: ogImageUrl,
          width: show?.cover?.width || 1200,
          height: show?.cover?.height || 1200,
          alt: show?.cover?.alt || episode.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: episode.title,
      description: episode.summary,
      images: [ogImageUrl],
    },
  };
}

export default async function EpisodePage({ params }: Props) {
  const { showSlug, episodeSlug } = await params;
  const [show, episodes] = await Promise.all([
    getPodcastShows().then((items) => items.find((item) => item.slug === showSlug)),
    getPodcastEpisodes(showSlug),
  ]);
  const episode = episodes.find((item) => item.slug === episodeSlug);
  if (!show || !episode) notFound();
  return (
    <article className={`container section ${styles.episodeDetail}`}>
      <span className="eyebrow">{show.title}</span>
      <h1 className="page-title">{episode.title}</h1>
      <p>{episode.summary}</p>
      <small>{formatDate(episode.publishedAt)} · {episode.duration}</small>
      <audio controls preload="metadata" aria-label={`Listen to ${episode.title}`}>
        <source src={episode.audioUrl} type="audio/mpeg" />
        Your browser cannot play this episode. <a href={episode.audioUrl}>Open the audio file.</a>
      </audio>
      <section>
        <h2>Transcript</h2>
        <p>{episode.transcript || "A reviewed transcript will be added before production publication."}</p>
      </section>
      <Link href={`/podcasts/${show.slug}`} className="link">← All {show.title} episodes</Link>
    </article>
  );
}

