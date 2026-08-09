import Link from "next/link";
import type {
  Category,
  Newsletter,
  SiteSettings,
} from "@/lib/content/types";
import { BrandMark } from "./BrandMark";
import styles from "./site-shell.module.css";

export function SiteFooter({
  categories = [],
  newsletters = [],
  settings,
}: {
  categories?: Category[];
  newsletters?: Newsletter[];
  settings?: SiteSettings;
}) {
  return (
    <footer className={`${styles.footer} no-print`}>
      <div className={`container ${styles.footerTop}`}>
        <div className={styles.footerBrand}>
          <BrandMark inverse />
          <p>{settings?.description}</p>
          <div className={styles.footerSocial}>
            {(settings?.socialLinks || []).map((link) => (
              <a href={link.url} key={link.label} rel="me">
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className={styles.footerColumn}>
          <h2>Sections</h2>
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
          <h2>More from GlobHub</h2>
          <Link href="/latest">Latest news</Link>
          <Link href="/video">Video</Link>
          <Link href="/podcasts">Podcasts</Link>
          <Link href="/live">Live coverage</Link>
          <Link href="/fact-check">Fact checks</Link>
          <Link href="/events">Events</Link>
          <Link href="/newsletters">Newsletters</Link>
          {(newsletters || []).slice(0, 1).map((item) => (
            <Link href={`/newsletters/${item.slug}`} key={item.id}>
              {item.name}
            </Link>
          ))}
        </div>
        <div className={styles.footerColumn}>
          <h2>About & policies</h2>
          <Link href="/about">About us</Link>
          <Link href="/team">Our newsroom</Link>
          <Link href="/editorial-policy">Editorial standards</Link>
          <Link href="/corrections">Corrections</Link>
          <Link href="/fact-checking-methodology">Fact-checking</Link>
          <Link href="/ownership">Ownership & funding</Link>
          <Link href="/accessibility">Accessibility</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
      <div className={styles.footerLegal}>
        <div className={`container ${styles.footerLegalInner}`}>
          <span>© {new Date().getUTCFullYear()} GlobHub Media</span>
          <div>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/cookies">Cookies</Link>
            <Link href="/rss.xml">RSS</Link>
          </div>
          <p>
            GlobHub Media is a fictional demonstration platform. Sample
            journalism and people are not real.
          </p>
        </div>
      </div>
    </footer>
  );
}

