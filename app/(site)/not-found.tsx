import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container section">
      <span className="eyebrow">404</span>
      <h1 className="page-title" style={{ marginTop: "1rem", maxWidth: "12ch" }}>
        This page is no longer on the news desk.
      </h1>
      <p
        style={{
          maxWidth: "55ch",
          color: "var(--muted)",
          fontFamily: "var(--font-serif)",
          fontSize: "1.2rem",
          lineHeight: 1.6,
          marginBlock: "1.5rem 2rem",
        }}
      >
        The address may have changed, the item may have been removed, or the
        page may never have existed. Search GlobHub or return to the homepage.
      </p>
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <Link href="/" className="button">
          Go to homepage
        </Link>
        <Link href="/search" className="button button--outline">
          Search GlobHub
        </Link>
      </div>
    </section>
  );
}

