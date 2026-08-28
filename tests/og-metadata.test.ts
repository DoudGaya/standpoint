import assert from "node:assert/strict";
import test from "node:test";
import { stories } from "../lib/content/seed";
import { storyJsonLd } from "../lib/seo/jsonld";
import { buildStoryMetadata } from "../lib/seo/metadata";
import { absoluteUrl } from "../lib/site";

test("absoluteUrl correctly handles relative and absolute URLs", () => {
  const relative = absoluteUrl("/images/stories/election-queue.jpg");
  assert.ok(relative.startsWith("http"));
  assert.ok(relative.endsWith("/images/stories/election-queue.jpg"));

  const alreadyAbsolute = "https://cdn.sanity.io/images/proj/dataset/abc.jpg";
  assert.equal(absoluteUrl(alreadyAbsolute), alreadyAbsolute);
});

test("buildStoryMetadata produces full Open Graph and Twitter image metadata from Sanity cover/hero image", () => {
  const sampleStory = stories[0];
  const metadata = buildStoryMetadata(sampleStory);

  assert.ok(metadata.openGraph, "openGraph metadata should exist");
  const openGraph = metadata.openGraph as Record<string, any>;
  assert.equal(openGraph.type, "article");
  assert.equal(openGraph.siteName, "GlobHub Media");

  // Check Open Graph images
  const ogImages = openGraph.images as Array<{ url: string; width?: number; height?: number; alt?: string }>;
  assert.ok(Array.isArray(ogImages) && ogImages.length > 0, "openGraph images should be a non-empty array");
  assert.ok(ogImages[0].url.startsWith("http"), "OG image URL must be absolute");
  assert.ok(ogImages[0].width && ogImages[0].width > 0, "OG image must specify width");
  assert.ok(ogImages[0].height && ogImages[0].height > 0, "OG image must specify height");

  // Check Twitter card
  assert.ok(metadata.twitter, "twitter metadata should exist");
  const twitter = metadata.twitter as Record<string, any>;
  assert.equal(twitter.card, "summary_large_image");
  const twitterImages = twitter.images as string[];
  assert.ok(Array.isArray(twitterImages) && twitterImages.length > 0, "twitter images should be a non-empty array");
  assert.ok(twitterImages[0].startsWith("http"), "Twitter image URL must be absolute");
});

test("buildStoryMetadata prioritizes socialImage or coverImage if provided", () => {
  const customStory = {
    ...stories[0],
    socialImage: {
      url: "https://cdn.sanity.io/images/proj/dataset/social-cover.jpg",
      alt: "Custom social preview",
      width: 1200,
      height: 630,
    },
  };
  const metadata = buildStoryMetadata(customStory);
  const openGraph = metadata.openGraph as Record<string, any>;
  const ogImages = openGraph.images as Array<{ url: string; width?: number; height?: number; alt?: string }>;
  assert.equal(ogImages[0].url, "https://cdn.sanity.io/images/proj/dataset/social-cover.jpg");
  assert.equal(ogImages[0].alt, "Custom social preview");
});

test("storyJsonLd produces valid schema.org image array with absolute URL", () => {
  const sampleStory = stories[0];
  const jsonLd = storyJsonLd(sampleStory);

  assert.ok(jsonLd.image, "JSON-LD image must be present");
  assert.ok(Array.isArray(jsonLd.image), "JSON-LD image should be an array");
  assert.ok(jsonLd.image[0].startsWith("http"), "JSON-LD image URL must be absolute");
});
