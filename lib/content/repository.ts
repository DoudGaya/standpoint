import {
  breakingItems,
  categories,
  events,
  factChecks,
  homepageModules,
  liveEvents,
  navigation,
  newsletters,
  people,
  podcastEpisodes,
  podcastShows,
  siteSettings,
  stories,
  videos,
} from "./seed";
import type {
  Category,
  Person,
  SearchFilters,
  SearchResult,
  Story,
} from "./types";
import {
  normalizePage,
  paginate,
  SEARCH_PAGE_SIZE,
  searchLocalStories,
} from "./search";
import { fetchSanity } from "@/sanity/lib/fetch";
import {
  CATEGORIES_QUERY,
  CATEGORY_BY_SLUG_QUERY,
  PEOPLE_QUERY,
  PERSON_BY_SLUG_QUERY,
  SEARCH_STORIES_QUERY,
  STORIES_BY_AUTHOR_QUERY,
  STORIES_BY_CATEGORY_QUERY,
  STORIES_BY_TAG_QUERY,
  STORIES_BY_TOPIC_QUERY,
  STORY_BY_SLUG_QUERY,
  STORY_LIST_QUERY,
  STORY_SLUGS_QUERY,
} from "@/sanity/queries/stories";
import {
  ACTIVE_AD_CAMPAIGN_QUERY,
  BREAKING_NEWS_QUERY,
  FALLBACK_AD_CAMPAIGN_QUERY,
  HOMEPAGE_QUERY,
  NAVIGATION_QUERY,
  PODCAST_SHOWS_QUERY,
  SITE_SETTINGS_QUERY,
  VIDEO_LIST_QUERY,
} from "@/sanity/queries/site";
import type {
  BreakingItem,
  HomepageModule,
  Navigation,
  PodcastShow,
  SiteSettings,
  Video,
} from "./types";

const PAGE_SIZE = SEARCH_PAGE_SIZE;

export async function getSiteSettings(): Promise<SiteSettings> {
  return (
    (await fetchSanity<SiteSettings>(
      SITE_SETTINGS_QUERY,
      { fallbackSiteUrl: siteSettings.siteUrl },
      { tags: ["site-settings"], revalidate: 600 }
    )) || siteSettings
  );
}

export async function getNavigation(): Promise<Navigation> {
  return (
    (await fetchSanity<Navigation>(
      NAVIGATION_QUERY,
      {},
      { tags: ["navigation", "category"], revalidate: 600 }
    )) || navigation
  );
}

export async function getBreakingItems(): Promise<BreakingItem[]> {
  return (
    (await fetchSanity<BreakingItem[]>(
      BREAKING_NEWS_QUERY,
      {},
      { tags: ["breaking-news"], revalidate: 30 }
    )) || breakingItems
  );
}

export async function getHomepageModules(): Promise<HomepageModule[]> {
  return (
    (await fetchSanity<HomepageModule[]>(
      HOMEPAGE_QUERY,
      {},
      { tags: ["homepage", "story"], revalidate: 120 }
    )) || homepageModules
  );
}

export async function getStories(page = 1, pageSize = PAGE_SIZE): Promise<Story[]> {
  const safePage = normalizePage(page);
  const offset = (safePage - 1) * pageSize;
  return (
    (await fetchSanity<Story[]>(
      STORY_LIST_QUERY,
      { offset, end: offset + pageSize },
      { tags: ["story"], revalidate: 120 }
    )) || paginate(stories, safePage, pageSize)
  );
}

export async function getAllStories(): Promise<Story[]> {
  return (
    (await fetchSanity<Story[]>(
      STORY_LIST_QUERY,
      { offset: 0, end: 500 },
      { tags: ["story"], revalidate: 120 }
    )) || stories
  );
}

export async function getStory(slug: string): Promise<Story | null> {
  const cmsStory = await fetchSanity<Story>(
    STORY_BY_SLUG_QUERY,
    { slug },
    { tags: ["story", `story:${slug}`], revalidate: 120 }
  );
  return cmsStory || stories.find((story) => story.slug === slug) || null;
}

export async function getStorySlugs() {
  return (
    (await fetchSanity<Array<{ slug: string; updatedAt: string }>>(
      STORY_SLUGS_QUERY,
      {},
      { tags: ["story"], revalidate: 600 }
    )) ||
    stories.map((story) => ({
      slug: story.slug,
      updatedAt: story.updatedAt || story.publishedAt,
    }))
  );
}

export async function getStoriesByCategory(
  slug: string,
  page = 1
): Promise<Story[]> {
  const offset = (normalizePage(page) - 1) * PAGE_SIZE;
  return (
    (await fetchSanity<Story[]>(
      STORIES_BY_CATEGORY_QUERY,
      { slug, offset, end: offset + PAGE_SIZE },
      { tags: ["story", `category:${slug}`], revalidate: 180 }
    )) ||
    paginate(
      stories.filter(
        (story) =>
          story.primaryCategory.slug === slug ||
          story.secondaryCategories?.some((item) => item.slug === slug)
      ),
      page
    )
  );
}

export async function getStoriesByAuthor(slug: string, page = 1) {
  const offset = (normalizePage(page) - 1) * PAGE_SIZE;
  return (
    (await fetchSanity<Story[]>(
      STORIES_BY_AUTHOR_QUERY,
      { slug, offset, end: offset + PAGE_SIZE },
      { tags: ["story", `person:${slug}`], revalidate: 180 }
    )) ||
    paginate(
      stories.filter((story) =>
        story.authors.some((author) => author.slug === slug)
      ),
      page
    )
  );
}

export async function getStoriesByTopic(slug: string, page = 1) {
  const offset = (normalizePage(page) - 1) * PAGE_SIZE;
  const normalizedSlug = slug.toLowerCase();
  return (
    (await fetchSanity<Story[]>(
      STORIES_BY_TOPIC_QUERY,
      { slug, offset, end: offset + PAGE_SIZE },
      { tags: ["story", `topic:${slug}`], revalidate: 180 }
    )) ||
    paginate(
      stories.filter((story) =>
        story.topics.some((topic) => {
          const t = topic.toLowerCase();
          return (
            t === normalizedSlug ||
            t.replaceAll(" ", "-") === normalizedSlug ||
            t.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") === normalizedSlug
          );
        })
      ),
      page
    )
  );
}

export async function getStoriesByTag(slug: string, page = 1) {
  const offset = (normalizePage(page) - 1) * PAGE_SIZE;
  const normalizedSlug = slug.toLowerCase();
  return (
    (await fetchSanity<Story[]>(
      STORIES_BY_TAG_QUERY,
      { slug, offset, end: offset + PAGE_SIZE },
      { tags: ["story", `tag:${slug}`], revalidate: 180 }
    )) ||
    paginate(
      stories.filter((story) =>
        story.tags.some((tag) => {
          const t = tag.toLowerCase();
          return (
            t === normalizedSlug ||
            t.replaceAll(" ", "-") === normalizedSlug ||
            t.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") === normalizedSlug
          );
        })
      ),
      page
    )
  );
}

export async function getCategory(slug: string): Promise<Category | null> {
  const cmsCategory = await fetchSanity<Category>(
    CATEGORY_BY_SLUG_QUERY,
    { slug },
    { tags: ["category", `category:${slug}`], revalidate: 600 }
  );
  return (
    cmsCategory ||
    categories.find((item) => item.slug === slug) ||
    categories.flatMap((item) => item.children ?? []).find((item) => item.slug === slug) ||
    null
  );
}

export async function getCategories(): Promise<Category[]> {
  return (
    (await fetchSanity<Category[]>(
      CATEGORIES_QUERY,
      {},
      { tags: ["category"], revalidate: 600 }
    )) || categories
  );
}

export async function getPerson(slug: string): Promise<Person | null> {
  return (
    (await fetchSanity<Person>(
      PERSON_BY_SLUG_QUERY,
      { slug },
      { tags: ["person", `person:${slug}`], revalidate: 600 }
    )) ||
    people.find((person) => person.slug === slug && person.publicProfile) ||
    null
  );
}

export async function getPeople(): Promise<Person[]> {
  return (
    (await fetchSanity<Person[]>(
      PEOPLE_QUERY,
      {},
      { tags: ["person"], revalidate: 600 }
    )) || people.filter((person) => person.publicProfile && person.active)
  );
}

export async function searchStories(
  rawQuery: string,
  filters: SearchFilters = {}
): Promise<SearchResult> {
  const query = rawQuery.trim().slice(0, 120);
  const page = normalizePage(filters.page);
  if (query.length < 2) {
    return { items: [], total: 0, page, pageSize: PAGE_SIZE, query };
  }

  const offset = (page - 1) * PAGE_SIZE;
  const match = `${query.replaceAll(/[\[\]{}()*?\\]/g, " ")}*`;
  const cmsItems = await fetchSanity<Story[]>(
    SEARCH_STORIES_QUERY,
    {
      match,
      category: filters.category,
      contentType: filters.type,
      topic: filters.topic,
      from: filters.from,
      to: filters.to,
      sort: filters.sort || "relevance",
      offset,
      end: offset + PAGE_SIZE,
    },
    { tags: ["story", "search"], revalidate: 60 }
  );

  if (cmsItems) {
    return {
      items: cmsItems,
      total: cmsItems.length,
      page,
      pageSize: PAGE_SIZE,
      query,
    };
  }

  return searchLocalStories(stories, query, filters);
}

export async function getVideos(): Promise<Video[]> {
  return (
    (await fetchSanity<Video[]>(
      VIDEO_LIST_QUERY,
      {},
      { tags: ["video"], revalidate: 180 }
    )) || videos
  );
}

export async function getPodcastShows(): Promise<PodcastShow[]> {
  return (
    (await fetchSanity<PodcastShow[]>(
      PODCAST_SHOWS_QUERY,
      {},
      { tags: ["podcast"], revalidate: 300 }
    )) || podcastShows
  );
}

export async function getPodcastEpisodes(showSlug?: string) {
  return showSlug
    ? podcastEpisodes.filter((episode) => episode.showSlug === showSlug)
    : podcastEpisodes;
}

export async function getLiveEvents() {
  return liveEvents;
}

export async function getFactChecks() {
  return factChecks;
}

export async function getNewsletters() {
  return newsletters;
}

export async function getEvents() {
  return events;
}

export type AdCampaignPlacement = {
  _id: string;
  title?: string;
  key?: string;
  location?: string;
  desktopSize?: string;
  mobileSize?: string;
};

export type AdCampaignData = {
  _id: string;
  title: string;
  kind?: string;
  destinationUrl: string;
  trackingParameters?: string;
  desktopCreative?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  mobileCreative?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  advertiser?: {
    name?: string;
    website?: string;
  };
  placements?: AdCampaignPlacement[];
};

export async function getActiveAdCampaign(
  placement: string
): Promise<AdCampaignData | null> {
  const ad = await fetchSanity<AdCampaignData>(
    ACTIVE_AD_CAMPAIGN_QUERY,
    { placement },
    { tags: ["adCampaign", "adPlacement"], revalidate: 60 }
  );

  if (ad) return ad;

  return await fetchSanity<AdCampaignData>(
    FALLBACK_AD_CAMPAIGN_QUERY,
    {},
    { tags: ["adCampaign"], revalidate: 60 }
  );
}

