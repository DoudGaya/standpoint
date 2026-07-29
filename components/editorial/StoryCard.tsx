import Link from "next/link";
import { Camera, CirclePlay, Headphones } from "lucide-react";
import type { Story } from "@/lib/content/types";
import { formatDate } from "@/lib/site";
import { EditorialImage } from "./EditorialImage";
import styles from "./editorial.module.css";

type StoryCardVariant = "standard" | "large" | "compact" | "horizontal" | "opinion";

function StoryTypeIcon({ type }: { type: Story["type"] }) {
  if (type === "video") return <CirclePlay size={14} aria-hidden="true" />;
  if (type === "podcast") return <Headphones size={14} aria-hidden="true" />;
  if (type === "photo-essay") return <Camera size={14} aria-hidden="true" />;
  return null;
}

export function StoryCard({
  story,
  variant = "standard",
  priority = false,
}: {
  story: Story;
  variant?: StoryCardVariant;
  priority?: boolean;
}) {
  if (variant === "compact") {
    return (
      <article className={`${styles.storyCard} ${styles.compactCard}`}>
        <div>
          <span className={styles.kicker}>{story.kicker}</span>
          <h3>
            <Link href={`/story/${story.slug}`}>{story.shortHeadline}</Link>
          </h3>
          <p className={styles.cardMeta}>
            {formatDate(story.publishedAt, { day: "numeric", month: "short" })} ·{" "}
            {story.readingTime} min
          </p>
        </div>
        {story.hero ? (
          <Link href={`/story/${story.slug}`} tabIndex={-1} aria-hidden="true">
            <EditorialImage
              image={story.hero}
              sizes="120px"
              className={styles.compactImage}
            />
          </Link>
        ) : null}
      </article>
    );
  }

  return (
    <article
      className={`${styles.storyCard} ${styles[`storyCard--${variant}`]}`}
      data-story-type={story.type}
    >
      {story.hero && variant !== "opinion" ? (
        <Link
          href={`/story/${story.slug}`}
          className={styles.imageLink}
          tabIndex={-1}
          aria-hidden="true"
        >
          <EditorialImage
            image={story.hero}
            priority={priority}
            sizes={
              variant === "large"
                ? "(max-width: 900px) 100vw, 60vw"
                : variant === "horizontal"
                  ? "(max-width: 700px) 100vw, 280px"
                  : "(max-width: 700px) 100vw, 33vw"
            }
            className={styles.cardImage}
          />
          {StoryTypeIcon({ type: story.type }) ? (
            <span className={styles.mediaIcon}>
              <StoryTypeIcon type={story.type} />
            </span>
          ) : null}
        </Link>
      ) : null}
      <div className={styles.cardBody}>
        <span className={styles.kicker}>
          <StoryTypeIcon type={story.type} />
          {story.kicker}
        </span>
        <h3>
          <Link href={`/story/${story.slug}`}>{story.headline}</Link>
        </h3>
        {variant !== "opinion" ? (
          <p className={styles.cardSummary}>{story.standfirst}</p>
        ) : (
          <p className={styles.opinionByline}>By {story.authors[0]?.name}</p>
        )}
        <p className={styles.cardMeta}>
          {formatDate(story.publishedAt, {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
          {variant !== "opinion" ? ` · ${story.readingTime} min read` : ""}
        </p>
      </div>
    </article>
  );
}

