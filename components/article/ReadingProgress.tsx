"use client";

import { useEffect, useState } from "react";
import styles from "./article.module.css";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const article = document.querySelector("[data-article-body]");
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const total = Math.max(article.clientHeight - window.innerHeight * 0.35, 1);
      const read = Math.min(Math.max(-rect.top + window.innerHeight * 0.18, 0), total);
      setProgress(Math.round((read / total) * 100));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className={`${styles.readingProgress} no-print`}
      role="progressbar"
      aria-label="Article reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    >
      <span style={{ width: `${progress}%` }} />
    </div>
  );
}

