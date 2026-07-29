import Link from "next/link";
import type { Story } from "@/lib/content/types";
import styles from "./editorial.module.css";

export function RankedList({
  stories,
  title = "Most read",
}: {
  stories: Story[];
  title?: string;
}) {
  return (
    <section className={styles.ranked} aria-labelledby="ranked-title">
      <div className="rule-heading">
        <h2 className="section-title" id="ranked-title">
          {title}
        </h2>
      </div>
      <ol>
        {stories.map((story, index) => (
          <li key={story.id}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <Link href={`/story/${story.slug}`}>{story.shortHeadline}</Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

