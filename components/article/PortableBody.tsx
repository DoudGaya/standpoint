import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { BodyBlock, EditorialImage as ImageType } from "@/lib/content/types";
import { EditorialImage } from "@/components/editorial/EditorialImage";
import styles from "./article.module.css";

type LinkValue = { href?: string; newWindow?: boolean };
type PullQuoteValue = { quote: string; attribution?: string };
type FactBoxValue = { title: string; items: string[] };
type EditorialImageValue = { image?: ImageType } & ImageType;
type RelatedContentValue = { title?: string; storySlugs?: string[]; stories?: Array<{ slug?: { current?: string }; publicHeadline?: string }> };
type SourceNoteValue = { title?: string; sources: Array<{ label: string; url: string }> };

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }) => {
      const link = value as LinkValue;
      if (!link.href) return <>{children}</>;
      return (
        <a
          href={link.href}
          target={link.newWindow ? "_blank" : undefined}
          rel={link.newWindow ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
    internalLink: ({ children, value }) => {
      const slug =
        (value as { storySlug?: string; story?: { slug?: { current?: string } } })
          .storySlug ||
        (value as { story?: { slug?: { current?: string } } }).story?.slug?.current;
      return slug ? <Link href={`/story/${slug}`}>{children}</Link> : <>{children}</>;
    },
  },
  types: {
    pullQuote: ({ value }) => {
      const quote = value as PullQuoteValue;
      return (
        <figure className={styles.pullQuote}>
          <blockquote>{quote.quote}</blockquote>
          {quote.attribution ? <figcaption>— {quote.attribution}</figcaption> : null}
        </figure>
      );
    },
    factBox: ({ value }) => {
      const box = value as FactBoxValue;
      return (
        <aside className={styles.factBox}>
          <h2>{box.title}</h2>
          <ul>
            {box.items?.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </aside>
      );
    },
    editorialImage: ({ value }) => {
      const imageValue = value as EditorialImageValue;
      const image = imageValue.image || imageValue;
      const hasSource = image?.url || (image as any)?.asset;
      return hasSource ? (
        <div className={styles.bodyImage}>
          <EditorialImage image={image} sizes="(max-width: 800px) 100vw, 840px" />
          {image.caption || image.credit ? (
            <p>
              {image.caption}
              {image.caption && image.credit ? " " : ""}
              {image.credit ? <span>{image.credit}</span> : null}
            </p>
          ) : null}
        </div>
      ) : null;
    },
    relatedContent: ({ value }) => {
      const related = value as RelatedContentValue;
      const slugs =
        related.storySlugs ||
        related.stories?.map((story) => story.slug?.current || "").filter(Boolean) ||
        [];
      return (
        <aside className={styles.inlineRelated}>
          <strong>{related.title || "Related reporting"}</strong>
          {slugs.map((slug) => (
            <Link href={`/story/${slug}`} key={slug}>
              Read related story <span aria-hidden="true">→</span>
            </Link>
          ))}
        </aside>
      );
    },
    sourceNote: ({ value }) => {
      const note = value as SourceNoteValue;
      return (
        <aside className={styles.sourceNote}>
          <h2>{note.title || "Sources"}</h2>
          <ul>
            {note.sources?.map((source) => (
              <li key={source.url}>
                <a href={source.url} rel="nofollow">
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      );
    },
  },
  unknownType: ({ value }) => (
    <aside className={styles.unsupportedBlock}>
      This content block ({value._type}) is not available on this device.
    </aside>
  ),
};

export function PortableBody({ blocks }: { blocks: BodyBlock[] }) {
  return (
    <div className="prose" data-article-body>
      <PortableText value={blocks} components={components} />
    </div>
  );
}

