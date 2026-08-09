import { createClient } from "next-sanity";

const client = createClient({
  projectId: "qd0sagkj",
  dataset: "production",
  apiVersion: "2026-07-01",
  useCdn: false
});

async function main() {
  const data = await client.fetch(`*[_type == "story" && slug.current == "shugaban-najeriya-ya-amince-da-karin-albashin-sojoji-daga-kashi-30-zuwa-80"][0]`);
  console.log(JSON.stringify(data, null, 2));
}

main();
