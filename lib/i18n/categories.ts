import type { Category } from "@/lib/content/types";

export const categoryTranslations: Record<
  string,
  { title: { en: string; ha: string }; description: { en: string; ha: string } }
> = {
  world: {
    title: { en: "World", ha: "Duniya" },
    description: {
      en: "Global events, diplomacy and regional affairs.",
      ha: "Abubuwan da ke faruwa a duniya, diflomasiyya da al'amuran yankuna.",
    },
  },
  africa: {
    title: { en: "Africa", ha: "Afirka" },
    description: {
      en: "Reporting from across the African continent.",
      ha: "Bincike da rahotanni daga sassan nahiyar Afirka.",
    },
  },
  europe: {
    title: { en: "Europe", ha: "Turai" },
    description: {
      en: "Politics, society and business across Europe.",
      ha: "Siyasa, al'umma da kasuwanci a duk faɗin Turai.",
    },
  },
  politics: {
    title: { en: "Politics", ha: "Siyasa" },
    description: {
      en: "Institutions, elections, policy and public accountability.",
      ha: "Cibiyoyi, zaɓuka, manufofi da riƙon amana ga jama'a.",
    },
  },
  business: {
    title: { en: "Business", ha: "Kasuwanci" },
    description: {
      en: "Markets, companies, trade and the global economy.",
      ha: "Kasuwanni, kamfanoni, cinikayya da tattalin arzikin duniya.",
    },
  },
  technology: {
    title: { en: "Technology", ha: "Fasaha" },
    description: {
      en: "Technology, artificial intelligence and digital society.",
      ha: "Fasaha, basira ta na'ura mai kwakwalwa da al'ummar dijital.",
    },
  },
  climate: {
    title: { en: "Climate & Environment", ha: "Sauyin Yanayi da Muhalli" },
    description: {
      en: "Climate science, energy transitions and environmental policy.",
      ha: "Kimiyyar sauyin yanayi, sauya makamashi da manufofin muhalli.",
    },
  },
  culture: {
    title: { en: "Culture & Arts", ha: "Al'adu da Fasaha" },
    description: {
      en: "Arts, heritage, film, literature and ideas.",
      ha: "Fasahar hannu, tarihi, fina-finai, adabi da tunani.",
    },
  },
  opinion: {
    title: { en: "Opinion", ha: "Ra'ayoyi" },
    description: {
      en: "Analysis, perspective and public discourse.",
      ha: "Bincike, hangen nesa da zantukan jama'a.",
    },
  },
  investigations: {
    title: { en: "Investigations", ha: "Bincike Mai Zurfi" },
    description: {
      en: "In-depth, public-interest investigative journalism.",
      ha: "Aikin jarida mai zurfi don amfanin jama'a.",
    },
  },
};

export function localizeCategory(category: Category, locale = "en"): Category {
  const lang = locale === "ha" ? "ha" : "en";
  const slugKey = category.slug.toLowerCase();
  const translation = categoryTranslations[slugKey];

  const title = translation?.title[lang] || category.title;
  const description = translation?.description[lang] || category.description;
  const children = category.children?.map((child) => localizeCategory(child, locale));

  return {
    ...category,
    title,
    navigationLabel: title,
    description,
    children,
  };
}
