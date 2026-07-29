import Link from "next/link";
import styles from "./editorial.module.css";

export function SectionHeading({
  title,
  href,
  inverse = false,
}: {
  title: string;
  href?: string;
  inverse?: boolean;
}) {
  return (
    <div
      className={`rule-heading ${inverse ? "rule-heading--light" : ""} ${styles.sectionHeading}`}
    >
      <h2 className="section-title">{title}</h2>
      {href ? (
        <Link href={href}>
          View all <span aria-hidden="true">→</span>
        </Link>
      ) : null}
    </div>
  );
}

