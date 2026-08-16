"use server";

import { cookies } from "next/headers";
import { COOKIE_NAME, sanitizeLocale } from "./config";

export async function setLocaleAction(locale: string) {
  const sanitized = sanitizeLocale(locale);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, sanitized, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
  });
  return { success: true, locale: sanitized };
}
