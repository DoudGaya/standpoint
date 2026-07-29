const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim();

export const sanityEnv = {
  projectId: projectId || "globhub1",
  dataset: dataset || "production",
  apiVersion:
    process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2026-07-01",
  studioUrl: "/studio",
  readToken: process.env.SANITY_API_READ_TOKEN,
  configured: Boolean(projectId && dataset),
} as const;

export function getSanityConfigurationMessage() {
  if (sanityEnv.configured) return null;

  return [
    "Sanity is not connected.",
    "Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET to open the Studio and load CMS content.",
    "The public site is currently using the fictional development dataset.",
  ].join(" ");
}

