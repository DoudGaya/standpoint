import { getAllStories } from "@/lib/content/repository";
import { createRssFeed } from "@/lib/feeds/rss";

export async function GET() {
  const feed = createRssFeed({
    title: "GlobHub Media",
    description: "Verified global news, analysis and investigations.",
    path: "/rss.xml",
    stories: await getAllStories(),
  });
  return new Response(feed, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=300, s-maxage=600",
    },
  });
}

