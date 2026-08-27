"use client";

import {
  ChevronDown,
  Headphones,
  Menu,
  Radio,
  Search,
  UserRound,
  Video,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Category, Navigation } from "@/lib/content/types";
import styles from "./site-shell.module.css";
import { BrandMark } from "./BrandMark";

function categoryHref(category: Category) {
  return category.parentSlug
    ? `/category/${category.parentSlug}/${category.slug}`
    : `/category/${category.slug}`;
}

function MegaMenu({
  category,
  onNavigate,
  locale = DEFAULT_LOCALE,
}: {
  category: Category;
  onNavigate?: () => void;
  locale?: Locale;
}) {
  const dict = getDictionary(locale);

  return (
    <div className={styles.megaMenu}>
      <div className={styles.megaIntro}>
        <span className="eyebrow">{dict.nav.explore}</span>
        <h2>{category.title}</h2>
        <p>{category.description}</p>
        <Link href={categoryHref(category)} onClick={onNavigate}>
          {dict.nav.viewAll} {category.title}
        </Link>
      </div>
      <div className={styles.megaLinks}>
        <p className={styles.megaLabel}>{dict.nav.sections}</p>
        {(category.children || []).map((child) => (
          <Link key={child.id} href={categoryHref(child)} onClick={onNavigate}>
            <span>{child.title}</span>
            <small>{child.description}</small>
          </Link>
        ))}
        {(category.children || []).length === 0 ? (
          <>
            <Link href={`${categoryHref(category)}?view=latest`} onClick={onNavigate}>
              <span>{dict.nav.latest}</span>
              <small>{dict.nav.latestNews}</small>
            </Link>
            <Link href={`${categoryHref(category)}?view=analysis`} onClick={onNavigate}>
              <span>{dict.nav.analysis}</span>
              <small>{dict.nav.analysisSubtitle}</small>
            </Link>
            <Link href={`${categoryHref(category)}?view=features`} onClick={onNavigate}>
              <span>{dict.nav.features}</span>
              <small>{dict.nav.featuresSubtitle}</small>
            </Link>
          </>
        ) : null}
      </div>
      <div className={styles.megaFeatured}>
        <span>{dict.nav.fromTheDesk}</span>
        <strong>{dict.nav.deskTagline}</strong>
        <small>{dict.nav.updatedThroughout}</small>
      </div>
    </div>
  );
}

import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function HeaderNavigation({
  navigation,
  locale = DEFAULT_LOCALE,
}: {
  navigation: Navigation;
  locale?: Locale;
}) {
  const dict = getDictionary(locale);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCategory, setMobileCategory] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenCategory(null);
        setMobileOpen(false);
      }
    };
    const closeOutside = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenCategory(null);
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("mousedown", closeOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("mousedown", closeOutside);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <div className={styles.brandRow}>
        <div className={`container ${styles.brandRowInner}`}>
          <button
            type="button"
            className={`${styles.iconButton} ${styles.mobileMenuButton}`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={23} />
          </button>
          <BrandMark inverse />
          <div className={styles.brandActions}>
            <Link href="/search" className={styles.headerAction}>
              <Search size={18} />
              <span>{dict.header.search}</span>
            </Link>
            {navigation.showLive ? (
              <Link href="/watch-live" className={styles.headerAction}>
                <span className={styles.liveDot} aria-hidden="true" />
                <span>{dict.header.watchLive}</span>
              </Link>
            ) : null}
            {navigation.showNewsletter ? (
              <Link href="/newsletters" className="button button--cyan">
                {dict.header.newsletters}
              </Link>
            ) : null}
          </div>
        </div>
      </div>

      <nav className={styles.primaryNav} aria-label="Primary" ref={navRef}>
        <div className={`container ${styles.primaryNavInner}`}>
          {(navigation?.categories || [])
            .filter((category) => category.showInNavigation !== false)
            .map((category) => {
              const isOpen = openCategory === category.slug;
              return (
                <div className={styles.navItem} key={category.id}>
                  {category.megaMenu || category.children?.length ? (
                    <button
                      type="button"
                      className={styles.navButton}
                      aria-expanded={isOpen}
                      aria-controls={`mega-${category.slug}`}
                      onClick={() =>
                        setOpenCategory((current) =>
                          current === category.slug ? null : category.slug
                        )
                      }
                    >
                      {category.navigationLabel || category.title}
                      <ChevronDown
                        size={14}
                        className={isOpen ? styles.chevronOpen : undefined}
                      />
                    </button>
                  ) : (
                    <Link href={categoryHref(category)} className={styles.navLink}>
                      {category.navigationLabel || category.title}
                    </Link>
                  )}
                  {isOpen ? (
                    <div id={`mega-${category.slug}`} className={styles.megaPanel}>
                      <div className="container">
                        <MegaMenu
                          category={category}
                          onNavigate={() => setOpenCategory(null)}
                          locale={locale}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          <Link href="/opinion" className={styles.navLink}>
            {dict.nav.opinion}
          </Link>
          <Link href="/video" className={styles.navLink}>
            {dict.nav.video}
          </Link>
        </div>
      </nav>

      {mobileOpen ? (
        <div className={styles.mobileOverlay} role="dialog" aria-modal="true" aria-label="Site navigation">
          <div className={styles.mobileTop}>
            <BrandMark inverse />
            <button
              type="button"
              className={styles.iconButton}
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
              autoFocus
            >
              <X size={25} />
            </button>
          </div>
          <div className={styles.mobileQuick}>
            <Link href="/search" onClick={() => setMobileOpen(false)}>
              <Search size={18} /> {dict.header.search}
            </Link>
            <Link href="/watch-live" onClick={() => setMobileOpen(false)}>
              <Video size={18} /> {dict.header.watchLive}
            </Link>
            <Link href="/radio" onClick={() => setMobileOpen(false)}>
              <Radio size={18} /> {dict.radio.title}
            </Link>
          </div>
          <nav className={styles.mobileNav} aria-label="Mobile primary">
            {(navigation?.categories || [])
              .filter((category) => category.showInNavigation !== false)
              .map((category) => {
                const expanded = mobileCategory === category.slug;
                return (
                  <div className={styles.mobileNavGroup} key={category.id}>
                    <div>
                      <Link
                        href={categoryHref(category)}
                        onClick={() => setMobileOpen(false)}
                      >
                        {category.navigationLabel || category.title}
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          setMobileCategory((current) =>
                            current === category.slug ? null : category.slug
                          )
                        }
                        aria-expanded={expanded}
                        aria-label={`${expanded ? "Collapse" : "Expand"} ${category.title} sections`}
                      >
                        <ChevronDown
                          size={18}
                          className={expanded ? styles.chevronOpen : undefined}
                        />
                      </button>
                    </div>
                    {expanded ? (
                      <div className={styles.mobileSubnav}>
                        {(category.children || []).map((child) => (
                          <Link
                            href={categoryHref(child)}
                            key={child.id}
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.title}
                          </Link>
                        ))}
                        <Link
                          href={`${categoryHref(category)}?view=latest`}
                          onClick={() => setMobileOpen(false)}
                        >
                          {dict.nav.latest} {category.title}
                        </Link>
                        <Link
                          href={`${categoryHref(category)}?view=analysis`}
                          onClick={() => setMobileOpen(false)}
                        >
                          {dict.nav.analysis}
                        </Link>
                      </div>
                    ) : null}
                  </div>
                );
              })}
          </nav>
          <div className={styles.mobileFooterLinks}>
            <Link href="/newsletters" onClick={() => setMobileOpen(false)}>
              {dict.header.newsletters}
            </Link>
            <Link href="/team" onClick={() => setMobileOpen(false)}>
              {dict.nav.ourNewsroom}
            </Link>
            <LanguageSwitcher currentLocale={locale} />
            {navigation.showAccount ? <span><UserRound size={16} /> {dict.nav.readerAccountLater}</span> : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

