import { cookies } from "next/headers";
import { COOKIE_NAME, DEFAULT_LOCALE, type Locale, sanitizeLocale } from "./config";
import { enDictionary, type Dictionary } from "./dictionaries/en";
import { haDictionary } from "./dictionaries/ha";

const dictionaries: Record<Locale, Dictionary> = {
  en: enDictionary,
  ha: haDictionary,
};

export function getDictionary(locale: Locale = DEFAULT_LOCALE): Dictionary {
  return dictionaries[sanitizeLocale(locale)] ?? dictionaries[DEFAULT_LOCALE];
}

export async function getCurrentLocale(): Promise<Locale> {
  try {
    const cookieStore = await cookies();
    const localeCookie = cookieStore.get(COOKIE_NAME)?.value;
    return sanitizeLocale(localeCookie);
  } catch {
    return DEFAULT_LOCALE;
  }
}
