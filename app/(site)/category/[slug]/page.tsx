import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingPage } from "@/components/pages/ListingPage";
import {
  getCategories,
  getCategory,
  getStoriesByCategory,
} from "@/lib/content/repository";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getCurrentLocale } from "@/lib/i18n/server";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getCurrentLocale();
  const category = await getCategory((await params).slug, locale);
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
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);

  const [category, stories] = await Promise.all([
    getCategory(slug, locale),
    getStoriesByCategory(slug, page, locale),
  ]);
  if (!category) notFound();

  return (
    <ListingPage
      eyebrow={dict.listing.eyebrowSection}
      title={category.title}
      description={category.description}
      stories={stories}
      page={page}
      basePath={`/category/${slug}`}
      accent={category.accent}
      locale={locale}
    />
  );
}

