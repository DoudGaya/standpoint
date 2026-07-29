import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingPage } from "@/components/pages/ListingPage";
import {
  getCategories,
  getCategory,
  getStoriesByCategory,
} from "@/lib/content/repository";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategory((await params).slug);
  if (!category) return {};
  return {
    title: category.title,
    description: category.description,
    alternates: { canonical: `/category/${category.slug}` },
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const page = Math.max(1, Number((await searchParams).page) || 1);
  const [category, stories] = await Promise.all([
    getCategory(slug),
    getStoriesByCategory(slug, page),
  ]);
  if (!category) notFound();

  return (
    <ListingPage
      eyebrow="Section"
      title={category.title}
      description={category.description}
      stories={stories}
      page={page}
      basePath={`/category/${slug}`}
      accent={category.accent}
    />
  );
}

