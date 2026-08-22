import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingPage } from "@/components/pages/ListingPage";
import {
  getCategory,
  getStoriesByCategory,
} from "@/lib/content/repository";
import { getCurrentLocale } from "@/lib/i18n/server";

type Props = {
  params: Promise<{ slug: string; child: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, child } = await params;
  const locale = await getCurrentLocale();
  const category = await getCategory(child, locale);
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
  const locale = await getCurrentLocale();

  const [parentCategory, category, stories] = await Promise.all([
    getCategory(slug, locale),
    getCategory(child, locale),
    getStoriesByCategory(child, page, locale),
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
      locale={locale}
    />
  );
}
