import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

function equalSecret(received: string | null, expected: string | undefined) {
  if (!received || !expected) return false;
  const left = Buffer.from(received);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 32_768) {
    return NextResponse.json({ message: "Payload too large" }, { status: 413 });
  }
  const authorization = request.headers.get("authorization");
  const bearerSecret = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : null;
  const receivedSecret =
    request.headers.get("x-sanity-revalidate-secret") || bearerSecret;

  if (!equalSecret(receivedSecret, process.env.SANITY_REVALIDATE_SECRET)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let body: {
    _type?: string;
    slug?: string | { current?: string };
    categorySlug?: string;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }
  if (!body._type || body._type.length > 80) {
    return NextResponse.json({ message: "Invalid document type" }, { status: 400 });
  }

  const tags = new Set<string>([body._type]);
  const paths = new Set<string>(["/"]);
  const slug = typeof body.slug === "string" ? body.slug : body.slug?.current;
  if (slug && /^[a-z0-9][a-z0-9-]{0,95}$/.test(slug)) {
    tags.add(`${body._type}:${slug}`);
    if (body._type === "story") paths.add(`/story/${slug}`);
    if (body._type === "video") paths.add(`/video/${slug}`);
    if (body._type === "liveEvent") paths.add(`/live/${slug}`);
    if (body._type === "factCheck") paths.add(`/fact-check/${slug}`);
    if (body._type === "person") paths.add(`/author/${slug}`);
    if (body._type === "category") paths.add(`/category/${slug}`);
    if (body._type === "topic") paths.add(`/topic/${slug}`);
    if (body._type === "tag") paths.add(`/tag/${slug}`);
    if (body._type === "podcastShow") paths.add(`/podcasts/${slug}`);
    if (body._type === "newsletter") paths.add(`/newsletters/${slug}`);
    if (body._type === "event") paths.add(`/events/${slug}`);
  }
  if (
    body.categorySlug &&
    /^[a-z0-9][a-z0-9-]{0,95}$/.test(body.categorySlug)
  ) {
    tags.add(`category:${body.categorySlug}`);
    paths.add(`/category/${body.categorySlug}`);
  }
  if (body._type === "category" || body._type === "navigation") tags.add("navigation");
  if (body._type === "homepage") tags.add("homepage");
  if (body._type === "siteSettings") tags.add("site-settings");
  if (body._type === "podcastEpisode" || body._type === "podcastShow") tags.add("podcast");

  for (const tag of tags) revalidateTag(tag, "max");
  for (const path of paths) revalidatePath(path);

  return NextResponse.json({
    revalidated: true,
    tags: [...tags],
    paths: [...paths],
  });
}
