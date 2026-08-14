import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import "./globals.css";
import { getSiteUrl } from "@/lib/site";
import { sanityEnv } from "@/sanity/env";
import { SanityLive } from "@/sanity/lib/live";

const manrope = localFont({
  src: "./fonts/manrope-latin.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "400 700",
});

const newsreader = localFont({
  src: "./fonts/newsreader-latin.woff2",
  variable: "--font-newsreader",
  display: "swap",
  weight: "400 700",
});


export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: "GlobHub Media - Global journalism with context",
    template: "%s | GlobHub Media",
  },
  description:
    "Independent global journalism for a connected world: verified news, analysis, investigations and ideas.",
  applicationName: "GlobHub Media",
  category: "news",
  creator: "GlobHub Media",
  publisher: "GlobHub Media",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "GlobHub Media",
    title: "GlobHub Media — Global journalism with context",
    description:
      "Independent global journalism for a connected world: verified news, analysis, investigations and ideas.",
    url: "/",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "GlobHub Media — Global journalism with context",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GlobHub Media — Global journalism with context",
    description:
      "Independent global journalism for a connected world: verified news, analysis, investigations and ideas.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#170c3a",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en" className={`${manrope.variable} ${newsreader.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        {sanityEnv.configured ? (
          <SanityLive
            includeDrafts={Boolean(isDraftMode && sanityEnv.readToken)}
          />
        ) : null}
        {isDraftMode && sanityEnv.configured ? <VisualEditing /> : null}
      </body>
    </html>
  );
}
