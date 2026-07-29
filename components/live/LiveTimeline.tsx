"use client";

import { useState } from "react";
import type { LiveEntry } from "@/lib/content/types";
import { formatDateTime } from "@/lib/site";
import styles from "./live.module.css";

export function LiveTimeline({
  entries,
  status,
}: {
  entries: LiveEntry[];
  status: "scheduled" | "live" | "paused" | "ended" | "archived";
}) {
  const [order, setOrder] = useState<"newest" | "oldest">("newest");
  const sorted = [...entries].sort((a, b) =>
    order === "newest"
      ? b.timestamp.localeCompare(a.timestamp)
      : a.timestamp.localeCompare(b.timestamp)
  );

  return (
    <section aria-labelledby="live-updates-title">
      <div className={styles.timelineControls}>
        <div>
          <h2 id="live-updates-title">Live updates</h2>
          <span role="status">
            {status === "live"
              ? "Updates are live. New items will be announced without moving your reading position."
              : `Coverage is ${status}. Automatic updates are stopped.`}
          </span>
        </div>
        <label>
          Order
          <select
            value={order}
            onChange={(event) =>
              setOrder(event.target.value as "newest" | "oldest")
            }
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </label>
      </div>
      <ol className={styles.timeline}>
        {sorted.map((entry) => (
          <li
            key={entry.id}
            className={entry.pinned ? styles.pinnedEntry : undefined}
            data-importance={entry.importance}
          >
            <div className={styles.entryMeta}>
              <time dateTime={entry.timestamp}>{formatDateTime(entry.timestamp)}</time>
              {entry.pinned ? <strong>Pinned update</strong> : null}
            </div>
            {entry.headline ? <h3>{entry.headline}</h3> : null}
            <p>{entry.body}</p>
            <span>— {entry.author.name}, {entry.author.title}</span>
            {entry.correction ? (
              <aside><strong>Correction:</strong> {entry.correction}</aside>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}

