import Link from "next/link";

export function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      href="/"
      className="brand-mark"
      aria-label="GlobHub Media home"
      data-inverse={inverse || undefined}
    >
      <span className="brand-mark__glob">Glob</span>
      <span className="brand-mark__hub">Hub</span>
      <span className="brand-mark__media">Media</span>
    </Link>
  );
}

