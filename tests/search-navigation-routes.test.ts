import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { navigation, stories } from "../lib/content/seed";
import { searchLocalStories } from "../lib/content/search";
import { POST as revalidate } from "../app/api/revalidate/route";

test("development search ranks relevant stories and respects filters", () => {
  const climate = searchLocalStories(stories, "climate", { category: "world" });
  assert.ok(climate.total > 0);
  assert.ok(
    climate.items.every((story) => story.primaryCategory.slug === "world"),
  );

  const shortQuery = searchLocalStories(stories, "x");
  assert.equal(shortQuery.total, 0);
});

test("navigation seed contains unique, hierarchical category destinations", () => {
  const slugs = navigation.categories.map((item) => item.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.ok(navigation.categories.some((item) => item.children?.length));
  assert.ok(navigation.utilityLinks.some((item) => item.href === "/latest"));
});

test("revalidation refuses unauthenticated requests", async () => {
  const response = await revalidate(
    new Request("http://localhost/api/revalidate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ _type: "story", slug: "example" }),
    }),
  );
  assert.equal(response.status, 401);
});

test("revalidation accepts valid requests and extracts story category tags", async () => {
  process.env.SANITY_REVALIDATE_SECRET = "test-secret-123";
  const response = await revalidate(
    new Request("http://localhost/api/revalidate", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-sanity-revalidate-secret": "test-secret-123",
      },
      body: JSON.stringify({
        _type: "story",
        slug: { current: "breaking-news-story" },
        primaryCategory: { slug: { current: "world" } },
        secondaryCategories: [{ slug: { current: "politics" } }],
      }),
    }),
  );
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.revalidated, true);
  assert.ok(data.tags.includes("story"));
  assert.ok(data.tags.includes("story:breaking-news-story"));
  assert.ok(data.tags.includes("category:world"));
  assert.ok(data.tags.includes("category:politics"));
  assert.ok(data.paths.includes("/story/breaking-news-story"));
  assert.ok(data.paths.includes("/category/world"));
  assert.ok(data.paths.includes("/category/politics"));
});

test("critical public, feed and Studio route modules exist", async () => {
  const routes = [
    "app/(site)/page.tsx",
    "app/(site)/story/[slug]/page.tsx",
    "app/(site)/search/page.tsx",
    "app/(site)/category/[slug]/page.tsx",
    "app/(site)/video/[slug]/page.tsx",
    "app/(site)/live/[slug]/page.tsx",
    "app/rss.xml/route.ts",
    "app/sitemap.ts",
    "app/studio/[[...tool]]/page.tsx",
  ];

  await Promise.all(routes.map((route) => access(route)));
  const siteLayout = await readFile("app/(site)/layout.tsx", "utf8");
  assert.match(siteLayout, /getNavigation/);
  assert.match(siteLayout, /SiteHeader/);
});
