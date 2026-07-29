import Link from "next/link";
import styles from "./article.module.css";

export function CommentsPlaceholder({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;
  return (
    <section className={styles.comments} aria-labelledby="comments-title">
      <h2 id="comments-title">Join the conversation</h2>
      <p>
        Comments are prepared for a moderated third-party provider. They are not
        active until identity, reporting, moderation and privacy controls are
        configured.
      </p>
      <Link href="/community-guidelines">Read our community guidelines</Link>
    </section>
  );
}

