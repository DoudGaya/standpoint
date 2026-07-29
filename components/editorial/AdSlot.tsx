import styles from "./editorial.module.css";

export function AdSlot({
  placement,
  desktopSize = "970 × 250",
  mobileSize = "320 × 100",
}: {
  placement: string;
  desktopSize?: string;
  mobileSize?: string;
}) {
  return (
    <aside
      className={`${styles.adSlot} no-print`}
      aria-label={`Advertisement placement: ${placement}`}
      data-placement={placement}
    >
      <span>Advertisement</span>
      <p>Reserved placement</p>
      <small>
        <span className={styles.desktopOnly}>{desktopSize}</span>
        <span className={styles.mobileOnly}>{mobileSize}</span>
      </small>
    </aside>
  );
}

