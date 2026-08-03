import Link from "next/link";

export function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      href="/"
      className="brand-mark flex items-center"
      aria-label="GlobHub Media home"
      data-inverse={inverse || undefined}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo.jpeg"
        alt="GlobHub Logo"
        className="brand-mark__logo"
        style={{
          height: "2.8rem",
          width: "2.8rem",
          objectFit: "cover",
          marginRight: "0.6rem",
          borderRadius: "50%",
          border: "2px solid #ffffff",
          display: "inline-block"
        }}
      />
      <span className="inline-flex items-baseline" style={{ transform: "translateY(2px)" }}>
        <span className="brand-mark__glob">Glob</span>
        <span className="brand-mark__hub">Hub</span>
        <span className="brand-mark__media">Media</span>
      </span>
    </Link>
  );
}

