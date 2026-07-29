export default function Loading() {
  return (
    <div className="container section" aria-label="Loading content" aria-busy="true">
      <div className="skeleton" style={{ width: "9rem", height: "0.8rem" }} />
      <div
        className="skeleton"
        style={{ width: "min(42rem, 100%)", height: "4rem", marginTop: "1rem" }}
      />
      <div
        className="skeleton"
        style={{ width: "100%", aspectRatio: "16 / 7", marginTop: "2rem" }}
      />
    </div>
  );
}

