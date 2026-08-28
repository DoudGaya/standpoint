import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { EditorialImage } from "@/components/editorial/EditorialImage";
import { StoryCard } from "@/components/editorial/StoryCard";
import {
  getPeople,
  getPerson,
  getStoriesByAuthor,
} from "@/lib/content/repository";
import { personJsonLd } from "@/lib/seo/jsonld";
import { absoluteUrl } from "@/lib/site";
import styles from "../../people.module.css";

import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getCurrentLocale } from "@/lib/i18n/server";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return (await getPeople()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const person = await getPerson((await params).slug);
  if (!person) return {};
  const ogImageUrl = person.image?.url ? absoluteUrl(person.image.url) : absoluteUrl("/og.png");
  return {
    title: person.name,
    description: person.shortBio,
    alternates: { canonical: `/author/${person.slug}` },
    openGraph: {
      type: "profile",
      siteName: "GlobHub Media",
      title: person.name,
      description: person.shortBio,
      images: [
        {
          url: ogImageUrl,
          width: person.image?.width || 800,
          height: person.image?.height || 800,
          alt: person.image?.alt || person.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: person.name,
      description: person.shortBio,
      images: [ogImageUrl],
    },
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);

  const [person, stories] = await Promise.all([
    getPerson(slug),
    getStoriesByAuthor(slug, 1),
  ]);
  if (!person) notFound();

  return (
    <>
      <header className={styles.profileHeader}>
        <div className={`container ${styles.profileGrid}`}>
          <div>
            <span className="eyebrow">{dict.nav.ourNewsroom}</span>
            <h1 className="page-title">{person.name}</h1>
            <p className={styles.profileTitle}>{person.title}</p>
            <p className={styles.profileBio}>
              {typeof person.biography === "string" && person.biography
                ? person.biography
                : person.shortBio}
            </p>
            {person.location ? (
              <p className={styles.profileLocation}>
                <MapPin size={15} /> {person.location}
              </p>
            ) : null}
            <div className={styles.profileLinks}>
              {person.socialLinks?.map((link) => (
                <a href={link.url} key={link.label} rel="me">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          {person.image ? (
            <EditorialImage
              image={person.image}
              priority
              sizes="(max-width: 700px) 100vw, 400px"
              className={styles.profileImage}
            />
          ) : null}
        </div>
      </header>
      <section className={`container section ${styles.authorStories}`}>
        <div className="rule-heading">
          <h2 className="section-title">{dict.author.articlesBy} {person.name}</h2>
        </div>
        <div className={styles.authorStoryGrid}>
          {stories.length ? (
            stories.map((story) => <StoryCard story={story} key={story.id} />)
          ) : (
            <p>
              {dict.author.noArticlesYet}{" "}
              <Link className="link" href="/latest">{dict.listing.browseLatest}.</Link>
            </p>
          )}
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            ...personJsonLd(person),
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}

