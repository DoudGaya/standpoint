import { sanityEnv } from "@/sanity/env";
import { StudioClient } from "./StudioClient";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!sanityEnv.configured) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#170c3a",
          color: "white",
          padding: "2rem",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ maxWidth: 680 }}>
          <p
            style={{
              color: "#13cefc",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            GlobHub Studio
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1 }}>
            Connect a Sanity project to open the newsroom.
          </h1>
          <p style={{ color: "#d6d0e4", lineHeight: 1.7 }}>
            Add NEXT_PUBLIC_SANITY_PROJECT_ID and
            NEXT_PUBLIC_SANITY_DATASET, then restart the application. The public
            site is currently using the fictional development dataset.
          </p>
        </div>
      </main>
    );
  }

  return <StudioClient />;
}
