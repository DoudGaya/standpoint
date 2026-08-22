import Link from "next/link";
import { Headphones, Search, UserRound, Video } from "lucide-react";
import type {
  BreakingItem,
  Navigation,
  SiteSettings,
} from "@/lib/content/types";
import { formatDate } from "@/lib/site";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { BreakingTicker } from "./BreakingTicker";
import { HeaderNavigation } from "./HeaderNavigation";
import styles from "./site-shell.module.css";

export function SiteHeader({
  navigation,
  breakingItems = [],
  settings,
  locale = DEFAULT_LOCALE,
}: {
  navigation?: Navigation;
  breakingItems?: BreakingItem[];
  settings?: SiteSettings;
  locale?: Locale;
}) {
  const dict = getDictionary(locale);

  return (
    <header className={`${styles.siteHeader} no-print`}>
      <a href="#main-content" className="skip-link">
        {dict.header.skipToContent}
      </a>
      <div className={styles.utilityBar}>
        <div className={`container ${styles.utilityInner}`}>
          <div className={styles.utilityMeta}>
            {navigation?.showDate ? (
              <time dateTime={new Date().toISOString()}>
                {formatDate(
                  new Date(),
                  {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  },
                  locale
                )}
              </time>
            ) : null}
            {settings?.edition ? <span>{settings.edition} {dict.header.edition}</span> : null}
            <LanguageSwitcher currentLocale={locale} />
          </div>
          <div className={styles.utilityLinks}>
            <Link href="/watch-live">
              <Video size={14} /> {dict.header.watchLive}
            </Link>
            <Link href="/audio">
              <Headphones size={14} /> {dict.header.listen}
            </Link>
            <Link href="/search" aria-label={dict.header.search}>
              <Search size={14} /> {dict.header.search}
            </Link>
            {navigation?.showAccount ? (
              <span title="Reader accounts are not enabled in this release">
                <UserRound size={14} /> {dict.header.account}
              </span>
            ) : null}
          </div>
        </div>
      </div>
      <HeaderNavigation
        navigation={
          navigation || {
            utilityLinks: [],
            categories: [],
            edition: "Global",
            language: locale,
            showDate: true,
            showLive: true,
            showNewsletter: true,
            showAccount: false,
          }
        }
        locale={locale}
      />
      <BreakingTicker items={breakingItems || []} />
    </header>
  );
}


