import Image from "next/image";
import type { EditorialImage as EditorialImageType } from "@/lib/content/types";
import { urlForImage } from "@/sanity/lib/image";
import styles from "./editorial.module.css";

type FlexibleImageSource =
  | EditorialImageType
  | {
      url?: string;
      asset?: unknown;
      alt?: string;
      caption?: string;
      credit?: string;
      blurDataURL?: string;
      width?: number;
      height?: number;
    };

export function EditorialImage({
  image,
  priority = false,
  sizes = "(max-width: 700px) 100vw, 50vw",
  className,
}: {
  image?: FlexibleImageSource | null;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  if (!image) return null;

  let imageUrl = image.url;
  if (!imageUrl && "asset" in image && image.asset) {
    try {
      imageUrl = urlForImage(image.asset as Parameters<typeof urlForImage>[0]).url();
    } catch {
      imageUrl = undefined;
    }
  }

  if (!imageUrl) return null;

  // Use explicit dimensions so images are always visible.
  // Fall back to a 16:10 landscape default if the image has no stored dimensions.
  const imgWidth = (image as EditorialImageType).width ?? 1600;
  const imgHeight = (image as EditorialImageType).height ?? 1000;

  return (
    <figure className={`${styles.imageFigure} ${className || ""}`}>
      <Image
        src={imageUrl}
        alt={image.alt || ""}
        width={imgWidth}
        height={imgHeight}
        sizes={sizes}
        priority={priority}
        placeholder={image.blurDataURL ? "blur" : "empty"}
        blurDataURL={image.blurDataURL}
        className={styles.image}
        style={{ width: "100%", height: "auto" }}
      />
    </figure>
  );
}

