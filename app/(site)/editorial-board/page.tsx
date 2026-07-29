import type { Metadata } from "next";
import Link from "next/link";
import { getPeople } from "@/lib/content/repository";
import styles from "../people.module.css";

export const metadata: Metadata = {
  title: "Editorial board",
  description: "The editors responsible for GlobHub Media standards and voice.",
  alternates: { canonical: "/editorial-board" },
};

export default async function EditorialBoardPage() {
  const people = (await getPeople()).filter((person) =>
    person.roles.some((role) => /editor/i.test(role)),
  );

  return (
    <>
      <header className={styles.teamHeader}>
        <div className="container">
          <span className="eyebrow">Editorial governance</span>
          <h1 className="page-title">Editorial board</h1>
          <p>
            Board membership, biographies and departmental responsibilities are
            managed as structured person records in Sanity.
          </p>
        </div>
      </header>
      <section className={`container section ${styles.leadershipList}`}>
        {people.map((person) => (
          <article key={person.id}>
            <span>{person.department}</span>
            <h2>
              <Link href={`/author/${person.slug}`}>{person.name}</Link>
            </h2>
            <h3>{person.title}</h3>
            <p>{person.shortBio}</p>
          </article>
        ))}
      </section>
    </>
  );
}
