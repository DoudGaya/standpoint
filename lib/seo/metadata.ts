import type { Metadata } from "next";
import type { Story } from "@/lib/content/types";
import { absoluteUrl } from "@/lib/site";

export function buildStoryMetadata(story: Story): Metadata {
  const canonical = story.canonicalUrl || absoluteUrl(`/story/${story.slug}`);
  const categoryTitle = story.primaryCategory?.title || "News";
  const authors = story.authors || [];
  const tags = story.tags || [];
  const topics = story.topics || [];
  const title = story.seoTitle || story.headline;
  const description = story.seoDescription || story.standfirst;

  const ogImage = story.socialImage || story.hero || story.coverImage;
  const ogImageUrl = ogImage?.url ? absoluteUrl(ogImage.url) : absoluteUrl("/og.png");
  const ogImageAlt = ogImage?.alt || title;

  return {
    title,
    description,
    alternates: { canonical },
    authors: authors.map((author) => ({ name: author.name })),
    openGraph: {
      type: "article",
      siteName: "GlobHub Media",
      title,
      description,
      url: canonical,
      publishedTime: story.publishedAt,
      modifiedTime: story.updatedAt,
      authors: authors.map((author) =>
        absoluteUrl(`/author/${author.slug}`)
      ),
      section: categoryTitle,
      tags: [...tags, ...topics],
      images: [
        {
          url: ogImageUrl,
          width: ogImage?.width || 1200,
          height: ogImage?.height || 630,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}
