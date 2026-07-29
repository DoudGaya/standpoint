import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingPage } from "@/components/pages/ListingPage";
import {
  getCategory,
  getStoriesByCategory,
} from "@/lib/content/repository";

type Props = {
  params: Promise<{ slug: string; child: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, child } = await params;
  const category = await getCategory(child);
  if (!category || category.parentSlug !== slug) return {};
  return {
    title: category.title,
    description: category.description,
    alternates: { canonical: `/category/${slug}/${child}` },
  };
}

export default async function ChildCategoryPage({ params, searchParams }: Props) {
  const { slug, child } = await params;
  const page = Math.max(1, Number((await searchParams).page) || 1);
  const [parentCategory, category, stories] = await Promise.all([
    getCategory(slug),
    getCategory(child),
    getStoriesByCategory(child, page),
  ]);
  if (!parentCategory || !category || category.parentSlug !== slug) notFound();

  return (
    <ListingPage
      eyebrow={parentCategory.title}
      title={category.title}
      description={category.description}
      stories={stories}
      page={page}
      basePath={`/category/${slug}/${child}`}
      accent={category.accent}
    />
  );
}
