import type { Metadata } from "next";
import Link from "next/link";
import { getPeople } from "@/lib/content/repository";
import styles from "../people.module.css";

export const metadata: Metadata = {
  title: "Leadership",
  description: "GlobHub Media leadership and editorial management.",
  alternates: { canonical: "/leadership" },
};

export default async function LeadershipPage() {
  const people = (await getPeople()).filter((person) => person.featured);
  return (
    <>
      <header className={styles.teamHeader}>
        <div className="container">
          <span className="eyebrow">Governance</span>
          <h1 className="page-title">Leadership</h1>
          <p>
            Editorial leadership protects independence, standards and
            accountability across GlobHub Media.
          </p>
        </div>
      </header>
      <section className={`container section ${styles.leadershipList}`}>
        {people.map((person) => (
          <article key={person.id}>
            <span>{person.department}</span>
            <h2><Link href={`/author/${person.slug}`}>{person.name}</Link></h2>
            <h3>{person.title}</h3>
            <p>{person.shortBio}</p>
          </article>
        ))}
      </section>
    </>
  );
}

