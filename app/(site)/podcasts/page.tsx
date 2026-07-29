import type { Metadata } from "next";
import Link from "next/link";
import { Headphones } from "lucide-react";
import { EditorialImage } from "@/components/editorial/EditorialImage";
import {
  getPodcastEpisodes,
  getPodcastShows,
} from "@/lib/content/repository";
import styles from "../media-pages.module.css";

export const metadata: Metadata = {
  title: "Podcasts",
  description: "Podcasts and audio reporting from GlobHub Media.",
  alternates: { canonical: "/podcasts" },
};

export default async function PodcastsPage() {
  const [shows, episodes] = await Promise.all([
    getPodcastShows(),
    getPodcastEpisodes(),
  ]);
  return (
    <>
      <header className={styles.audioHeader}>
        <div className="container">
          <span className="eyebrow">Listen</span>
          <h1 className="page-title">Podcasts</h1>
          <p>Reporting you can take with you: context, investigations and conversations.</p>
        </div>
      </header>
      <section className={`container section ${styles.showGrid}`}>
        {shows.map((show) => (
          <article key={show.id}>
            <EditorialImage image={show.cover} sizes="(max-width: 700px) 100vw, 33vw" />
            <span><Headphones size={15} /> {show.frequency}</span>
            <h2><Link href={`/podcasts/${show.slug}`}>{show.title}</Link></h2>
            <p>{show.description}</p>
            <small>{episodes.filter((episode) => episode.showSlug === show.slug).length} episodes</small>
          </article>
        ))}
      </section>
    </>
  );
}

