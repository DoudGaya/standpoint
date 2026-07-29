import type { Metadata } from "next";
import { getStories } from "@/lib/content/repository";
import { ListingPage } from "@/components/pages/ListingPage";

export const metadata: Metadata = {
  title: "News",
  description: "Verified news reporting from GlobHub Media.",
  alternates: { canonical: "/news" },
};

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const page = Math.max(1, Number((await searchParams).page) || 1);
  return (
    <ListingPage
      eyebrow="Verified reporting"
      title="News"
      description="Independent coverage of the decisions, events and people shaping a connected world."
      stories={await getStories(page)}
      page={page}
      basePath="/news"
    />
  );
}

