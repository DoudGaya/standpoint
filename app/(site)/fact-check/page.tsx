import type { Metadata } from "next";
import Link from "next/link";
import { EditorialImage } from "@/components/editorial/EditorialImage";
import { getFactChecks } from "@/lib/content/repository";
import { formatDate } from "@/lib/site";
import styles from "./fact-check.module.css";

export const metadata: Metadata = {
  title: "Fact checks",
  description: "Evidence-led claim reviews and methodology from GlobHub Media.",
  alternates: { canonical: "/fact-check" },
};

export default async function FactCheckPage() {
  const factChecks = await getFactChecks();
  return (
    <>
      <header className={styles.factHeader}>
        <div className="container">
          <span className="eyebrow">Evidence desk</span>
          <h1 className="page-title">Fact checks</h1>
          <p>
            We trace consequential claims to their sources, examine primary
            evidence and explain how each verdict was reached.
          </p>
          <Link href="/fact-checking-methodology">Read our methodology</Link>
        </div>
      </header>
      <section className={`container section ${styles.factGrid}`}>
        {factChecks.map((factCheck) => (
          <article key={factCheck.id}>
            {factCheck.image ? (
              <Link href={`/fact-check/${factCheck.slug}`} tabIndex={-1} aria-hidden="true">
                <EditorialImage image={factCheck.image} sizes="(max-width: 700px) 100vw, 50vw" />
              </Link>
            ) : null}
            <div>
              <span data-verdict={factCheck.verdict}>{factCheck.verdict.replaceAll("-", " ")}</span>
              <h2><Link href={`/fact-check/${factCheck.slug}`}>{factCheck.title}</Link></h2>
              <p>{factCheck.conclusion}</p>
              <small>Reviewed {formatDate(factCheck.reviewDate)}</small>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

