import type { Metadata } from "next";
import Link from "next/link";
import { Radio } from "lucide-react";
import { EditorialImage } from "@/components/editorial/EditorialImage";
import { getLiveEvents } from "@/lib/content/repository";
import { formatDateTime } from "@/lib/site";
import styles from "./live-page.module.css";

export const metadata: Metadata = {
  title: "Live coverage",
  description: "Verified live reporting and event timelines from GlobHub Media.",
  alternates: { canonical: "/live" },
};

export default async function LivePage() {
  const events = await getLiveEvents();
  return (
    <>
      <header className={styles.liveIndexHeader}>
        <div className="container">
          <span className="eyebrow">Rolling coverage</span>
          <h1 className="page-title">Live</h1>
          <p>Verified updates, pinned context and clear status from major events.</p>
        </div>
      </header>
      <section className={`container section ${styles.liveCards}`}>
        {events.map((event) => (
          <article key={event.id}>
            <Link href={`/live/${event.slug}`} tabIndex={-1} aria-hidden="true">
              <EditorialImage image={event.cover} sizes="(max-width: 700px) 100vw, 50vw" />
            </Link>
            <div>
              <span className={styles.liveStatus}>
                <Radio size={14} /> {event.status}
              </span>
              <h2><Link href={`/live/${event.slug}`}>{event.title}</Link></h2>
              <p>{event.summary}</p>
              <small>Started {formatDateTime(event.startAt)} · Updated {formatDateTime(event.updatedAt)}</small>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

