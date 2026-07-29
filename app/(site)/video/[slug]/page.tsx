import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MediaPlayer } from "@/components/media/MediaPlayer";
import { Transcript } from "@/components/media/Transcript";
import { getVideos } from "@/lib/content/repository";
import { videoJsonLd } from "@/lib/seo/jsonld";
import { formatDateTime } from "@/lib/site";
import styles from "../../media-pages.module.css";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getVideos()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const videos = await getVideos();
  const video = videos.find((item) => item.slug === slug);
  if (!video) return {};
  return {
    title: video.title,
    description: video.summary,
    alternates: { canonical: `/video/${video.slug}` },
    openGraph: {
      type: "video.other",
      title: video.title,
      description: video.summary,
      images: [{ url: video.poster.url, alt: video.poster.alt }],
    },
  };
}

export default async function VideoDetailPage({ params }: Props) {
  const { slug } = await params;
  const video = (await getVideos()).find((item) => item.slug === slug);
  if (!video) notFound();
  return (
    <article className={styles.mediaDetail}>
      <header className="container">
        <span className="eyebrow">{video.live ? "Live" : video.series || "Video"}</span>
        <h1 className="page-title">{video.title}</h1>
        <p>{video.summary}</p>
        <small>
          {formatDateTime(video.publishedAt)}
          {video.duration ? ` · ${video.duration}` : ""}
        </small>
      </header>
      <div className={`container ${styles.playerWrap}`}>
        <MediaPlayer media={video} />
      </div>
      <div className={`reading-container section-tight ${styles.mediaDetailsBody}`}>
        {video.transcript?.length ? <Transcript items={video.transcript} /> : (
          <p className={styles.transcriptNotice}>
            A reviewed transcript has not been supplied for this item. Production
            publishing policy requires one before final release.
          </p>
        )}
        <Link href="/video" className="link">← Back to all video</Link>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoJsonLd(video)).replace(/</g, "\\u003c"),
        }}
      />
    </article>
  );
}
