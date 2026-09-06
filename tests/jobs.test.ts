import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";
import { isValidGoogleFormUrl } from "../lib/content/jobs";

test("isValidGoogleFormUrl validates Google Form URLs correctly", () => {
  assert.equal(
    isValidGoogleFormUrl("https://forms.google.com/d/e/1FAIpQLSc_EXAMPLE/viewform"),
    true
  );
  assert.equal(
    isValidGoogleFormUrl("https://docs.google.com/forms/d/e/1FAIpQLSc_EXAMPLE/viewform"),
    true
  );
  assert.equal(
    isValidGoogleFormUrl("https://forms.gle/abcdef123"),
    true
  );
  assert.equal(isValidGoogleFormUrl("https://example.com"), false);
  assert.equal(isValidGoogleFormUrl("not-a-url"), false);
  assert.equal(isValidGoogleFormUrl(""), false);
});

test("jobs listing, detail routes, and Sanity schema files exist", async () => {
  await access("app/(site)/jobs/page.tsx");
  await access("app/(site)/jobs/[slug]/page.tsx");
  await access("app/(site)/careers/page.tsx");
  await access("app/(site)/careers/[slug]/page.tsx");
  await access("sanity/schemaTypes/documents/jobListing.ts");
  await access("sanity/queries/jobs.ts");
});
