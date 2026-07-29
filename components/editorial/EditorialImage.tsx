import Image from "next/image";
import type { EditorialImage as EditorialImageType } from "@/lib/content/types";
import styles from "./editorial.module.css";

export function EditorialImage({
  image,
  priority = false,
  sizes = "(max-width: 700px) 100vw, 50vw",
  className,
}: {
  image: EditorialImageType;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure className={`${styles.imageFigure} ${className || ""}`}>
      <Image
        src={image.url}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder={image.blurDataURL ? "blur" : "empty"}
        blurDataURL={image.blurDataURL}
        className={styles.image}
      />
    </figure>
  );
}

