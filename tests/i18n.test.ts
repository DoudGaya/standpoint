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

import { localizeCategory } from "../lib/i18n/categories";
import { formatDate } from "../lib/site";

test("category localization for English and Hausa", () => {
  const worldCat = {
    id: "cat-world",
    title: "World",
    slug: "world",
    description: "Global events, diplomacy and regional affairs.",
    accent: "#006b82",
    order: 1,
  };

  const enWorld = localizeCategory(worldCat, "en");
  const haWorld = localizeCategory(worldCat, "ha");

  assert.equal(enWorld.title, "World");
  assert.equal(haWorld.title, "Duniya");
  assert.equal(haWorld.description, "Abubuwan da ke faruwa a duniya, diflomasiyya da al'amuran yankuna.");
});

test("date formatting accepts locale parameter", () => {
  const sampleDate = new Date("2026-08-16T12:00:00.000Z");
  const enFormatted = formatDate(sampleDate, { day: "numeric", month: "long", year: "numeric" }, "en");
  const haFormatted = formatDate(sampleDate, { day: "numeric", month: "long", year: "numeric" }, "ha");

  assert.ok(enFormatted.includes("August"));
  assert.ok(haFormatted.includes("Agusta") || haFormatted.includes("16"));
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
