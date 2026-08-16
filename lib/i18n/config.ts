export type Locale = "en" | "ha";

export const DEFAULT_LOCALE: Locale = "en";
export const COOKIE_NAME = "NEXT_LOCALE";

export const LOCALES: Record<Locale, { name: string; nativeName: string; flag: string }> = {
  en: {
    name: "English",
    nativeName: "English",
    flag: "🇬🇧",
  },
  ha: {
    name: "Hausa",
    nativeName: "Harshen Hausa",
    flag: "🇳🇬",
  },
};

export function isValidLocale(locale?: string | null): locale is Locale {
  return Boolean(locale && locale in LOCALES);
}

export function sanitizeLocale(locale?: string | null): Locale {
  return isValidLocale(locale) ? locale : DEFAULT_LOCALE;
}
