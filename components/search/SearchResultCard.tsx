import Link from "next/link";
import type { ReactNode } from "react";
import type { Story } from "@/lib/content/types";
import { formatDate } from "@/lib/site";
import styles from "./search.module.css";

function highlight(text: string, query: string): ReactNode {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return parts.map((part, index) =>
    part.toLocaleLowerCase() === query.toLocaleLowerCase() ? (
      <mark key={`${part}-${index}`}>{part}</mark>
    ) : (
      part
    )
  );
}

export function SearchResultCard({
  story,
  query,
}: {
  story: Story;
  query: string;
}) {
  return (
    <article className={styles.resultCard}>
      <p>
        {story.primaryCategory.title} · {story.type.replaceAll("-", " ")}
      </p>
      <h2>
        <Link href={`/story/${story.slug}`}>
          {highlight(story.headline, query)}
        </Link>
      </h2>
      <p>{highlight(story.standfirst, query)}</p>
      <small>
        {formatDate(story.publishedAt)} ·{" "}
        {story.authors.map((author) => author.name).join(", ")}
      </small>
    </article>
  );
}

