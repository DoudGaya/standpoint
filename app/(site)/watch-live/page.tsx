import type { Metadata } from "next";
import { MediaPlayer } from "@/components/media/MediaPlayer";
import { getVideos } from "@/lib/content/repository";
import styles from "../media-pages.module.css";

export const metadata: Metadata = {
  title: "Watch live",
  description: "Watch live coverage and newsroom briefings from GlobHub Media.",
  alternates: { canonical: "/watch-live" },
};

export default async function WatchLivePage() {
  const live = (await getVideos()).find((video) => video.live);
  return (
    <section className={`surface-ink ${styles.liveWatch}`}>
      <div className="container">
        <span className="eyebrow">Live channel</span>
        <h1 className="page-title">GlobHub Live</h1>
        <p>
          Rolling coverage, newsroom interviews and verified explainers. Video
          never autoplays with sound.
        </p>
        {live ? <MediaPlayer media={live} /> : (
          <div className={styles.offAir}>
            <strong>The live desk is off air.</strong>
            <p>Scheduled programming and verified live links will appear here.</p>
          </div>
        )}
      </div>
    </section>
  );
}

