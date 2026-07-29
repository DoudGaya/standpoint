import type { Metadata } from "next";
import { ListingPage } from "@/components/pages/ListingPage";
import { getStoriesByTopic } from "@/lib/content/repository";
import { slugToTitle } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = slugToTitle(slug);
  return {
    title: `${title} — Topic`,
    description: `GlobHub Media reporting and analysis about ${title}.`,
    alternates: { canonical: `/topic/${slug}` },
  };
}

export default async function TopicPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const page = Math.max(1, Number((await searchParams).page) || 1);
  return (
    <ListingPage
      eyebrow="Topic"
      title={slugToTitle(slug)}
      description="Ongoing reporting, explainers and analysis gathered around this major subject."
      stories={await getStoriesByTopic(slug, page)}
      page={page}
      basePath={`/topic/${slug}`}
      accent="#006b82"
    />
  );
}

