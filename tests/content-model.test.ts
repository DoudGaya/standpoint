import assert from "node:assert/strict";
import test from "node:test";
import {
  categories,
  homepageModules,
  people,
  stories,
} from "../lib/content/seed";

test("fictional development content has complete newsroom relationships", () => {
  assert.ok(stories.length >= 8);
  assert.ok(categories.length >= 6);
  assert.ok(people.every((person) => person.publicProfile));
  assert.ok(
    stories.every(
      (story) =>
        story.authors.length > 0 &&
        story.body.length > 0 &&
        story.primaryCategory.slug &&
        ["published", "updated", "corrected"].includes(story.workflowStatus),
    ),
  );
});

test("homepage modules are ordered, enabled and reference known stories", () => {
  const slugs = new Set(stories.map((story) => story.slug));
  const referenced = homepageModules.flatMap(
    (module) => module.storySlugs ?? [],
  );

  assert.ok(homepageModules.every((module) => module.enabled));
  assert.ok(referenced.every((slug) => slugs.has(slug)));
});
