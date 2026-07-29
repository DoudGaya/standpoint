import type { ValidationContext } from "sanity";
import { allowedEmbedHosts } from "@/lib/media/embed";

export function isHttpsUrl(value?: string) {
  if (!value) return true;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

export function isAllowedEmbedUrl(value?: string) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      allowedEmbedHosts.includes(url.hostname.toLocaleLowerCase())
    );
  } catch {
    return false;
  }
}

export function isAfter(
  value: string | undefined,
  context: ValidationContext,
  earlierField: string
) {
  if (!value) return true;
  const parent = context.parent as Record<string, unknown> | undefined;
  const earlier = parent?.[earlierField];
  if (typeof earlier !== "string") return true;
  return new Date(value) > new Date(earlier)
    ? true
    : `Must be after ${earlierField}.`;
}

