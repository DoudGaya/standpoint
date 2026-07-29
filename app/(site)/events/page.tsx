import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { EditorialImage } from "@/components/editorial/EditorialImage";
import { getEvents } from "@/lib/content/repository";
import { formatDateTime } from "@/lib/site";
import styles from "../service-pages.module.css";

export const metadata: Metadata = {
  title: "Events",
  description: "Public forums, briefings and newsroom events from GlobHub Media.",
  alternates: { canonical: "/events" },
};

export default async function EventsPage() {
  const events = await getEvents();
  return (
    <>
      <header className={styles.serviceHeader}>
        <div className="container">
          <span className="eyebrow">Join the conversation</span>
          <h1 className="page-title">Events</h1>
          <p>Public forums, newsroom briefings and conversations grounded in evidence.</p>
        </div>
      </header>
      <section className={`container section ${styles.eventGrid}`}>
        {events.map((event) => (
          <article key={event.id}>
            <EditorialImage image={event.image} sizes="(max-width: 700px) 100vw, 50vw" />
            <div>
              <span><CalendarDays size={14} /> {formatDateTime(event.startsAt)}</span>
              <h2><Link href={`/events/${event.slug}`}>{event.title}</Link></h2>
              <p>{event.summary}</p>
              <small><MapPin size={13} /> {event.location}</small>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

