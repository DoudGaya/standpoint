import Link from "next/link";
import type { Story } from "@/lib/content/types";
import { AdSlot } from "@/components/editorial/AdSlot";
import { RankedList } from "@/components/editorial/RankedList";
import { StoryCard } from "@/components/editorial/StoryCard";
import styles from "./pages.module.css";

export function ListingPage({
  eyebrow,
  title,
  description,
  stories,
  page = 1,
  basePath,
  accent,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  stories: Story[];
  page?: number;
  basePath: string;
  accent?: string;
}) {
  return (
    <>
      <header className={styles.listingHeader} style={{ "--section-accent": accent } as React.CSSProperties}>
        <div className="container">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="page-title">{title}</h1>
          {description ? <p>{description}</p> : null}
        </div>
      </header>
      <div className={`container section ${styles.listingLayout}`}>
        <section aria-label={`${title} stories`} className={styles.storyRiver}>
          {stories.length ? (
            stories.map((story, index) => (
              <StoryCard
                story={story}
                variant={index === 0 ? "large" : "horizontal"}
                priority={index === 0}
                key={story.id}
              />
            ))
          ) : (
            <div className={styles.empty}>
              <span>Nothing published here yet</span>
              <h2>The desk is still working on this section.</h2>
              <p>
                Try the latest page or search across GlobHub Media while editors
                prepare new coverage.
              </p>
              <Link href="/latest" className="button">Browse latest stories</Link>
            </div>
          )}
          {stories.length ? (
            <nav aria-label="Pagination" className={styles.pagination}>
              {page > 1 ? (
                <Link href={`${basePath}?page=${page - 1}`}>← Newer</Link>
              ) : <span />}
              <span>Page {page}</span>
              {stories.length >= 12 ? (
                <Link href={`${basePath}?page=${page + 1}`}>Older →</Link>
              ) : <span />}
            </nav>
          ) : null}
        </section>
        <aside className={styles.listingRail}>
          <AdSlot placement="category-sidebar" desktopSize="300 × 250" />
          {stories.length > 2 ? (
            <RankedList title={`Popular in ${title}`} stories={stories.slice(0, 5)} />
          ) : null}
        </aside>
      </div>
    </>
  );
}

