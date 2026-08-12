async function main() {
  const query = encodeURIComponent(`*[_type == "story" && slug.current == "doguwa-town-hall-meeting-karo-na-3"][0]`);
  const res = await fetch(`https://qd0sagkj.api.sanity.io/v2026-07-01/data/query/production?query=${query}`);
  const json = await res.json();
  const story = json.result;

  console.log("Doguwa Story Raw Document:\n");
  console.log(JSON.stringify(story, null, 2));
}

main().catch(console.error);
