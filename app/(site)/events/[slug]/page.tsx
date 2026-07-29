import type { Metadata } from "next";
import { CalendarDays, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { EditorialImage } from "@/components/editorial/EditorialImage";
import { getEvents } from "@/lib/content/repository";
import { formatDateTime } from "@/lib/site";
import styles from "../../service-pages.module.css";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const events = await getEvents();
  const event = events.find((item) => item.slug === slug);
  return event
    ? {
        title: event.title,
        description: event.summary,
        alternates: { canonical: `/events/${event.slug}` },
      }
    : {};
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const events = await getEvents();
  const event = events.find((item) => item.slug === slug);
  if (!event) notFound();
  return (
    <>
      <header className={styles.eventDetailHeader}>
        <div className="container">
          <span className="eyebrow">GlobHub event</span>
          <h1 className="page-title">{event.title}</h1>
          <p>{event.summary}</p>
          <div>
            <span><CalendarDays size={15} /> {formatDateTime(event.startsAt)}</span>
            <span><MapPin size={15} /> {event.location}</span>
          </div>
        </div>
      </header>
      <section className={`container section ${styles.eventDetailGrid}`}>
        <EditorialImage image={event.image} priority sizes="(max-width: 900px) 100vw, 65vw" />
        <aside>
          <h2>Attend</h2>
          <p>
            Registration is handled by the configured events provider. This
            fictional development record links to a placeholder destination.
          </p>
          {event.registrationUrl ? (
            <a href={event.registrationUrl} className="button">Register</a>
          ) : <span>Registration is not open.</span>}
        </aside>
      </section>
    </>
  );
}
