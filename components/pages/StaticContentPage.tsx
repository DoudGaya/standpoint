import type { StaticPageDefinition } from "@/lib/content/static-pages";
import styles from "./static-content.module.css";

export function StaticContentPage({ page }: { page: StaticPageDefinition }) {
  return (
    <>
      <header className={styles.staticHeader}>
        <div className="container">
          <span className="eyebrow">{page.eyebrow}</span>
          <h1 className="page-title">{page.title}</h1>
          <p>{page.standfirst}</p>
        </div>
      </header>
      <article className={`reading-container section ${styles.staticBody}`}>
        {page.reviewNotice ? (
          <aside>
            <strong>Review notice</strong>
            <p>{page.reviewNotice}</p>
          </aside>
        ) : null}
        {(page?.sections || []).map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {(section.paragraphs || []).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.bullets?.length ? (
              <ul>
                {section.bullets.map((item) => <li key={item}>{item}</li>)}
              </ul>
            ) : null}
          </section>
        ))}
      </article>
    </>
  );
}

