import { DEFAULT_LOCALE, type Locale, sanitizeLocale } from "./config";
import { enDictionary, type Dictionary } from "./dictionaries/en";
import { haDictionary } from "./dictionaries/ha";

const dictionaries: Record<Locale, Dictionary> = {
  en: enDictionary,
  ha: haDictionary,
};

export function getDictionary(locale: Locale = DEFAULT_LOCALE): Dictionary {
  return dictionaries[sanitizeLocale(locale)] ?? dictionaries[DEFAULT_LOCALE];
}
