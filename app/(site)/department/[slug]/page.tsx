import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPeople } from "@/lib/content/repository";
import { slugToTitle } from "@/lib/site";
import styles from "../../people.module.css";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = slugToTitle(slug);
  return {
    title: `${title} desk`,
    description: `People working on the GlobHub Media ${title} desk.`,
    alternates: { canonical: `/department/${slug}` },
  };
}

export default async function DepartmentPage({ params }: Props) {
  const { slug } = await params;
  const title = slugToTitle(slug);
  const people = (await getPeople()).filter(
    (person) =>
      person.department?.toLocaleLowerCase().replaceAll(" ", "-") === slug,
  );
  if (!people.length) notFound();

  return (
    <>
      <header className={styles.teamHeader}>
        <div className="container">
          <span className="eyebrow">Department</span>
          <h1 className="page-title">{title} desk</h1>
          <p>Reporters, editors and specialists working in this newsroom desk.</p>
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
