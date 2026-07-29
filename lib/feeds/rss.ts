import type {
  PodcastEpisode,
  PodcastShow,
  Story,
} from "@/lib/content/types";
import { absoluteUrl } from "@/lib/site";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function createRssFeed({
  title,
  description,
  path,
  stories,
}: {
  title: string;
  description: string;
  path: string;
  stories: Story[];
}) {
  const self = absoluteUrl(path);
  const items = stories
    .slice(0, 50)
    .map(
      (story) => `<item>
  <title>${escapeXml(story.headline)}</title>
  <link>${escapeXml(absoluteUrl(`/story/${story.slug}`))}</link>
  <guid isPermaLink="true">${escapeXml(absoluteUrl(`/story/${story.slug}`))}</guid>
  <description>${escapeXml(story.standfirst)}</description>
  <pubDate>${new Date(story.publishedAt).toUTCString()}</pubDate>
  <category>${escapeXml(story.primaryCategory.title)}</category>
  ${story.authors.map((author) => `<dc:creator>${escapeXml(author.name)}</dc:creator>`).join("\n  ")}
</item>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
<channel>
  <title>${escapeXml(title)}</title>
  <link>${escapeXml(absoluteUrl("/"))}</link>
  <description>${escapeXml(description)}</description>
  <language>en</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${escapeXml(self)}" rel="self" type="application/rss+xml" />
  ${items}
</channel>
</rss>`;
}

export function createPodcastRssFeed({
  show,
  episodes,
  path,
}: {
  show: PodcastShow;
  episodes: PodcastEpisode[];
  path: string;
}) {
  const items = episodes
    .slice(0, 100)
    .map(
      (episode) => `<item>
  <title>${escapeXml(episode.title)}</title>
  <link>${escapeXml(absoluteUrl(`/podcasts/${show.slug}/${episode.slug}`))}</link>
  <guid isPermaLink="true">${escapeXml(absoluteUrl(`/podcasts/${show.slug}/${episode.slug}`))}</guid>
  <description>${escapeXml(episode.summary)}</description>
  <pubDate>${new Date(episode.publishedAt).toUTCString()}</pubDate>
  <enclosure url="${escapeXml(episode.audioUrl)}" type="audio/mpeg" />
  <itunes:duration>${escapeXml(episode.duration)}</itunes:duration>
</item>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
<channel>
  <title>${escapeXml(show.title)}</title>
  <link>${escapeXml(absoluteUrl(`/podcasts/${show.slug}`))}</link>
  <description>${escapeXml(show.description)}</description>
  <language>en</language>
  <atom:link href="${escapeXml(absoluteUrl(path))}" rel="self" type="application/rss+xml" />
  <itunes:author>${escapeXml(show.host.name)}</itunes:author>
  <itunes:summary>${escapeXml(show.description)}</itunes:summary>
  ${items}
</channel>
</rss>`;
}
