import { cookies } from "next/headers";
import { COOKIE_NAME, DEFAULT_LOCALE, type Locale, sanitizeLocale } from "./config";

export async function getCurrentLocale(): Promise<Locale> {
  try {
    const cookieStore = await cookies();
    const localeCookie = cookieStore.get(COOKIE_NAME)?.value;
    return sanitizeLocale(localeCookie);
  } catch {
    return DEFAULT_LOCALE;
  }
}
