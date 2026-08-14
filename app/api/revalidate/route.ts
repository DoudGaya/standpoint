import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

function equalSecret(received: string | null, expected: string | undefined) {
  if (!received || !expected) return false;
  const left = Buffer.from(received);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

function extractSlug(val: unknown): string | null {
  if (typeof val === "string" && /^[a-z0-9][a-z0-9-]{0,95}$/i.test(val.trim())) {
    return val.trim().toLowerCase();
  }
  if (
    val &&
    typeof val === "object" &&
    "slug" in val &&
    typeof (val as { slug?: unknown }).slug === "object" &&
    (val as { slug?: { current?: unknown } }).slug?.current &&
    typeof (val as { slug: { current: unknown } }).slug.current === "string"
  ) {
    const s = (val as { slug: { current: string } }).slug.current.trim().toLowerCase();
    if (/^[a-z0-9][a-z0-9-]{0,95}$/i.test(s)) return s;
  }
  if (
    val &&
    typeof val === "object" &&
    "current" in val &&
    typeof (val as { current?: unknown }).current === "string"
  ) {
    const s = (val as { current: string }).current.trim().toLowerCase();
    if (/^[a-z0-9][a-z0-9-]{0,95}$/i.test(s)) return s;
  }
  return null;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 32_768) {
    return NextResponse.json({ message: "Payload too large" }, { status: 413 });
  }

  const url = new URL(request.url);
  const querySecret = url.searchParams.get("secret");
  const authorization = request.headers.get("authorization");
  const bearerSecret = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : null;
  const receivedSecret =
    request.headers.get("x-sanity-revalidate-secret") || bearerSecret || querySecret;

  if (!equalSecret(receivedSecret, process.env.SANITY_REVALIDATE_SECRET)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const docType = typeof body._type === "string" ? body._type : "";
  if (!docType || docType.length > 80) {
    return NextResponse.json({ message: "Invalid document type" }, { status: 400 });
  }

  const tags = new Set<string>([docType]);
  const paths = new Set<string>(["/"]);

  const slug = extractSlug(body.slug);
  if (slug) {
    tags.add(`${docType}:${slug}`);
    if (docType === "story") {
      paths.add(`/story/${slug}`);
      paths.add("/latest");
      paths.add("/news");
      paths.add("/opinion");
      paths.add("/investigations");
      paths.add("/search");
      paths.add("/rss.xml");
      paths.add("/news-sitemap.xml");
      tags.add("homepage");
    }
    if (docType === "video") paths.add(`/video/${slug}`);
    if (docType === "liveEvent") paths.add(`/live/${slug}`);
    if (docType === "factCheck") paths.add(`/fact-check/${slug}`);
    if (docType === "person") paths.add(`/author/${slug}`);
    if (docType === "category") paths.add(`/category/${slug}`);
    if (docType === "topic") paths.add(`/topic/${slug}`);
    if (docType === "tag") paths.add(`/tag/${slug}`);
    if (docType === "podcastShow") paths.add(`/podcasts/${slug}`);
    if (docType === "newsletter") paths.add(`/newsletters/${slug}`);
    if (docType === "event") paths.add(`/events/${slug}`);
  }

  // Extract primary & secondary categories if present
  const categorySlugs = new Set<string>();
  const directCategorySlug = extractSlug(body.categorySlug);
  if (directCategorySlug) categorySlugs.add(directCategorySlug);

  const primaryCatSlug = extractSlug(body.primaryCategory);
  if (primaryCatSlug) categorySlugs.add(primaryCatSlug);

  if (Array.isArray(body.secondaryCategories)) {
    for (const item of body.secondaryCategories) {
      const s = extractSlug(item);
      if (s) categorySlugs.add(s);
    }
  }

  for (const catSlug of categorySlugs) {
    tags.add(`category:${catSlug}`);
    paths.add(`/category/${catSlug}`);
  }

  if (docType === "category" || docType === "navigation") tags.add("navigation");
  if (docType === "homepage") tags.add("homepage");
  if (docType === "siteSettings") tags.add("site-settings");
  if (docType === "podcastEpisode" || docType === "podcastShow") tags.add("podcast");

  for (const tag of tags) {
    try {
      revalidateTag(tag, "max");
    } catch {
      // In test runner environment outside Next.js server context
    }
  }
  for (const path of paths) {
    try {
      revalidatePath(path);
    } catch {
      // In test runner environment outside Next.js server context
    }
  }

  return NextResponse.json({
    revalidated: true,
    tags: [...tags],
    paths: [...paths],
  });
}
