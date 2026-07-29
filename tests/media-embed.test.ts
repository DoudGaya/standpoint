import assert from "node:assert/strict";
import test from "node:test";
import {
  isAllowedExternalMediaUrl,
  normalizeEmbedUrl,
} from "../lib/media/embed";

test("normalizes YouTube embeds onto the privacy-enhanced host", () => {
  const embed = normalizeEmbedUrl(
    "https://www.youtube.com/watch?v=abCDef12_34",
  );

  assert.equal(embed?.provider, "youtube");
  assert.equal(
    embed?.embedUrl,
    "https://www.youtube-nocookie.com/embed/abCDef12_34",
  );
  assert.equal(embed?.privacyEnhanced, true);
});

test("rejects unsafe protocols and unapproved iframe hosts", () => {
  assert.equal(normalizeEmbedUrl("http://youtube.com/watch?v=abCDef12_34"), null);
  assert.equal(normalizeEmbedUrl("https://example.test/embed/123"), null);
  assert.equal(isAllowedExternalMediaUrl("javascript:alert(1)"), false);
  assert.equal(isAllowedExternalMediaUrl("https://user:secret@example.com/a"), false);
});
