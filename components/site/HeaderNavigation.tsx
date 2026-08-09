"use client";

import {
  ChevronDown,
  Globe2,
  Headphones,
  Menu,
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
}: {
  category: Category;
  onNavigate?: () => void;
}) {
  return (
    <div className={styles.megaMenu}>
      <div className={styles.megaIntro}>
        <span className="eyebrow">Explore</span>
        <h2>{category.title}</h2>
        <p>{category.description}</p>
        <Link href={categoryHref(category)} onClick={onNavigate}>
          View all {category.title}
        </Link>
      </div>
      <div className={styles.megaLinks}>
        <p className={styles.megaLabel}>Sections</p>
        {(category.children || []).map((child) => (
          <Link key={child.id} href={categoryHref(child)} onClick={onNavigate}>
            <span>{child.title}</span>
            <small>{child.description}</small>
          </Link>
        ))}
        {(category.children || []).length === 0 ? (
          <>
            <Link href={`${categoryHref(category)}?view=latest`} onClick={onNavigate}>
              <span>Latest</span>
              <small>Newest verified reporting</small>
            </Link>
            <Link href={`${categoryHref(category)}?view=analysis`} onClick={onNavigate}>
              <span>Analysis</span>
              <small>Context, drivers and implications</small>
            </Link>
            <Link href={`${categoryHref(category)}?view=features`} onClick={onNavigate}>
              <span>Features</span>
              <small>Reporting that goes deeper</small>
            </Link>
          </>
        ) : null}
      </div>
      <div className={styles.megaFeatured}>
        <span>From the desk</span>
        <strong>Independent reporting with local knowledge and global context.</strong>
        <small>Updated throughout the day</small>
      </div>
    </div>
  );
}

export function HeaderNavigation({ navigation }: { navigation: Navigation }) {
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
              <span>Search</span>
            </Link>
            {navigation.showLive ? (
              <Link href="/watch-live" className={styles.headerAction}>
                <span className={styles.liveDot} aria-hidden="true" />
                <span>Live</span>
              </Link>
            ) : null}
            {navigation.showNewsletter ? (
              <Link href="/newsletters" className="button button--cyan">
                Newsletters
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
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          <Link href="/opinion" className={styles.navLink}>
            Opinion
          </Link>
          <Link href="/video" className={styles.navLink}>
            Video
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
              <Search size={18} /> Search
            </Link>
            <Link href="/watch-live" onClick={() => setMobileOpen(false)}>
              <Video size={18} /> Watch live
            </Link>
            <Link href="/audio" onClick={() => setMobileOpen(false)}>
              <Headphones size={18} /> Listen
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
                          Latest {category.title}
                        </Link>
                        <Link
                          href={`${categoryHref(category)}?view=analysis`}
                          onClick={() => setMobileOpen(false)}
                        >
                          Analysis
                        </Link>
                      </div>
                    ) : null}
                  </div>
                );
              })}
          </nav>
          <div className={styles.mobileFooterLinks}>
            <Link href="/newsletters" onClick={() => setMobileOpen(false)}>
              Newsletters
            </Link>
            <Link href="/team" onClick={() => setMobileOpen(false)}>
              Our newsroom
            </Link>
            <span><Globe2 size={16} /> {navigation.edition} · {navigation.language}</span>
            {navigation.showAccount ? <span><UserRound size={16} /> Reader account coming later</span> : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

