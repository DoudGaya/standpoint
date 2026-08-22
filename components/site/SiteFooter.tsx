import Link from "next/link";
import type {
  Category,
  Newsletter,
  SiteSettings,
} from "@/lib/content/types";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { BrandMark } from "./BrandMark";
import styles from "./site-shell.module.css";

export function SiteFooter({
  categories = [],
  newsletters = [],
  settings,
  locale = DEFAULT_LOCALE,
}: {
  categories?: Category[];
  newsletters?: Newsletter[];
  settings?: SiteSettings;
  locale?: Locale;
}) {
  const dict = getDictionary(locale);

  return (
    <footer className={`${styles.footer} no-print`}>
      <div className={`container ${styles.footerTop}`}>
        <div className={styles.footerBrand}>
          <BrandMark inverse />
          <p>{dict.footer.about}</p>
          <div className={styles.footerSocial}>
            {(settings?.socialLinks || []).map((link) => (
              <a href={link.url} key={link.label} rel="me">
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className={styles.footerColumn}>
          <h2>{dict.footer.sections}</h2>
          {(categories || [])
            .filter((category) => category.showInFooter !== false)
            .slice(0, 8)
            .map((category) => (
              <Link href={`/category/${category.slug}`} key={category.id}>
                {category.title}
              </Link>
            ))}
        </div>
        <div className={styles.footerColumn}>
          <h2>{dict.footer.moreFrom}</h2>
          <Link href="/latest">{dict.nav.latest}</Link>
          <Link href="/video">{dict.nav.video}</Link>
          <Link href="/podcasts">{dict.nav.podcasts}</Link>
          <Link href="/live">{dict.home.liveCoverage}</Link>
          <Link href="/fact-check">{dict.home.factCheck}</Link>
          <Link href="/newsletters">{dict.header.newsletters}</Link>
          {(newsletters || []).slice(0, 1).map((item) => (
            <Link href={`/newsletters/${item.slug}`} key={item.id}>
              {item.name}
            </Link>
          ))}
        </div>
        <div className={styles.footerColumn}>
          <h2>{dict.footer.aboutAndPolicies}</h2>
          <Link href="/about">{dict.home.whyGlobhub}</Link>
          <Link href="/team">{dict.nav.ourNewsroom}</Link>
          <Link href="/editorial-policy">{dict.home.editorialStandards}</Link>
          <Link href="/corrections">{dict.footer.corrections}</Link>
          <Link href="/accessibility">{dict.footer.accessibility}</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
      <div className={styles.footerLegal}>
        <div className={`container ${styles.footerLegalInner}`}>
          <span>© {new Date().getUTCFullYear()} GlobHub Media · {dict.footer.rights}</span>
          <div>
            <Link href="/privacy">{dict.footer.privacy}</Link>
            <Link href="/terms">{dict.footer.terms}</Link>
            <Link href="/cookies">{dict.footer.cookies}</Link>
            <Link href="/rss.xml">RSS</Link>
          </div>
          <p>
            {dict.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}

