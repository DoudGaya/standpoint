import type { Metadata } from "next";
import { getStories } from "@/lib/content/repository";
import { ListingPage } from "@/components/pages/ListingPage";

export const metadata: Metadata = {
  title: "Latest news",
  description: "The newest verified reporting and updates from GlobHub Media.",
  alternates: { canonical: "/latest" },
};

export default async function LatestPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const page = Math.max(1, Number((await searchParams).page) || 1);
  const stories = await getStories(page);
  return (
    <ListingPage
      eyebrow="The news desk"
      title="Latest"
      description="New reporting, updates and analysis from GlobHub desks around the world."
      stories={stories}
      page={page}
      basePath="/latest"
    />
  );
}

