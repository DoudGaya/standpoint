import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialImage } from "@/components/editorial/EditorialImage";
import {
  getPodcastEpisodes,
  getPodcastShows,
} from "@/lib/content/repository";
import { podcastJsonLd } from "@/lib/seo/jsonld";
import { absoluteUrl, formatDate } from "@/lib/site";
import styles from "../../media-pages.module.css";

type Props = { params: Promise<{ showSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { showSlug } = await params;
  const shows = await getPodcastShows();
  const show = shows.find((item) => item.slug === showSlug);
  if (!show) return {};
  const ogImageUrl = show.cover?.url ? absoluteUrl(show.cover.url) : absoluteUrl("/og.png");
  return {
    title: show.title,
    description: show.description,
    alternates: { canonical: `/podcasts/${show.slug}` },
    openGraph: {
      type: "website",
      siteName: "GlobHub Media",
      title: show.title,
      description: show.description,
      images: [
        {
          url: ogImageUrl,
          width: show.cover?.width || 1200,
          height: show.cover?.height || 1200,
          alt: show.cover?.alt || show.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: show.title,
      description: show.description,
      images: [ogImageUrl],
    },
  };
}

export default async function PodcastShowPage({ params }: Props) {
  const { showSlug } = await params;
  const show = (await getPodcastShows()).find((item) => item.slug === showSlug);
  if (!show) notFound();
  const episodes = await getPodcastEpisodes(showSlug);
  return (
    <>
      <header className={styles.showHeader}>
        <div className={`container ${styles.showHeaderGrid}`}>
          <EditorialImage image={show.cover} priority sizes="340px" />
          <div>
            <span className="eyebrow">Podcast</span>
            <h1 className="page-title">{show.title}</h1>
            <p>{show.description}</p>
            <small>Hosted by <Link href={`/author/${show.host.slug}`}>{show.host.name}</Link> · {show.frequency}</small>
          </div>
        </div>
      </header>
      <section className={`reading-container section ${styles.episodeList}`}>
        <div className="rule-heading"><h2 className="section-title">Episodes</h2></div>
        {episodes.map((episode) => (
          <article key={episode.id}>
            <span>{formatDate(episode.publishedAt)} · {episode.duration}</span>
            <h2>
              <Link href={`/podcasts/${show.slug}/${episode.slug}`}>{episode.title}</Link>
            </h2>
            <p>{episode.summary}</p>
          </article>
        ))}
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(podcastJsonLd(show, episodes)).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
