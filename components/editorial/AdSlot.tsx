import Image from "next/image";
import { getActiveAdCampaign } from "@/lib/content/repository";
import styles from "./editorial.module.css";

function parseDimensions(sizeStr?: string): { width: number; height: number } | null {
  if (!sizeStr) return null;
  const match = sizeStr.match(/(\d+)\s*[\*xX×\s]\s*(\d+)/);
  if (match) {
    const width = parseInt(match[1], 10);
    const height = parseInt(match[2], 10);
    if (!isNaN(width) && width > 0 && !isNaN(height) && height > 0) {
      return { width, height };
    }
  }
  return null;
}

export async function AdSlot({
  placement,
  desktopSize = "970 × 250",
  mobileSize = "320 × 100",
}: {
  placement: string;
  desktopSize?: string;
  mobileSize?: string;
}) {
  const ad = await getActiveAdCampaign(placement);

  if (ad) {
    const matchedPlacement = ad.placements?.find(
      (p) =>
        p.key === placement ||
        p.location?.toLowerCase() === placement.toLowerCase() ||
        p.title?.toLowerCase() === placement.toLowerCase()
    ) || ad.placements?.[0];

    const targetDesktopStr = matchedPlacement?.desktopSize || desktopSize;
    const targetMobileStr = matchedPlacement?.mobileSize || mobileSize;

    const desktopDimensions = parseDimensions(targetDesktopStr);
    const mobileDimensions = parseDimensions(targetMobileStr);

    const desktopImg = ad.desktopCreative?.url ? ad.desktopCreative : ad.mobileCreative;
    const mobileImg = ad.mobileCreative?.url ? ad.mobileCreative : ad.desktopCreative;

    const desktopContainerStyle: React.CSSProperties = desktopDimensions
      ? {
          maxWidth: `${desktopDimensions.width}px`,
          maxHeight: `${desktopDimensions.height}px`,
          width: "100%",
          margin: "0 auto",
        }
      : { maxWidth: "100%", margin: "0 auto" };

    const mobileContainerStyle: React.CSSProperties = mobileDimensions
      ? {
          maxWidth: `${mobileDimensions.width}px`,
          maxHeight: `${mobileDimensions.height}px`,
          width: "100%",
          margin: "0 auto",
        }
      : { maxWidth: "100%", margin: "0 auto" };

    return (
      <aside
        className={`${styles.adSlot} ${styles.adSlotActive} no-print`}
        aria-label={`Advertisement: ${ad.title || placement}`}
        data-placement={placement}
      >
        <div className={styles.adHeader}>
          <span>Advertisement</span>
          {ad.advertiser?.name && (
            <span className={styles.advertiserName}>{ad.advertiser.name}</span>
          )}
        </div>
        <a
          href={ad.destinationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.adLink}
        >
          {desktopImg?.url && (
            <div className={styles.desktopCreative} style={desktopContainerStyle}>
              <Image
                src={desktopImg.url}
                alt={desktopImg.alt || ad.title || "Advertisement"}
                width={desktopDimensions?.width || desktopImg.width || 970}
                height={desktopDimensions?.height || desktopImg.height || 250}
                unoptimized
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  maxHeight: desktopDimensions?.height
                    ? `${desktopDimensions.height}px`
                    : "100%",
                  height: "auto",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </div>
          )}
          {mobileImg?.url && (
            <div className={styles.mobileCreative} style={mobileContainerStyle}>
              <Image
                src={mobileImg.url}
                alt={mobileImg.alt || ad.title || "Advertisement"}
                width={mobileDimensions?.width || mobileImg.width || 320}
                height={mobileDimensions?.height || mobileImg.height || 100}
                unoptimized
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  maxHeight: mobileDimensions?.height
                    ? `${mobileDimensions.height}px`
                    : "100%",
                  height: "auto",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </div>
          )}
          {!desktopImg?.url && !mobileImg?.url && (
            <div className={styles.adTextCreative} style={desktopContainerStyle}>
              <h4>{ad.title}</h4>
              {ad.advertiser?.name && <p>Sponsored by {ad.advertiser.name}</p>}
            </div>
          )}
        </a>
      </aside>
    );
  }

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



