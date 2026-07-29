"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main className="container section">
          <span className="eyebrow">Temporary problem</span>
          <h1 className="page-title" style={{ marginTop: "1rem" }}>
            We could not load this page.
          </h1>
          <p style={{ color: "var(--muted)", maxWidth: "55ch", lineHeight: 1.6 }}>
            The newsroom site is still available. Try again, or return to the
            homepage if the problem continues.
          </p>
          <button type="button" onClick={reset} className="button">
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}

