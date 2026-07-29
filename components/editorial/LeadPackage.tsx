import type { Story } from "@/lib/content/types";
import { StoryCard } from "./StoryCard";
import styles from "./editorial.module.css";

export function LeadPackage({ stories }: { stories: Story[] }) {
  const [lead, ...secondary] = stories;
  if (!lead) return null;

  return (
    <section className={`container ${styles.leadPackage}`} aria-label="Top stories">
      <div className={styles.leadMain}>
        <StoryCard story={lead} variant="large" priority />
      </div>
      <div className={styles.leadSecondary}>
        {secondary.slice(0, 3).map((story, index) => (
          <StoryCard
            key={story.id}
            story={story}
            variant={index === 0 ? "standard" : "compact"}
          />
        ))}
      </div>
    </section>
  );
}

