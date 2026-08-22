export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configured) return new URL("http://localhost:3000");

  try {
    return new URL(configured);
  } catch {
    return new URL("http://localhost:3000");
  }
}

export function absoluteUrl(pathname = "/") {
  return new URL(pathname, getSiteUrl()).toString();
}

export function formatDate(
  value: string | Date,
  options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
  locale = "en"
) {
  const date = value instanceof Date ? value : new Date(value);
  const intlLocale = locale === "ha" ? "ha-NG" : "en";
  return new Intl.DateTimeFormat(intlLocale, {
    timeZone: "UTC",
    ...options,
  }).format(date);
}

export function formatDateTime(value: string | Date, locale = "en") {
  return formatDate(
    value,
    {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    },
    locale
  );
}

export function slugToTitle(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part[0]?.toLocaleUpperCase() + part.slice(1))
    .join(" ");
}

export function safeLocalRedirect(
  value: string | null | undefined,
  fallback = "/"
) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return fallback;
  return value;
}

