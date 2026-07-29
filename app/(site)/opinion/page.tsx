import type { Metadata } from "next";
import { ListingPage } from "@/components/pages/ListingPage";
import { getAllStories } from "@/lib/content/repository";

export const metadata: Metadata = {
  title: "Opinion",
  description: "Arguments and ideas, clearly labelled, from GlobHub contributors.",
  alternates: { canonical: "/opinion" },
};

export default async function OpinionPage() {
  const stories = (await getAllStories()).filter((story) =>
    ["opinion", "editorial"].includes(story.type)
  );
  return (
    <ListingPage
      eyebrow="Ideas"
      title="Opinion"
      description="Arguments, interpretation and editorial positions are clearly labelled and separated from independent news reporting."
      stories={stories}
      basePath="/opinion"
      accent="#a33d65"
    />
  );
}

