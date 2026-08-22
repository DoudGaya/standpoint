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
  duniya: {
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
  afirka: {
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
  siyasa: {
    title: { en: "Politics", ha: "Siyasa" },
    description: {
      en: "Institutions, elections, policy and public accountability.",
      ha: "Cibiyoyi, zaɓuka, manufofi da riƙon amana ga jama'a.",
    },
  },
  "global-politics": {
    title: { en: "Global Politics", ha: "Siyasar Duniya" },
    description: {
      en: "International diplomacy, statecraft and global governance.",
      ha: "Diflomasiyyar ƙasa da ƙasa, mulki da al'amuran siyasar duniya.",
    },
  },
  business: {
    title: { en: "Business", ha: "Kasuwanci" },
    description: {
      en: "Markets, companies, trade and the global economy.",
      ha: "Kasuwanni, kamfanoni, cinikayya da tattalin arzikin duniya.",
    },
  },
  kasuwanci: {
    title: { en: "Business", ha: "Kasuwanci" },
    description: {
      en: "Markets, companies, trade and the global economy.",
      ha: "Kasuwanni, kamfanoni, cinikayya da tattalin arzikin duniya.",
    },
  },
  kasuwanchi: {
    title: { en: "Business", ha: "Kasuwanci" },
    description: {
      en: "Markets, companies, trade and the global economy.",
      ha: "Kasuwanni, kamfanoni, cinikayya da tattalin arzikin duniya.",
    },
  },
  "finance-global": {
    title: { en: "Global Finance", ha: "Kudin Kasuwancin Duniya" },
    description: {
      en: "Global financial markets, banking and investments.",
      ha: "Kasuwannin kuɗi na duniya, bankuna da zuba jari.",
    },
  },
  technology: {
    title: { en: "Technology", ha: "Fasaha" },
    description: {
      en: "Technology, artificial intelligence and digital society.",
      ha: "Fasaha, basira ta na'ura mai kwakwalwa da al'ummar dijital.",
    },
  },
  fasaha: {
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
  sport: {
    title: { en: "Sport", ha: "Wasanni" },
    description: {
      en: "Global sport, competitions and athletes.",
      ha: "Wasannin duniya, gasar cin kofuna da 'yan wasa.",
    },
  },
  wasanni: {
    title: { en: "Sport", ha: "Wasanni" },
    description: {
      en: "Global sport, competitions and athletes.",
      ha: "Wasannin duniya, gasar cin kofuna da 'yan wasa.",
    },
  },
  nigeria: {
    title: { en: "Nigeria", ha: "Najeriya" },
    description: {
      en: "News, policy and governance from across Nigeria.",
      ha: "Labarai, manufofi da gudanarwa daga sassan Najeriya.",
    },
  },
  najeriya: {
    title: { en: "Nigeria", ha: "Najeriya" },
    description: {
      en: "News, policy and governance from across Nigeria.",
      ha: "Labarai, manufofi da gudanarwa daga sassan Najeriya.",
    },
  },
  "yakin-iran": {
    title: { en: "Iran Conflict", ha: "Yakin Iran" },
    description: {
      en: "Special reporting on the Middle East crisis and Iran.",
      ha: "Bari da rahotanni na musamman kan rikicin Gabas Tsakiya da Iran.",
    },
  },
  kano: {
    title: { en: "Kano Desk", ha: "Teburin Kano" },
    description: {
      en: "Local news and commercial reporting from Kano State.",
      ha: "Labaran gida da rahotannin kasuwanci daga Jihar Kano.",
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
  news: {
    title: { en: "News", ha: "Labarai" },
    description: {
      en: "Verified news reporting from GlobHub Media.",
      ha: "Ingantattun rahotannin labarai daga GlobHub Media.",
    },
  },
  labarai: {
    title: { en: "News", ha: "Labarai" },
    description: {
      en: "Verified news reporting from GlobHub Media.",
      ha: "Ingantattun rahotannin labarai daga GlobHub Media.",
    },
  },
  video: {
    title: { en: "Video", ha: "Bidiyo" },
    description: {
      en: "Video reporting, interviews and documentaries.",
      ha: "Rahotannin bidiyo, hira da fina-finan gaskiya.",
    },
  },
};

const titleTranslationPairs: Array<[string, string]> = [
  ["Africa", "Afirka"],
  ["Afrika", "Afirka"],
  ["Nigeria", "Najeriya"],
  ["Najeriya", "Najeriya"],
  ["World", "Duniya"],
  ["Duniya", "Duniya"],
  ["Politics", "Siyasa"],
  ["Siyasa", "Siyasa"],
  ["Global Politics", "Siyasar Duniya"],
  ["Business", "Kasuwanci"],
  ["Kasuwanci", "Kasuwanci"],
  ["Kasuwanchi", "Kasuwanci"],
  ["Global Finance", "Kudin Kasuwancin Duniya"],
  ["Finance Global", "Kudin Kasuwancin Duniya"],
  ["Technology", "Fasaha"],
  ["Fasaha", "Fasaha"],
  ["Climate", "Sauyin Yanayi"],
  ["Climate & Environment", "Sauyin Yanayi da Muhalli"],
  ["Culture", "Al'adu"],
  ["Culture & Arts", "Al'adu da Fasaha"],
  ["Sport", "Wasanni"],
  ["Sports", "Wasanni"],
  ["Wasanni", "Wasanni"],
  ["Iran Conflict", "Yakin Iran"],
  ["Yakin Iran", "Yakin Iran"],
  ["Kano", "Teburin Kano"],
  ["News", "Labarai"],
  ["Labarai", "Labarai"],
  ["Opinion", "Ra'ayoyi"],
  ["Video", "Bidiyo"],
];

export function localizeCategory(category: Category, locale = "en"): Category {
  const isHa = locale === "ha";
  const slugKey = category.slug.toLowerCase();
  const translation = categoryTranslations[slugKey];

  let title = category.title;
  let navigationLabel = category.navigationLabel || category.title;
  let description = category.description;

  if (isHa) {
    if (category.titleHa) {
      title = category.titleHa;
    } else if (category.navigationLabelHa) {
      title = category.navigationLabelHa;
    } else if (translation) {
      title = translation.title.ha;
    } else {
      const match = titleTranslationPairs.find(
        ([en, ha]) => en.toLowerCase() === category.title.toLowerCase() || ha.toLowerCase() === category.title.toLowerCase()
      );
      if (match) title = match[1];
    }

    navigationLabel = category.navigationLabelHa || title;
    description = category.descriptionHa || translation?.description.ha || category.description;
  } else {
    // English mode
    if (translation) {
      title = translation.title.en;
    } else {
      const match = titleTranslationPairs.find(
        ([en, ha]) => ha.toLowerCase() === category.title.toLowerCase() || en.toLowerCase() === category.title.toLowerCase()
      );
      if (match) title = match[0];
    }

    navigationLabel = category.navigationLabel || title;
    description = category.description || translation?.description.en || category.description;
  }

  const children = category.children?.map((child) => localizeCategory(child, locale));

  return {
    ...category,
    title,
    navigationLabel,
    description,
    children,
  };
}

import type { Story } from "@/lib/content/types";

const kickerTranslations: Record<string, { en: string; ha: string }> = {
  "global development": { en: "Global development", ha: "Cigaban Duniya" },
  trade: { en: "Trade", ha: "Kasuwanci" },
  "public health": { en: "Public health", ha: "Lafiyar Jama'a" },
  energy: { en: "Energy", ha: "Makamashi" },
  "ai policy": { en: "AI Policy", ha: "Fasahar Basira" },
  opinion: { en: "Opinion", ha: "Ra'ayi" },
  investigation: { en: "Investigation", ha: "Bincike Mai Zurfi" },
  "verified news": { en: "Verified news", ha: "Ingantaccen Labari" },
  developing: { en: "Developing", ha: "Sabon Bayani" },
  breaking: { en: "Breaking", ha: "Yanzu Yanzu" },
};

export function localizeStory(story: Story, locale = "en"): Story {
  if (!story) return story;
  const isHa = locale === "ha";
  const primaryCategory = localizeCategory(story.primaryCategory, locale);
  const secondaryCategories = story.secondaryCategories?.map((cat) => localizeCategory(cat, locale));

  let kicker = story.kicker;
  const kickerKey = (story.kicker || "").toLowerCase().trim();
  const kickerMatch = kickerTranslations[kickerKey];
  if (kickerMatch) {
    kicker = isHa ? kickerMatch.ha : kickerMatch.en;
  }

  return {
    ...story,
    kicker,
    primaryCategory,
    secondaryCategories,
  };
}
