import type { MediaProvider } from "@/lib/content/types";

export type NormalizedEmbed = {
  provider: MediaProvider;
  originalUrl: string;
  embedUrl: string;
  canIframe: boolean;
  privacyEnhanced: boolean;
};

const ALLOWED_HOSTS = new Map<string, MediaProvider>([
  ["youtube.com", "youtube"],
  ["www.youtube.com", "youtube"],
  ["youtu.be", "youtube"],
  ["www.youtube-nocookie.com", "youtube"],
  ["player.vimeo.com", "vimeo"],
  ["vimeo.com", "vimeo"],
  ["www.facebook.com", "facebook"],
  ["facebook.com", "facebook"],
  ["www.instagram.com", "instagram"],
  ["instagram.com", "instagram"],
  ["www.tiktok.com", "tiktok"],
  ["tiktok.com", "tiktok"],
  ["x.com", "x"],
  ["twitter.com", "x"],
  ["soundcloud.com", "soundcloud"],
  ["w.soundcloud.com", "soundcloud"],
  ["open.spotify.com", "spotify"],
  ["podcasts.apple.com", "apple-podcasts"],
  ["www.mixcloud.com", "mixcloud"],
]);

function youtubeId(url: URL) {
  if (url.hostname === "youtu.be") return url.pathname.split("/").filter(Boolean)[0];
  if (url.pathname.startsWith("/embed/"))
    return url.pathname.split("/").filter(Boolean)[1];
  return url.searchParams.get("v") || undefined;
}

function vimeoId(url: URL) {
  const parts = url.pathname.split("/").filter(Boolean);
  return parts.find((part) => /^\d+$/.test(part));
}

export function normalizeEmbedUrl(value: string): NormalizedEmbed | null {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }

  if (url.protocol !== "https:") return null;
  const provider = ALLOWED_HOSTS.get(url.hostname.toLocaleLowerCase());
  if (!provider) return null;

  if (provider === "youtube") {
    const id = youtubeId(url);
    if (!id || !/^[\w-]{6,20}$/.test(id)) return null;
    return {
      provider,
      originalUrl: value,
      embedUrl: `https://www.youtube-nocookie.com/embed/${id}`,
      canIframe: true,
      privacyEnhanced: true,
    };
  }

  if (provider === "vimeo") {
    const id = vimeoId(url);
    if (!id) return null;
    return {
      provider,
      originalUrl: value,
      embedUrl: `https://player.vimeo.com/video/${id}?dnt=1`,
      canIframe: true,
      privacyEnhanced: true,
    };
  }

  if (provider === "spotify" && url.pathname.startsWith("/embed/")) {
    return {
      provider,
      originalUrl: value,
      embedUrl: url.toString(),
      canIframe: true,
      privacyEnhanced: false,
    };
  }

  if (provider === "soundcloud" && url.hostname === "w.soundcloud.com") {
    return {
      provider,
      originalUrl: value,
      embedUrl: url.toString(),
      canIframe: true,
      privacyEnhanced: false,
    };
  }

  return {
    provider,
    originalUrl: value,
    embedUrl: url.toString(),
    canIframe: false,
    privacyEnhanced: false,
  };
}

export function isAllowedExternalMediaUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password;
  } catch {
    return false;
  }
}

export const allowedEmbedHosts = [...ALLOWED_HOSTS.keys()];

