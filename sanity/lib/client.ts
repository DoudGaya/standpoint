import { createClient } from "next-sanity";
import { sanityEnv } from "../env";

export const sanityClient = createClient({
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,
  apiVersion: sanityEnv.apiVersion,
  useCdn: false,
  perspective: "published",
  stega: {
    studioUrl: sanityEnv.studioUrl,
  },
});

export const previewClient = sanityClient.withConfig({
  token: sanityEnv.readToken,
  useCdn: false,
  perspective: "drafts",
});

