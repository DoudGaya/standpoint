import { getAllStories } from "@/lib/content/repository";
import { absoluteUrl } from "@/lib/site";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function GET() {
  const stories = (await getAllStories()).slice(0, 1000);
  const urls = stories
    .map(
      (story) => `<url>
  <loc>${escapeXml(absoluteUrl(`/story/${story.slug}`))}</loc>
  <news:news>
    <news:publication>
      <news:name>GlobHub Media</news:name>
      <news:language>${escapeXml(story.language || "en")}</news:language>
    </news:publication>
    <news:publication_date>${new Date(story.publishedAt).toISOString()}</news:publication_date>
    <news:title>${escapeXml(story.headline)}</news:title>
  </news:news>
</url>`
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`;
  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=300, s-maxage=600",
    },
  });
}

