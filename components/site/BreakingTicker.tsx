"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pause, Play } from "lucide-react";
import type { BreakingItem } from "@/lib/content/types";
import styles from "./site-shell.module.css";

export function BreakingTicker({ items }: { items: BreakingItem[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length < 2) return;
    const interval = window.setInterval(
      () => setIndex((current) => (current + 1) % items.length),
      8000
    );
    return () => window.clearInterval(interval);
  }, [items.length, paused]);

  if (items.length === 0) return null;
  const item = items[index] || items[0];

  return (
    <aside
      className={styles.breaking}
      aria-label="Breaking news"
      aria-live={paused ? "off" : "polite"}
    >
      <div className={`container ${styles.breakingInner}`}>
        <strong className={styles.breakingLabel}>{item.label}</strong>
        <Link href={item.href} className={styles.breakingHeadline}>
          {item.headline}
        </Link>
        {items.length > 1 ? (
          <>
            <span className={styles.breakingCount} aria-hidden="true">
              {index + 1}/{items.length}
            </span>
            <button
              type="button"
              className={styles.breakingControl}
              onClick={() => setPaused((value) => !value)}
              aria-label={paused ? "Resume breaking news rotation" : "Pause breaking news rotation"}
            >
              {paused ? <Play size={15} /> : <Pause size={15} />}
            </button>
          </>
        ) : null}
      </div>
    </aside>
  );
}

