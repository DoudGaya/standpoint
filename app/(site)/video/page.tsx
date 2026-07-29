import type { Metadata } from "next";
import Link from "next/link";
import { CirclePlay } from "lucide-react";
import { EditorialImage } from "@/components/editorial/EditorialImage";
import { getVideos } from "@/lib/content/repository";
import { formatDate } from "@/lib/site";
import styles from "../media-pages.module.css";

export const metadata: Metadata = {
  title: "Video",
  description: "Documentaries, explainers, interviews and live video from GlobHub Media.",
  alternates: { canonical: "/video" },
};

export default async function VideoPage() {
  const videos = await getVideos();
  const [lead, ...rest] = videos;
  return (
    <>
      <header className={styles.mediaHeader}>
        <div className="container">
          <span className="eyebrow">GlobHub Visual</span>
          <h1 className="page-title">Video</h1>
          <p>Original documentaries, visual investigations, field reports and live briefings.</p>
        </div>
      </header>
      <section className={`container section ${styles.videoListing}`}>
        {lead ? (
          <article className={styles.videoListingLead}>
            <Link href={`/video/${lead.slug}`} className={styles.imageLink}>
              <EditorialImage image={lead.poster} priority sizes="(max-width: 900px) 100vw, 65vw" />
              <span><CirclePlay size={36} /></span>
            </Link>
            <div>
              <p>{lead.series || "GlobHub Video"} · {lead.duration || "Live"}</p>
              <h2><Link href={`/video/${lead.slug}`}>{lead.title}</Link></h2>
              <p>{lead.summary}</p>
            </div>
          </article>
        ) : null}
        <div className={styles.videoCards}>
          {rest.map((video) => (
            <article key={video.id}>
              <Link href={`/video/${video.slug}`} className={styles.imageLink}>
                <EditorialImage image={video.poster} sizes="(max-width: 700px) 100vw, 33vw" />
                <span><CirclePlay size={24} /></span>
              </Link>
              <p>{formatDate(video.publishedAt)} · {video.duration || "Live"}</p>
              <h2><Link href={`/video/${video.slug}`}>{video.title}</Link></h2>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

