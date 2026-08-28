import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialImage } from "@/components/editorial/EditorialImage";
import { NewsletterCallout } from "@/components/editorial/NewsletterCallout";
import { getNewsletters } from "@/lib/content/repository";
import { absoluteUrl } from "@/lib/site";
import styles from "../../service-pages.module.css";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const newsletters = await getNewsletters();
  const newsletter = newsletters.find((item) => item.slug === slug);
  if (!newsletter) return {};
  const ogImageUrl = newsletter.cover?.url ? absoluteUrl(newsletter.cover.url) : absoluteUrl("/og.png");
  return {
    title: newsletter.name,
    description: newsletter.description,
    alternates: { canonical: `/newsletters/${newsletter.slug}` },
    openGraph: {
      type: "website",
      siteName: "GlobHub Media",
      title: newsletter.name,
      description: newsletter.description,
      images: [
        {
          url: ogImageUrl,
          width: newsletter.cover?.width || 1200,
          height: newsletter.cover?.height || 630,
          alt: newsletter.cover?.alt || newsletter.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: newsletter.name,
      description: newsletter.description,
      images: [ogImageUrl],
    },
  };
}

export default async function NewsletterDetailPage({ params }: Props) {
  const { slug } = await params;
  const newsletters = await getNewsletters();
  const newsletter = newsletters.find((item) => item.slug === slug);
  if (!newsletter) notFound();
  return (
    <section className={`container section ${styles.newsletterDetail}`}>
      <EditorialImage image={newsletter.cover} priority sizes="420px" />
      <div>
        <span className="eyebrow">{newsletter.frequency}</span>
        <h1 className="page-title">{newsletter.name}</h1>
        <p>{newsletter.description}</p>
        <small>Edited by {newsletter.editor.name}</small>
        <NewsletterCallout newsletter={newsletter} placement="newsletter-detail" />
      </div>
    </section>
  );
}
