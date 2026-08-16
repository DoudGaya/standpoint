import type { ReactNode } from "react";
import {
  getBreakingItems,
  getCategories,
  getNavigation,
  getNewsletters,
  getSiteSettings,
} from "@/lib/content/repository";
import { getCurrentLocale } from "@/lib/i18n/get-dictionary";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";

export default async function SiteLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [navigation, breakingItems, settings, categories, newsletters, locale] =
    await Promise.all([
      getNavigation(),
      getBreakingItems(),
      getSiteSettings(),
      getCategories(),
      getNewsletters(),
      getCurrentLocale(),
    ]);

  return (
    <>
      <SiteHeader
        navigation={navigation}
        breakingItems={breakingItems}
        settings={settings}
        locale={locale}
      />
      <main id="main-content">{children}</main>
      <SiteFooter
        categories={categories}
        newsletters={newsletters}
        settings={settings}
        locale={locale}
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


