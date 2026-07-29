import type { Metadata } from "next";
import { ListingPage } from "@/components/pages/ListingPage";
import { getAllStories } from "@/lib/content/repository";

export const metadata: Metadata = {
  title: "Photo stories",
  description: "Photo essays and visual reporting from GlobHub Media.",
  alternates: { canonical: "/photo" },
};

export default async function PhotoPage() {
  const stories = (await getAllStories()).filter((story) =>
    ["photo-essay"].includes(story.type)
  );
  return (
    <ListingPage
      eyebrow="Visual journalism"
      title="Photo stories"
      description="Documentary photography and visual narratives from across the world."
      stories={stories}
      basePath="/photo"
      accent="#72520b"
    />
  );
}
