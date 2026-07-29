import type { Metadata } from "next";
import Link from "next/link";
import { EditorialImage } from "@/components/editorial/EditorialImage";
import { getNewsletters } from "@/lib/content/repository";
import styles from "../service-pages.module.css";

export const metadata: Metadata = {
  title: "Newsletters",
  description: "Newsletters from GlobHub Media's global and specialist desks.",
  alternates: { canonical: "/newsletters" },
};

export default async function NewslettersPage() {
  const newsletters = await getNewsletters();
  return (
    <>
      <header className={styles.serviceHeader}>
        <div className="container">
          <span className="eyebrow">In your inbox</span>
          <h1 className="page-title">Newsletters</h1>
          <p>Essential reporting, specialist context and clear signals about what to watch next.</p>
        </div>
      </header>
      <section className={`container section ${styles.productGrid}`}>
        {newsletters.map((newsletter) => (
          <article key={newsletter.id}>
            <EditorialImage image={newsletter.cover} sizes="(max-width: 700px) 100vw, 50vw" />
            <span>{newsletter.frequency}</span>
            <h2><Link href={`/newsletters/${newsletter.slug}`}>{newsletter.name}</Link></h2>
            <p>{newsletter.description}</p>
            <Link href={`/newsletters/${newsletter.slug}`}>See newsletter →</Link>
          </article>
        ))}
      </section>
    </>
  );
}

