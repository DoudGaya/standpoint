import type { Metadata } from "next";
import Link from "next/link";
import { getPeople } from "@/lib/content/repository";
import styles from "../people.module.css";

export const metadata: Metadata = {
  title: "Management",
  description: "GlobHub Media executive and editorial management.",
  alternates: { canonical: "/management" },
};

export default async function ManagementPage() {
  const people = (await getPeople()).filter(
    (person) =>
      person.featured ||
      person.roles.some((role) => /editor|manager|director/i.test(role)),
  );

  return (
    <>
      <header className={styles.teamHeader}>
        <div className="container">
          <span className="eyebrow">Organization</span>
          <h1 className="page-title">Management</h1>
          <p>
            The fictional development team shown here demonstrates how Sanity
            can power public leadership and accountability pages.
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
