import type {
  FactCheck,
  LiveEvent,
  Person,
  PodcastEpisode,
  PodcastShow,
  Story,
  Video,
} from "@/lib/content/types";
import { absoluteUrl } from "@/lib/site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: "GlobHub Media",
    url: absoluteUrl("/"),
    logo: absoluteUrl("/og.png"),
    ethicsPolicy: absoluteUrl("/editorial-policy"),
    correctionsPolicy: absoluteUrl("/corrections"),
    ownershipFundingInfo: absoluteUrl("/ownership"),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GlobHub Media",
    url: absoluteUrl("/"),
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/search")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

function articleType(story: Story) {
  if (story.type === "analysis") return "AnalysisNewsArticle";
  if (story.type === "opinion" || story.type === "editorial")
    return "OpinionNewsArticle";
  if (
    story.type === "feature" ||
    story.type === "investigation" ||
    story.type === "interview"
  )
    return "ReportageNewsArticle";
  return "NewsArticle";
}

export function storyJsonLd(story: Story) {
  const ogImage = story.socialImage || story.hero || story.coverImage;
  const imageUrl = ogImage?.url ? absoluteUrl(ogImage.url) : absoluteUrl("/og.png");

  return {
    "@context": "https://schema.org",
    "@type": articleType(story),
    headline: story.headline,
    description: story.standfirst,
    datePublished: story.publishedAt,
    dateModified: story.updatedAt || story.publishedAt,
    mainEntityOfPage: absoluteUrl(`/story/${story.slug}`),
    image: [imageUrl],
    author: story.authors.map(personJsonLd),
    publisher: organizationJsonLd(),
    articleSection: story.primaryCategory.title,
    keywords: [...story.tags, ...story.topics].join(", "),
    isAccessibleForFree: story.accessStatus !== "subscriber",
  };
}

export function personJsonLd(person: Person) {
  return {
    "@type": "Person",
    name: person.name,
    url: absoluteUrl(`/author/${person.slug}`),
    jobTitle: person.title,
    description: person.shortBio,
  };
}

export function factCheckJsonLd(factCheck: FactCheck) {
  const numericRating: Record<FactCheck["verdict"], number> = {
    true: 5,
    "mostly-true": 4,
    mixed: 3,
    misleading: 2,
    false: 1,
    unproven: 0,
  };

  return {
    "@context": "https://schema.org",
    "@type": "ClaimReview",
    url: absoluteUrl(`/fact-check/${factCheck.slug}`),
    datePublished: factCheck.reviewDate,
    author: organizationJsonLd(),
    itemReviewed: {
      "@type": "Claim",
      appearance: {
        "@type": "CreativeWork",
        author: { "@type": "Person", name: factCheck.claimant },
        datePublished: factCheck.claimDate,
      },
      firstAppearance: factCheck.claimOrigin,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: numericRating[factCheck.verdict],
      bestRating: 5,
      worstRating: 0,
      alternateName: factCheck.verdict,
    },
    claimReviewed: factCheck.claim,
  };
}

export function liveEventJsonLd(event: LiveEvent) {
  return {
    "@context": "https://schema.org",
    "@type": "LiveBlogPosting",
    headline: event.title,
    description: event.summary,
    datePublished: event.startAt,
    dateModified: event.updatedAt,
    coverageStartTime: event.startAt,
    coverageEndTime: event.endAt,
    url: absoluteUrl(`/live/${event.slug}`),
    liveBlogUpdate: event.entries.map((entry) => ({
      "@type": "BlogPosting",
      headline: entry.headline,
      articleBody: entry.body,
      datePublished: entry.timestamp,
      author: personJsonLd(entry.author),
    })),
  };
}

export function videoJsonLd(video: Video) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.summary,
    thumbnailUrl: absoluteUrl(video.poster.url),
    uploadDate: video.publishedAt,
    duration: video.duration,
    contentUrl: video.sourceUrl,
    embedUrl: video.sourceUrl,
  };
}

export function podcastJsonLd(
  show: PodcastShow,
  episodes: PodcastEpisode[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name: show.title,
    description: show.description,
    url: absoluteUrl(`/podcasts/${show.slug}`),
    author: personJsonLd(show.host),
    episode: episodes.map((episode) => ({
      "@type": "PodcastEpisode",
      name: episode.title,
      description: episode.summary,
      datePublished: episode.publishedAt,
      duration: episode.duration,
      associatedMedia: {
        "@type": "MediaObject",
        contentUrl: episode.audioUrl,
      },
      url: absoluteUrl(
        `/podcasts/${show.slug}/${episode.slug}`
      ),
    })),
  };
}
