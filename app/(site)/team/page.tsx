import type { Metadata } from "next";
import Link from "next/link";
import { EditorialImage } from "@/components/editorial/EditorialImage";
import { getPeople } from "@/lib/content/repository";
import styles from "../people.module.css";

export const metadata: Metadata = {
  title: "Our newsroom",
  description: "Meet the fictional editors, reporters and producers behind GlobHub Media.",
  alternates: { canonical: "/team" },
};

export default async function TeamPage() {
  const people = await getPeople();
  return (
    <>
      <header className={styles.teamHeader}>
        <div className="container">
          <span className="eyebrow">People</span>
          <h1 className="page-title">Our newsroom</h1>
          <p>
            GlobHub brings together reporters, editors, producers and visual
            journalists with local knowledge and global perspective.
          </p>
        </div>
      </header>
      <section className={`container section ${styles.teamGrid}`}>
        {people.map((person) => (
          <article key={person.id}>
            {person.image ? (
              <Link href={`/author/${person.slug}`} tabIndex={-1} aria-hidden="true">
                <EditorialImage image={person.image} sizes="(max-width: 700px) 50vw, 25vw" />
              </Link>
            ) : null}
            <span>{person.department}</span>
            <h2><Link href={`/author/${person.slug}`}>{person.name}</Link></h2>
            <p>{person.title}</p>
          </article>
        ))}
      </section>
    </>
  );
}

