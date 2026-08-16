"use client";

import { Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { setLocaleAction } from "@/lib/i18n/actions";
import { LOCALES, type Locale } from "@/lib/i18n/config";
import styles from "./site-shell.module.css";

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (newLocale: Locale) => {
    if (newLocale === currentLocale || isPending) return;
    startTransition(async () => {
      await setLocaleAction(newLocale);
      router.refresh();
    });
  };

  return (
    <div className={styles.languageSwitcher} title="Switch language">
      <Globe size={14} className={styles.languageIcon} />
      <span className={styles.languageLabel}>
        {LOCALES[currentLocale].name}
      </span>
      <div className={styles.languageOptions}>
        {(Object.keys(LOCALES) as Locale[]).map((loc) => (
          <button
            key={loc}
            type="button"
            className={`${styles.languageButton} ${
              loc === currentLocale ? styles.languageActive : ""
            }`}
            onClick={() => handleLanguageChange(loc)}
            disabled={isPending}
            aria-pressed={loc === currentLocale}
          >
            <span aria-hidden="true">{LOCALES[loc].flag}</span>
            <span>{LOCALES[loc].name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
