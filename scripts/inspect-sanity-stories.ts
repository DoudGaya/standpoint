import { config } from "dotenv";
config();

import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "qd0sagkj",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-07-01",
  useCdn: false,
});

async function main() {
  const allStories = await client.fetch(`*[_type == "story"] {
    _id,
    _createdAt,
    _updatedAt,
    "slug": slug.current,
    publicHeadline,
    internalTitle,
    publishedAt,
    workflow
  }`);
  console.log("Total story documents in Sanity:", allStories.length);
  console.log("Stories in Sanity:", JSON.stringify(allStories, null, 2));

  const filteredStories = await client.fetch(`*[_type == "story" && workflow.status in ["published", "updated", "corrected"]] {
    _id,
    "slug": slug.current,
    publicHeadline
  }`);
  console.log("\nStories matching GROQ workflow status filter:", filteredStories.length);
}

main();
