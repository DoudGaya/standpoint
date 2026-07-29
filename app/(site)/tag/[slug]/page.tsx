import type { Metadata } from "next";
import { ListingPage } from "@/components/pages/ListingPage";
import { getStoriesByTag } from "@/lib/content/repository";
import { slugToTitle } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slugToTitle(slug)} — Tag`,
    description: `Stories tagged ${slugToTitle(slug)} on GlobHub Media.`,
    alternates: { canonical: `/tag/${slug}` },
  };
}

export default async function TagPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const page = Math.max(1, Number((await searchParams).page) || 1);
  return (
    <ListingPage
      eyebrow="Tag"
      title={slugToTitle(slug)}
      stories={await getStoriesByTag(slug, page)}
      page={page}
      basePath={`/tag/${slug}`}
    />
  );
}

