import type { QueryParams } from "next-sanity";
import { draftMode } from "next/headers";
import { sanityEnv } from "../env";
import { sanityFetch } from "./live";

type FetchOptions = {
  tags?: string[];
  revalidate?: number;
};

export async function fetchSanity<T>(
  query: string,
  params: QueryParams = {},
  options: FetchOptions = {}
): Promise<T | null> {
  if (!sanityEnv.configured) return null;

  try {
    let isEnabled = false;
    try {
      const draft = await draftMode();
      isEnabled = draft.isEnabled;
    } catch {
      isEnabled = false;
    }

    const { data } = await sanityFetch({
      query,
      params,
      perspective:
        isEnabled && sanityEnv.readToken ? "drafts" : "published",
      stega: Boolean(isEnabled && sanityEnv.readToken),
      tags: options.tags,
    });
    return data as T;
  } catch (error) {
    console.error(
      "Sanity content fetch failed.",
      error instanceof Error ? error.message : "Unknown CMS error",
      error instanceof Error && error.cause ? error.cause : ""
    );
    return null;
  }
}
