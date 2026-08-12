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
  const hp = await client.fetch(`*[_type == "homepage"][0]`);
  console.log("Sanity homepage doc:", JSON.stringify(hp, null, 2));

  const breaking = await client.fetch(`*[_type == "breakingNews"]`);
  console.log("Sanity breakingNews docs:", JSON.stringify(breaking, null, 2));
}

main();
