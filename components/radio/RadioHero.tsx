import { AudioPlayer } from "./AudioPlayer";
import type { RadioBulletin } from "@/lib/content/types";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import styles from "./radio.module.css";

export function RadioHero({
  bulletin,
  dict,
}: {
  bulletin: RadioBulletin;
  dict: Dictionary;
}) {
  return (
    <div className={styles.heroCard}>
      <div className={styles.heroContent}>
        <div className={styles.heroBadge}>
          <span className={styles.pulsingDot} aria-hidden="true" />
          <span>{dict.radio.liveSignal}</span>
        </div>

        <h1 className={styles.heroTitle}>{dict.radio.title}</h1>
        <p className={styles.heroTagline}>{dict.radio.tagline}</p>

        {bulletin ? (
          <AudioPlayer bulletin={bulletin} dict={dict.radio} />
        ) : null}
      </div>
    </div>
  );
}
