import assert from "node:assert/strict";
import test from "node:test";
import { getDictionary } from "../lib/i18n/get-dictionary";
import { sanitizeLocale, DEFAULT_LOCALE } from "../lib/i18n/config";
import { stories } from "../lib/content/seed";

test("i18n configuration and dictionary loading", () => {
  assert.equal(sanitizeLocale("en"), "en");
  assert.equal(sanitizeLocale("ha"), "ha");
  assert.equal(sanitizeLocale("invalid" as unknown as string), DEFAULT_LOCALE);

  const enDict = getDictionary("en");
  const haDict = getDictionary("ha");

  assert.equal(enDict.header.watchLive, "Watch live");
  assert.equal(haDict.header.watchLive, "Kalla kai tsaye");

  assert.equal(enDict.home.latest, "Latest");
  assert.equal(haDict.home.latest, "Sabuwar Mafi Kani");
});

test("story filtering by language locale in seed content", () => {
  const enStories = stories.filter((s) => s.language === "en");
  const haStories = stories.filter((s) => s.language === "ha");

  assert.ok(enStories.length > 0);
  assert.ok(haStories.length > 0);

  assert.ok(enStories.every((story) => story.language === "en"));
  assert.ok(haStories.every((story) => story.language === "ha"));

  const haStory = haStories.find(
    (story) => story.slug === "coastal-cities-climate-resilience-pact-ha"
  );
  assert.ok(haStory);
  assert.equal(haStory?.language, "ha");
  assert.ok(haStory?.relatedStorySlugs?.includes("coastal-cities-climate-resilience-pact"));
});
