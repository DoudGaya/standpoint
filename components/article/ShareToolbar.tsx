"use client";

import { Check, Copy, Mail, Share2 } from "lucide-react";
import { useState } from "react";
import styles from "./article.module.css";

const shareTargets = [
  {
    label: "X",
    href: (url: string, title: string) =>
      `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    label: "Facebook",
    href: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    label: "LinkedIn",
    href: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    label: "WhatsApp",
    href: (url: string, title: string) =>
      `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
  {
    label: "Telegram",
    href: (url: string, title: string) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
];

export function ShareToolbar({
  title,
  storyId,
}: {
  title: string;
  storyId: string;
}) {
  const [copied, setCopied] = useState(false);

  const currentUrl = () => window.location.href;

  async function nativeShare() {
    if (!navigator.share) return;
    await navigator.share({ title, url: currentUrl() });
  }

  async function copyLink() {
    await navigator.clipboard.writeText(currentUrl());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <aside
      className={`${styles.shareToolbar} no-print`}
      aria-label="Share this story"
      data-story-id={storyId}
    >
      <button type="button" onClick={nativeShare} className={styles.nativeShare}>
        <Share2 size={16} />
        <span>Share</span>
      </button>
      {shareTargets.map((target) => (
        <button
          type="button"
          key={target.label}
          onClick={() =>
            window.open(
              target.href(currentUrl(), title),
              "_blank",
              "noopener,noreferrer,width=720,height=560"
            )
          }
          aria-label={`Share on ${target.label}`}
          title={target.label}
        >
          {target.label.slice(0, 2)}
        </button>
      ))}
      <a
        href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(title)}`}
        aria-label="Share by email"
        title="Email"
      >
        <Mail size={16} />
      </a>
      <button type="button" onClick={copyLink} aria-label="Copy story link" title="Copy link">
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
      <span className={styles.shareStatus} role="status">
        {copied ? "Link copied" : ""}
      </span>
    </aside>
  );
}

