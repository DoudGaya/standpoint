import { defineLive } from "next-sanity/live";
import { sanityEnv } from "../env";
import { sanityClient } from "./client";

const previewToken = sanityEnv.readToken || false;

export const { sanityFetch, SanityLive } = defineLive({
  client: sanityClient,
  serverToken: previewToken,
  browserToken: previewToken,
});
