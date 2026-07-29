import type { Metadata } from "next";
import { ListingPage } from "@/components/pages/ListingPage";
import { getAllStories } from "@/lib/content/repository";

export const metadata: Metadata = {
  title: "Investigations",
  description: "Accountability and investigative reporting from GlobHub Media.",
  alternates: { canonical: "/investigations" },
};

export default async function InvestigationsPage() {
  const stories = (await getAllStories()).filter((story) =>
    ["investigation", "feature", "data-story"].includes(story.type)
  );
  return (
    <ListingPage
      eyebrow="Accountability"
      title="Investigations"
      description="Original reporting that follows records, money, systems and public consequences."
      stories={stories}
      basePath="/investigations"
      accent="#9d173a"
    />
  );
}

