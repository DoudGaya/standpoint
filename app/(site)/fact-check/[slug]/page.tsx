import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialImage } from "@/components/editorial/EditorialImage";
import { getFactChecks } from "@/lib/content/repository";
import { factCheckJsonLd } from "@/lib/seo/jsonld";
import { formatDate } from "@/lib/site";
import styles from "../fact-check.module.css";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const factChecks = await getFactChecks();
  const factCheck = factChecks.find((item) => item.slug === slug);
  return factCheck
    ? {
        title: factCheck.title,
        description: factCheck.conclusion,
        alternates: { canonical: `/fact-check/${factCheck.slug}` },
      }
    : {};
}

export default async function FactCheckDetailPage({ params }: Props) {
  const { slug } = await params;
  const factCheck = (await getFactChecks()).find((item) => item.slug === slug);
  if (!factCheck) notFound();
  return (
    <article>
      <header className={styles.factDetailHeader}>
        <div className="container">
          <span className="eyebrow">Fact check</span>
          <div className={styles.factTitleGrid}>
            <div>
              <h1 className="page-title">{factCheck.title}</h1>
              <p>{factCheck.conclusion}</p>
              <small>
                Reviewed {formatDate(factCheck.reviewDate)} · By{" "}
                <Link href={`/author/${factCheck.reviewer.slug}`}>{factCheck.reviewer.name}</Link>
              </small>
            </div>
            <div className={styles.verdict} data-verdict={factCheck.verdict}>
              <span>Verdict</span>
              <strong>{factCheck.verdict.replaceAll("-", " ")}</strong>
            </div>
          </div>
        </div>
      </header>
      {factCheck.image ? (
        <figure className={`container ${styles.factHero}`}>
          <EditorialImage image={factCheck.image} priority sizes="(max-width: 1300px) 100vw, 1240px" />
        </figure>
      ) : null}
      <div className={`reading-container section ${styles.factBody}`}>
        <section className={styles.claimBox}>
          <span>The claim</span>
          <blockquote>{factCheck.claim}</blockquote>
          <p>
            Attributed to <strong>{factCheck.claimant}</strong> · Origin:{" "}
            {factCheck.claimOrigin} · {formatDate(factCheck.claimDate)}
          </p>
        </section>
        <section>
          <h2>What the evidence shows</h2>
          <p>{factCheck.analysis}</p>
        </section>
        <section>
          <h2>How we checked it</h2>
          <p>{factCheck.methodology}</p>
        </section>
        <section className={styles.factSources}>
          <h2>Sources</h2>
          <ul>
            {factCheck.sources.map((source) => (
              <li key={source.url}><a href={source.url} rel="nofollow">{source.label}</a></li>
            ))}
          </ul>
        </section>
        <p className={styles.factCredits}>
          Reviewer: <Link href={`/author/${factCheck.reviewer.slug}`}>{factCheck.reviewer.name}</Link>
          {" · "}Fact checker: <Link href={`/author/${factCheck.factChecker.slug}`}>{factCheck.factChecker.name}</Link>
        </p>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(factCheckJsonLd(factCheck)).replace(/</g, "\\u003c"),
        }}
      />
    </article>
  );
}
