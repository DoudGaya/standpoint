import Link from "next/link";
import { Headphones, Search, UserRound, Video } from "lucide-react";
import type {
  BreakingItem,
  Navigation,
  SiteSettings,
} from "@/lib/content/types";
import { formatDate } from "@/lib/site";
import { BreakingTicker } from "./BreakingTicker";
import { HeaderNavigation } from "./HeaderNavigation";
import styles from "./site-shell.module.css";

export function SiteHeader({
  navigation,
  breakingItems,
  settings,
}: {
  navigation: Navigation;
  breakingItems: BreakingItem[];
  settings: SiteSettings;
}) {
  return (
    <header className={`${styles.siteHeader} no-print`}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className={styles.utilityBar}>
        <div className={`container ${styles.utilityInner}`}>
          <div className={styles.utilityMeta}>
            {navigation.showDate ? (
              <time dateTime={new Date().toISOString()}>
                {formatDate(new Date(), {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            ) : null}
            <span>{settings.edition} edition</span>
            <span>{navigation.language}</span>
          </div>
          <div className={styles.utilityLinks}>
            <Link href="/watch-live">
              <Video size={14} /> Watch live
            </Link>
            <Link href="/audio">
              <Headphones size={14} /> Listen
            </Link>
            <Link href="/search" aria-label="Search">
              <Search size={14} /> Search
            </Link>
            {navigation.showAccount ? (
              <span title="Reader accounts are not enabled in this release">
                <UserRound size={14} /> Account
              </span>
            ) : null}
          </div>
        </div>
      </div>
      <HeaderNavigation navigation={navigation} />
      <BreakingTicker items={breakingItems} />
    </header>
  );
}

