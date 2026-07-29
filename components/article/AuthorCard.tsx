import Link from "next/link";
import type { Person } from "@/lib/content/types";
import { EditorialImage } from "@/components/editorial/EditorialImage";
import styles from "./article.module.css";

export function AuthorCard({ person }: { person: Person }) {
  return (
    <article className={styles.authorCard}>
      {person.image ? (
        <EditorialImage image={person.image} sizes="100px" className={styles.authorImage} />
      ) : null}
      <div>
        <span>About the author</span>
        <h2><Link href={`/author/${person.slug}`}>{person.name}</Link></h2>
        <p>{person.shortBio}</p>
        <Link href={`/author/${person.slug}`}>More from {person.name}</Link>
      </div>
    </article>
  );
}

