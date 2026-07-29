import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { BrandMark } from "../components/site/BrandMark";

test("brand mark renders a single accessible home link", () => {
  const html = renderToStaticMarkup(<BrandMark />);

  assert.match(html, /href="\/"/);
  assert.match(html, /aria-label="GlobHub Media home"/);
  assert.match(html, />Glob</);
  assert.match(html, />Hub</);
  assert.match(html, />Media</);
});
