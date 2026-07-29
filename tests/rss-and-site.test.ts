import assert from "node:assert/strict";
import test from "node:test";
import { stories } from "../lib/content/seed";
import { createRssFeed } from "../lib/feeds/rss";
import { safeLocalRedirect, slugToTitle } from "../lib/site";

test("RSS output escapes editorial content and includes stable story URLs", () => {
  const feed = createRssFeed({
    title: "GlobHub & World",
    description: "News <with> context",
    path: "/rss.xml",
    stories: [stories[0]],
  });

  assert.match(feed, /GlobHub &amp; World/);
  assert.match(feed, /News &lt;with&gt; context/);
  assert.match(feed, new RegExp(`/story/${stories[0].slug}`));
  assert.doesNotMatch(feed, /<script/i);
});

test("URL helpers keep redirects local and make readable titles", () => {
  assert.equal(safeLocalRedirect("/latest?edition=global"), "/latest?edition=global");
  assert.equal(safeLocalRedirect("//evil.example"), "/");
  assert.equal(safeLocalRedirect("https://evil.example"), "/");
  assert.equal(slugToTitle("climate-science"), "Climate Science");
});
