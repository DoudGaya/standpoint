import { getPodcastEpisodes, getPodcastShows } from "@/lib/content/repository";
import { createPodcastRssFeed } from "@/lib/feeds/rss";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ showSlug: string }> },
) {
  const { showSlug } = await params;
  const shows = await getPodcastShows();
  const show = shows.find((item) => item.slug === showSlug);

  if (!show) {
    return new Response("Podcast not found", { status: 404 });
  }

  const episodes = await getPodcastEpisodes(showSlug);
  const xml = createPodcastRssFeed({
    show,
    episodes,
    path: `/podcasts/${showSlug}/rss.xml`,
  });

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600",
    },
  });
}
