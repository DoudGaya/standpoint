import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Globe, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import { AuthorCard } from "@/components/article/AuthorCard";
import { CommentsPlaceholder } from "@/components/article/CommentsPlaceholder";
import { PortableBody } from "@/components/article/PortableBody";
import { ReadingProgress } from "@/components/article/ReadingProgress";
import { ShareToolbar } from "@/components/article/ShareToolbar";
import { AdSlot } from "@/components/editorial/AdSlot";
import { EditorialImage } from "@/components/editorial/EditorialImage";
import { NewsletterCallout } from "@/components/editorial/NewsletterCallout";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { StoryCard } from "@/components/editorial/StoryCard";
import {
  getAllStories,
  getNewsletters,
  getStory,
  getStorySlugs,
} from "@/lib/content/repository";
import { storyJsonLd } from "@/lib/seo/jsonld";
import { buildStoryMetadata } from "@/lib/seo/metadata";
import { absoluteUrl, formatDateTime } from "@/lib/site";
import styles from "./story.module.css";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const items = await getStorySlugs();
  return items.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) return {};
  return buildStoryMetadata(story);
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const [story, allStories, newsletters] = await Promise.all([
    getStory(slug),
    getAllStories(),
    getNewsletters(),
  ]);
  if (!story) notFound();

  const primaryCategoryTitle = story.primaryCategory?.title || "News";
  const primaryCategorySlug = story.primaryCategory?.slug || "general";
  const storyTypeLabel = (story.type || "story").replaceAll("-", " ");
  const authors = story.authors || [];
  const contributors = (story.contributors || []).filter((c) => Boolean(c?.person));
  const tags = story.tags || [];

  const translatedStory = allStories.find(
    (item) =>
      story.relatedStorySlugs?.includes(item.slug) && item.language !== story.language
  );

  const related = (story.relatedStorySlugs || [])
    .map((relatedSlug) => allStories.find((item) => item.slug === relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const recommended = [
    ...related,
    ...allStories.filter(
      (item) =>
        item.id !== story.id &&
        item.primaryCategory?.slug === primaryCategorySlug &&
        !related.some((relatedStory) => relatedStory.id === item.id)
    ),
  ].slice(0, 3);

  return (
    <article>
      <ReadingProgress />
      <header className={`container ${styles.articleHeader}`}>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            {
              label: primaryCategoryTitle,
              href: `/category/${primaryCategorySlug}`,
            },
            { label: storyTypeLabel },
          ]}
        />
        {translatedStory ? (
          <div className={styles.translationBanner}>
            <Globe size={18} />
            <span>
              {story.language === "en"
                ? "Wannan labarin yana samuwa ne a Harshen Hausa: "
                : "This story is also available in English: "}
              <Link href={`/story/${translatedStory.slug}`}>
                {translatedStory.headline}
              </Link>
            </span>
          </div>
        ) : null}
        <div className={styles.headerGrid}>
          <div>
            <span className="eyebrow">{story.kicker}</span>
            <h1>{story.headline}</h1>
            <p className={styles.standfirst}>{story.standfirst}</p>
            {story.deck ? <p className={styles.deck}>{story.deck}</p> : null}
            <div className={styles.byline}>
              <span>By</span>
              {authors.map((author, index) => (
                <span key={author.id || index}>
                  <Link href={`/author/${author.slug}`}>{author.name}</Link>
                  {index < authors.length - 1 ? "," : ""}
                </span>
              ))}
            </div>
            {contributors.length ? (
              <p className={styles.contributors}>
                {contributors.map(({ person, role }) => (
                  <span key={`${person.id}-${role}`}>
                    {role}: <Link href={`/author/${person.slug}`}>{person.name}</Link>
                  </span>
                ))}
              </p>
            ) : null}
            <div className={styles.timestamps}>
              <time dateTime={story.publishedAt}>
                Published {formatDateTime(story.publishedAt)}
              </time>
              {story.updatedAt ? (
                <time dateTime={story.updatedAt}>
                  Updated {formatDateTime(story.updatedAt)}
                </time>
              ) : null}
              <span><Clock size={13} /> {story.readingTime || 3} min read</span>
            </div>
          </div>
          <div className={styles.typeMarker}>
            <span>{storyTypeLabel}</span>
            <small>{story.edition || "Global"} edition</small>
          </div>
        </div>
      </header>

      {story.sponsoredBy ? (
        <div className={`container ${styles.sponsoredDisclosure}`}>
          Paid content · Sponsored by {typeof story.sponsoredBy === "string" ? story.sponsoredBy : (story.sponsoredBy as { name?: string })?.name || "Sponsor"}. This commercial
          partnership is clearly separated from independent editorial reporting.
        </div>
      ) : null}

      {story.hero ? (
        <figure className={`container ${styles.hero}`}>
          <EditorialImage
            image={story.hero}
            priority
            sizes="(max-width: 1300px) 100vw, 1240px"
          />
          <figcaption>
            <span>{story.hero.caption}</span>
            <strong>{story.hero.credit}</strong>
          </figcaption>
        </figure>
      ) : null}

      <div className={`container ${styles.articleLayout}`}>
        <ShareToolbar title={story.headline} storyId={story.id} />
        <div className={styles.articleBody}>
          {story.contentWarning ? (
            <aside className={styles.contentWarning}>
              <strong>Content note</strong>
              <p>{story.contentWarning}</p>
            </aside>
          ) : null}
          {story.editorsNote ? (
            <aside className={styles.editorsNote}>
              <ShieldCheck size={18} />
              <div>
                <strong>Editor&apos;s note</strong>
                <p>{story.editorsNote}</p>
              </div>
            </aside>
          ) : null}
          <PortableBody blocks={story.body} />
          {story.correctionNote ? (
            <aside className={styles.correction}>
              <strong>Correction</strong>
              <p>{story.correctionNote}</p>
            </aside>
          ) : null}
          {story.disclosure ? (
            <aside className={styles.disclosure}>
              <strong>Disclosure</strong>
              <p>{story.disclosure}</p>
            </aside>
          ) : null}
          <div className={styles.tags} aria-label="Story tags">
            {tags.map((tag) => (
              <Link
                href={`/tag/${tag.toLocaleLowerCase().replaceAll(" ", "-")}`}
                key={tag}
              >
                {tag}
              </Link>
            ))}
          </div>
          <div className={styles.authorStack}>
            {authors.map((author) => (
              <AuthorCard person={author} key={author.id} />
            ))}
          </div>
          {newsletters[0] ? (
            <NewsletterCallout
              newsletter={newsletters[0]}
              placement="article-end"
            />
          ) : null}
          <CommentsPlaceholder enabled={story.commentsEnabled === true} />
        </div>
        <aside className={styles.articleRail}>
          <AdSlot placement="article-sidebar" desktopSize="300 × 600" />
          <div className={styles.latestBox}>
            <strong>Latest from {primaryCategoryTitle}</strong>
            {allStories
              .filter(
                (item) =>
                  item.id !== story.id &&
                  item.primaryCategory?.slug === primaryCategorySlug
              )
              .slice(0, 4)
              .map((item) => (
                <Link href={`/story/${item.slug}`} key={item.id}>
                  {item.shortHeadline}
                </Link>
              ))}
          </div>
        </aside>
      </div>

      {recommended.length ? (
        <section className="surface-alt section">
          <div className="container">
            <SectionHeading title="Keep reading" />
            <div className={styles.recommendedGrid}>
              {recommended.map((item) => (
                <StoryCard story={item} key={item.id} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(storyJsonLd(story)).replace(/</g, "\\u003c"),
        }}
      />
    </article>
  );
}

