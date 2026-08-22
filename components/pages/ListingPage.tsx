import Link from "next/link";
import type { Story } from "@/lib/content/types";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
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
  locale = DEFAULT_LOCALE,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  stories: Story[];
  page?: number;
  basePath: string;
  accent?: string;
  locale?: Locale;
}) {
  const dict = getDictionary(locale);

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
              <span>{dict.listing.nothingPublished}</span>
              <h2>{dict.listing.deskWorking}</h2>
              <p>{dict.listing.emptyDesc}</p>
              <Link href="/latest" className="button">{dict.listing.browseLatest}</Link>
            </div>
          )}
          {stories.length ? (
            <nav aria-label="Pagination" className={styles.pagination}>
              {page > 1 ? (
                <Link href={`${basePath}?page=${page - 1}`}>{dict.listing.newer}</Link>
              ) : <span />}
              <span>{dict.listing.page} {page}</span>
              {stories.length >= 12 ? (
                <Link href={`${basePath}?page=${page + 1}`}>{dict.listing.older}</Link>
              ) : <span />}
            </nav>
          ) : null}
        </section>
        <aside className={styles.listingRail}>
          <AdSlot placement="category-sidebar" desktopSize="300 × 250" />
          {stories.length > 2 ? (
            <RankedList title={`${dict.listing.popularIn} ${title}`} stories={stories.slice(0, 5)} />
          ) : null}
        </aside>
      </div>
    </>
  );
}

