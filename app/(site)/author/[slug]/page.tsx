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
import styles from "../../people.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return (await getPeople()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const person = await getPerson((await params).slug);
  if (!person) return {};
  return {
    title: person.name,
    description: person.shortBio,
    alternates: { canonical: `/author/${person.slug}` },
    openGraph: {
      type: "profile",
      title: person.name,
      description: person.shortBio,
      images: person.image?.url
        ? [{ url: person.image.url, alt: person.image.alt }]
        : undefined,
    },
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const [person, stories] = await Promise.all([
    getPerson(slug),
    getStoriesByAuthor(slug),
  ]);
  if (!person) notFound();

  return (
    <>
      <header className={styles.profileHeader}>
        <div className={`container ${styles.profileGrid}`}>
          <div>
            <span className="eyebrow">GlobHub newsroom</span>
            <h1 className="page-title">{person.name}</h1>
            <p className={styles.profileTitle}>{person.title}</p>
            <p className={styles.profileBio}>{person.biography || person.shortBio}</p>
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
          <h2 className="section-title">Reporting by {person.name}</h2>
        </div>
        <div className={styles.authorStoryGrid}>
          {stories.length ? (
            stories.map((story) => <StoryCard story={story} key={story.id} />)
          ) : (
            <p>
              No public stories are currently assigned to this profile.{" "}
              <Link className="link" href="/latest">Browse the latest news.</Link>
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

