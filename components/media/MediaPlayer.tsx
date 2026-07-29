import type { Video } from "@/lib/content/types";
import { normalizeEmbedUrl } from "@/lib/media/embed";
import styles from "./media.module.css";

export function MediaPlayer({ media }: { media: Video }) {
  const normalized = normalizeEmbedUrl(media.sourceUrl);

  if (normalized?.canIframe) {
    return (
      <div className={styles.player}>
        <iframe
          src={normalized.embedUrl}
          title={media.accessibilityLabel || media.title}
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  if (media.provider === "external" || media.provider === "hls") {
    return (
      <div className={styles.player}>
        <video
          controls
          preload="metadata"
          poster={media.poster.url}
          aria-label={media.accessibilityLabel || media.title}
        >
          <source
            src={media.sourceUrl}
            type={
              media.provider === "hls"
                ? "application/vnd.apple.mpegurl"
                : "video/mp4"
            }
          />
          Your browser cannot play this video.{" "}
          <a href={media.sourceUrl}>Open the media file.</a>
        </video>
      </div>
    );
  }

  return (
    <div className={styles.unsupported}>
      <strong>Media unavailable</strong>
      <p>
        This provider is not enabled for safe inline playback. Open the original
        source to continue.
      </p>
      <a href={media.sourceUrl} rel="noopener noreferrer">
        Open original media
      </a>
    </div>
  );
}

