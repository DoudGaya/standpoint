import type { Metadata } from "next";
import { Radio } from "lucide-react";
import { notFound } from "next/navigation";
import { LiveTimeline } from "@/components/live/LiveTimeline";
import { EditorialImage } from "@/components/editorial/EditorialImage";
import { getLiveEvents } from "@/lib/content/repository";
import { liveEventJsonLd } from "@/lib/seo/jsonld";
import { absoluteUrl, formatDateTime } from "@/lib/site";
import styles from "../live-page.module.css";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const events = await getLiveEvents();
  const event = events.find((item) => item.slug === slug);
  if (!event) return {};
  const ogImageUrl = event.cover?.url ? absoluteUrl(event.cover.url) : absoluteUrl("/og.png");
  return {
    title: event.title,
    description: event.summary,
    alternates: { canonical: `/live/${event.slug}` },
    openGraph: {
      type: "article",
      siteName: "GlobHub Media",
      title: event.title,
      description: event.summary,
      images: [
        {
          url: ogImageUrl,
          width: event.cover?.width || 1200,
          height: event.cover?.height || 630,
          alt: event.cover?.alt || event.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: event.summary,
      images: [ogImageUrl],
    },
  };
}

export default async function LiveDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = (await getLiveEvents()).find((item) => item.slug === slug);
  if (!event) notFound();
  return (
    <article>
      <header className={styles.liveDetailHeader}>
        <div className="container">
          <span className={styles.liveStatus}>
            <Radio size={14} /> {event.status}
          </span>
          <h1 className="page-title">{event.title}</h1>
          <p>{event.summary}</p>
          <small>
            Started {formatDateTime(event.startAt)} · Last updated{" "}
            {formatDateTime(event.updatedAt)}
          </small>
        </div>
      </header>
      <figure className={`container ${styles.liveHero}`}>
        <EditorialImage image={event.cover} priority sizes="(max-width: 1300px) 100vw, 1240px" />
      </figure>
      <div className={`container section ${styles.liveDetailGrid}`}>
        <main>
          <LiveTimeline entries={event.entries} status={event.status} />
        </main>
        <aside>
          <h2>Key points</h2>
          <ol>
            {event.keyPoints.map((point, index) => (
              <li key={point}><span>{String(index + 1).padStart(2, "0")}</span>{point}</li>
            ))}
          </ol>
        </aside>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(liveEventJsonLd(event)).replace(/</g, "\\u003c"),
        }}
      />
    </article>
  );
}
