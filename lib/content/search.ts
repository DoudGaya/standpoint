import type {
  SearchFilters,
  SearchResult,
  Story,
} from "./types";

export const SEARCH_PAGE_SIZE = 12;

export function normalizePage(page?: number) {
  return Number.isFinite(page) && (page ?? 0) > 0
    ? Math.floor(page as number)
    : 1;
}

export function paginate<T>(
  items: T[],
  page = 1,
  pageSize = SEARCH_PAGE_SIZE,
) {
  const safePage = normalizePage(page);
  const start = (safePage - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

function scoreStory(story: Story, term: string) {
  const normalized = term.toLocaleLowerCase();
  const headline = story.headline.toLocaleLowerCase();
  const summary = story.standfirst.toLocaleLowerCase();
  const author = story.authors.some((person) =>
    person.name.toLocaleLowerCase().includes(normalized),
  );
  const keyword = [
    ...story.tags,
    ...story.topics,
    ...(story.searchKeywords ?? []),
  ]
    .join(" ")
    .toLocaleLowerCase()
    .includes(normalized);

  return (
    (headline.includes(normalized) ? 8 : 0) +
    (summary.includes(normalized) ? 4 : 0) +
    (author ? 2 : 0) +
    (keyword ? 1 : 0)
  );
}

export function searchLocalStories(
  allStories: Story[],
  rawQuery: string,
  filters: SearchFilters = {},
): SearchResult {
  const query = rawQuery.trim().slice(0, 120);
  const page = normalizePage(filters.page);
  if (query.length < 2) {
    return {
      items: [],
      total: 0,
      page,
      pageSize: SEARCH_PAGE_SIZE,
      query,
    };
  }

  const filtered = allStories
    .map((story) => ({ story, score: scoreStory(story, query) }))
    .filter(({ story, score }) => {
      if (score === 0) return false;
      if (filters.category && story.primaryCategory.slug !== filters.category)
        return false;
      if (filters.type && story.type !== filters.type) return false;
      if (
        filters.topic &&
        !story.topics.some(
          (topic) =>
            topic.toLocaleLowerCase().replaceAll(" ", "-") === filters.topic,
        )
      )
        return false;
      if (filters.from && story.publishedAt < filters.from) return false;
      if (filters.to && story.publishedAt > filters.to) return false;
      return true;
    })
    .sort((a, b) =>
      filters.sort === "newest"
        ? b.story.publishedAt.localeCompare(a.story.publishedAt)
        : b.score - a.score ||
          b.story.publishedAt.localeCompare(a.story.publishedAt),
    )
    .map(({ story }) => story);

  return {
    items: paginate(filtered, page),
    total: filtered.length,
    page,
    pageSize: SEARCH_PAGE_SIZE,
    query,
  };
}
