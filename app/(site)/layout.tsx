import type { ReactNode } from "react";
import {
  getBreakingItems,
  getCategories,
  getNavigation,
  getNewsletters,
  getSiteSettings,
} from "@/lib/content/repository";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";

export default async function SiteLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [navigation, breakingItems, settings, categories, newsletters] =
    await Promise.all([
      getNavigation(),
      getBreakingItems(),
      getSiteSettings(),
      getCategories(),
      getNewsletters(),
    ]);

  return (
    <>
      <SiteHeader
        navigation={navigation}
        breakingItems={breakingItems}
        settings={settings}
      />
      <main id="main-content">{children}</main>
      <SiteFooter
        categories={categories}
        newsletters={newsletters}
        settings={settings}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationJsonLd(), websiteJsonLd()]).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
    </>
  );
}

