"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import styles from "./search.module.css";

const STORAGE_KEY = "globhub:recent-searches";
const CHANGE_EVENT = "globhub:recent-searches-change";

function parseRecent(value: string | null) {
  try {
    const items = value ? (JSON.parse(value) as unknown) : [];
    return Array.isArray(items)
      ? items
          .filter((item): item is string => typeof item === "string")
          .slice(0, 6)
      : [];
  } catch {
    return [];
  }
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) || "[]";
}

export function RecentSearches({ currentQuery }: { currentQuery?: string }) {
  const serialized = useSyncExternalStore(subscribe, getSnapshot, () => "[]");
  const recent = parseRecent(serialized);

  useEffect(() => {
    const valid = parseRecent(window.localStorage.getItem(STORAGE_KEY));

    if (currentQuery && currentQuery.trim().length >= 2) {
      const next = [
        currentQuery.trim(),
        ...valid.filter(
          (item) => item.toLocaleLowerCase() !== currentQuery.trim().toLocaleLowerCase()
        ),
      ].slice(0, 6);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event(CHANGE_EVENT));
    }
  }, [currentQuery]);

  if (!recent.length) return null;
  return (
    <aside className={styles.recentSearches}>
      <div>
        <strong>Recent searches</strong>
        <button
          type="button"
          onClick={() => {
            window.localStorage.removeItem(STORAGE_KEY);
            window.dispatchEvent(new Event(CHANGE_EVENT));
          }}
        >
          Clear
        </button>
      </div>
      <ul>
        {recent.map((item) => (
          <li key={item}>
            <Link href={`/search?q=${encodeURIComponent(item)}`}>{item}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
