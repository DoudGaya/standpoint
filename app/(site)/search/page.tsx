import type { Metadata } from "next";
import {
  getAllStories,
  getCategories,
  searchStories,
} from "@/lib/content/repository";
import type { SearchFilters, StoryType } from "@/lib/content/types";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getCurrentLocale } from "@/lib/i18n/server";
import { RecentSearches } from "@/components/search/RecentSearches";
import { SearchResultCard } from "@/components/search/SearchResultCard";
import styles from "@/components/search/search.module.css";

export const metadata: Metadata = {
  title: "Search",
  description: "Search GlobHub Media stories, authors, categories and topics.",
  robots: { index: false, follow: true },
};

type SearchParams = {
  q?: string;
  category?: string;
  type?: StoryType;
  topic?: string;
  from?: string;
  to?: string;
  sort?: "relevance" | "newest";
  page?: string;
};

const storyTypes: StoryType[] = [
  "news",
  "analysis",
  "opinion",
  "feature",
  "investigation",
  "explainer",
  "interview",
  "press-release",
  "sponsored",
];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);

  const q = (params.q || "").slice(0, 120);
  const filters: SearchFilters = {
    category: params.category,
    type: params.type,
    topic: params.topic,
    from: params.from,
    to: params.to,
    sort: params.sort,
    page: Math.max(1, Number(params.page) || 1),
  };
  const [result, categories, allStories] = await Promise.all([
    searchStories(q, filters),
    getCategories(locale),
    getAllStories(locale),
  ]);

  return (
    <>
      <header className={styles.searchHeader}>
        <div className="container">
          <span className="eyebrow">{dict.header.search}</span>
          <h1 className="page-title">{dict.search.title}</h1>
          <form action="/search" method="get" className={styles.searchForm} role="search">
            <label htmlFor="site-search" style={{ position: "absolute", left: "-9999px" }}>
              {dict.search.placeholder}
            </label>
            <input
              id="site-search"
              name="q"
              type="search"
              defaultValue={q}
              minLength={2}
              maxLength={120}
              placeholder={dict.search.placeholder}
              list="search-suggestions"
              required
            />
            <datalist id="search-suggestions">
              {allStories.slice(0, 12).map((story) => (
                <option value={story.shortHeadline} key={story.id} />
              ))}
            </datalist>
            <button type="submit" className="button button--cyan">{dict.search.searchButton}</button>
          </form>
        </div>
      </header>
      <div className={`container section ${styles.searchLayout}`}>
        <aside>
          <form action="/search" method="get" className={styles.filters}>
            <input type="hidden" name="q" value={q} />
            <h2>{dict.search.filterBy}</h2>
            <label>
              Category
              <select name="category" defaultValue={params.category || ""}>
                <option value="">{dict.search.allCategories}</option>
                {categories.map((category) => (
                  <option value={category.slug} key={category.id}>{category.title}</option>
                ))}
              </select>
            </label>
            <label>
              Content type
              <select name="type" defaultValue={params.type || ""}>
                <option value="">{dict.search.allTypes}</option>
                {storyTypes.map((type) => (
                  <option value={type} key={type}>{type.replaceAll("-", " ")}</option>
                ))}
              </select>
            </label>
            <label>
              From
              <input type="date" name="from" defaultValue={params.from} />
            </label>
            <label>
              To
              <input type="date" name="to" defaultValue={params.to} />
            </label>
            <label>
              Sort
              <select name="sort" defaultValue={params.sort || "relevance"}>
                <option value="relevance">{dict.search.relevance}</option>
                <option value="newest">{dict.search.newest}</option>
              </select>
            </label>
            <button className="button button--outline" type="submit">{dict.search.filterBy}</button>
          </form>
          <RecentSearches currentQuery={q} />
        </aside>
        <section aria-label="Search results">
          {q.length >= 2 ? (
            <>
              <div className={styles.resultsHeader}>
                <h2>{dict.search.resultsCount} “{result.query}”</h2>
                <span>{result.total} {dict.search.resultsCount}</span>
              </div>
              {result.items.length ? (
                <div className={styles.resultList}>
                  {result.items.map((story) => (
                    <SearchResultCard story={story} query={result.query} key={story.id} />
                  ))}
                </div>
              ) : (
                <div className={styles.emptySearch}>
                  <h2>{dict.search.noResultsTitle}</h2>
                  <p>{dict.search.noResultsDesc}</p>
                </div>
              )}
            </>
          ) : (
            <div className={styles.emptySearch}>
              <h2>{dict.search.title}</h2>
              <p>{dict.search.description}</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
