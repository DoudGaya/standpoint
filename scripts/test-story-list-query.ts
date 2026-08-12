import { config } from "dotenv";
config();

import { createClient } from "next-sanity";
import { STORY_LIST_QUERY } from "../sanity/queries/stories";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "qd0sagkj",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-07-01",
  useCdn: false,
});

async function main() {
  const result = await client.fetch(STORY_LIST_QUERY, { offset: 0, end: 500 });
  console.log("STORY_LIST_QUERY count:", result?.length);
  if (result?.length) {
    console.log("First 3 stories:", result.slice(0, 3).map((s: any) => ({
      headline: s.headline,
      publishedAt: s.publishedAt,
      slug: s.slug
    })));
  }
}

main();
