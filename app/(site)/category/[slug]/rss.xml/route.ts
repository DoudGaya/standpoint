import { getCategory, getStoriesByCategory } from "@/lib/content/repository";
import { createRssFeed } from "@/lib/feeds/rss";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const [category, stories] = await Promise.all([
    getCategory(slug),
    getStoriesByCategory(slug, 1),
  ]);
  if (!category) return new Response("Not found", { status: 404 });
  return new Response(
    createRssFeed({
      title: `${category.title} | GlobHub Media`,
      description: category.description,
      path: `/category/${slug}/rss.xml`,
      stories,
    }),
    {
      headers: {
        "content-type": "application/rss+xml; charset=utf-8",
        "cache-control": "public, max-age=300, s-maxage=600",
      },
    }
  );
}

