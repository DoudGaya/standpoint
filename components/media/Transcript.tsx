import type { Video } from "@/lib/content/types";
import styles from "./media.module.css";

export function Transcript({ items }: { items: NonNullable<Video["transcript"]> }) {
  return (
    <details className={styles.transcript}>
      <summary>Read transcript</summary>
      <ol>
        {items.map((item) => (
          <li key={`${item.time}-${item.text}`}>
            <time>{item.time}</time>
            <p>{item.text}</p>
          </li>
        ))}
      </ol>
    </details>
  );
}

