import type {
  BreakingItem,
  Category,
  EventRecord,
  FactCheck,
  HomepageModule,
  LiveEvent,
  Navigation,
  Newsletter,
  Person,
  PodcastEpisode,
  PodcastShow,
  SiteSettings,
  Story,
  Video,
} from "./types";

const image = (
  path: string,
  alt: string,
  caption?: string,
  credit = "Unsplash / development media"
) => ({
  url: path,
  alt,
  caption,
  credit,
  width: 1600,
  height: 1000,
});

export const categories: Category[] = [
  {
    id: "cat-world",
    title: "World",
    slug: "world",
    description: "Global events, diplomacy and regional affairs.",
    accent: "#006b82",
    order: 1,
    featured: true,
    showInNavigation: true,
    showInFooter: true,
    megaMenu: true,
    children: [
      {
        id: "cat-africa",
        title: "Africa",
        slug: "africa",
        parentSlug: "world",
        description: "Reporting from across the African continent.",
        accent: "#8a4b08",
        order: 1,
        showInNavigation: true,
        showInFooter: true,
      },
      {
        id: "cat-europe",
        title: "Europe",
        slug: "europe",
        parentSlug: "world",
        description: "Politics, society and business across Europe.",
        accent: "#2e5ea6",
        order: 2,
        showInNavigation: true,
        showInFooter: true,
      },
    ],
  },
  {
    id: "cat-politics",
    title: "Politics",
    slug: "politics",
    description: "Institutions, elections, policy and public accountability.",
    accent: "#8f1838",
    order: 2,
    featured: true,
    showInNavigation: true,
    showInFooter: true,
    megaMenu: true,
  },
  {
    id: "cat-business",
    title: "Business",
    slug: "business",
    description: "Markets, companies, trade and the global economy.",
    accent: "#72520b",
    order: 3,
    featured: true,
    showInNavigation: true,
    showInFooter: true,
    megaMenu: true,
  },
  {
    id: "cat-technology",
    title: "Technology",
    slug: "technology",
    description: "Technology, artificial intelligence and digital society.",
    accent: "#4c3b9d",
    order: 4,
    showInNavigation: true,
    showInFooter: true,
  },
  {
    id: "cat-climate",
    title: "Climate",
    slug: "climate",
    description: "Climate science, environment, energy and resilience.",
    accent: "#24724e",
    order: 5,
    showInNavigation: true,
    showInFooter: true,
  },
  {
    id: "cat-culture",
    title: "Culture",
    slug: "culture",
    description: "Arts, ideas, media and the forces shaping public life.",
    accent: "#a33d65",
    order: 6,
    showInNavigation: true,
    showInFooter: true,
  },
  {
    id: "cat-sport",
    title: "Sport",
    slug: "sport",
    description: "Global sport, people and performance.",
    accent: "#1b6d3b",
    order: 7,
    showInNavigation: true,
    showInFooter: true,
  },
  {
    id: "cat-science-health",
    title: "Science & Health",
    navigationLabel: "Science",
    slug: "science-health",
    description: "Research, public health and scientific discovery.",
    accent: "#17677d",
    order: 8,
    showInNavigation: true,
    showInFooter: true,
  },
];

const category = (slug: string) => {
  for (const item of categories) {
    if (item.slug === slug) return item;
    const child = item.children?.find((candidate) => candidate.slug === slug);
    if (child) return child;
  }
  return categories[0];
};

export const people: Person[] = [
  {
    id: "person-amara-okafor",
    name: "Amara Okafor",
    slug: "amara-okafor",
    title: "Global Affairs Editor",
    roles: ["Editor", "Correspondent"],
    shortBio:
      "Amara leads GlobHub's international desk and reports on diplomacy, migration and regional cooperation.",
    biography:
      "Amara Okafor is a fictional editor created for the GlobHub Media demonstration. Her reporting interests include multilateral institutions, cities and regional trade.",
    image: image("/images/people/amara-okafor.jpg", "Portrait of Amara Okafor"),
    location: "Lagos",
    expertise: ["Diplomacy", "Migration", "Regional affairs"],
    languages: ["English", "Igbo", "French"],
    featured: true,
    active: true,
    publicProfile: true,
    department: "World",
  },
  {
    id: "person-daniel-mensah",
    name: "Daniel Mensah",
    slug: "daniel-mensah",
    title: "Economics Correspondent",
    roles: ["Reporter", "Analyst"],
    shortBio:
      "Daniel covers trade, monetary policy and the businesses reshaping emerging markets.",
    image: image("/images/people/daniel-mensah.jpg", "Portrait of Daniel Mensah"),
    location: "Accra",
    expertise: ["Trade", "Markets", "Public finance"],
    featured: true,
    active: true,
    publicProfile: true,
    department: "Business",
  },
  {
    id: "person-leila-hassan",
    name: "Leila Hassan",
    slug: "leila-hassan",
    title: "Climate & Science Editor",
    roles: ["Editor", "Fact checker"],
    shortBio:
      "Leila edits climate, environment and public-health coverage with an emphasis on evidence and accountability.",
    image: image("/images/people/leila-hassan.jpg", "Portrait of Leila Hassan"),
    location: "Nairobi",
    expertise: ["Climate science", "Public health", "Data journalism"],
    featured: true,
    active: true,
    publicProfile: true,
    department: "Science & Health",
  },
  {
    id: "person-noah-adebayo",
    name: "Noah Adebayo",
    slug: "noah-adebayo",
    title: "Visual Investigations Producer",
    roles: ["Producer", "Videographer"],
    shortBio:
      "Noah produces visual investigations, documentaries and live multimedia coverage.",
    image: image("/images/people/noah-adebayo.jpg", "Portrait of Noah Adebayo"),
    location: "London",
    expertise: ["Open-source reporting", "Documentary", "Video"],
    active: true,
    publicProfile: true,
    department: "Multimedia",
  },
];

const amara = people[0];
const daniel = people[1];
const leila = people[2];
const noah = people[3];

const paragraph = (key: string, text: string) => ({
  _key: key,
  _type: "block" as const,
  style: "normal" as const,
  children: [{ _key: `${key}-span`, _type: "span" as const, text }],
});

const heading = (key: string, text: string) => ({
  _key: key,
  _type: "block" as const,
  style: "h2" as const,
  children: [{ _key: `${key}-span`, _type: "span" as const, text }],
});

export const stories: Story[] = [
  {
    id: "story-cities-climate-pact",
    headline:
      "Coastal cities forge a new pact to finance climate resilience",
    shortHeadline: "Coastal cities unite on climate finance",
    mobileHeadline: "Cities form climate finance pact",
    slug: "coastal-cities-climate-resilience-pact",
    standfirst:
      "A coalition of 18 cities is pooling procurement, data and credit guarantees in a bid to move adaptation projects from plans to construction.",
    deck:
      "The agreement could become a test of whether city-to-city cooperation can unlock projects national funding has overlooked.",
    kicker: "Global development",
    type: "news",
    primaryCategory: category("world"),
    secondaryCategories: [category("climate"), category("business")],
    tags: ["cities", "resilience", "finance"],
    topics: ["Climate adaptation", "Urban development"],
    locations: ["West Africa", "Indian Ocean"],
    language: "en",
    edition: "Global",
    authors: [amara, leila],
    publishedAt: "2026-07-28T08:15:00.000Z",
    updatedAt: "2026-07-28T10:42:00.000Z",
    readingTime: 7,
    hero: image(
      "/images/stories/coastal-city.jpg",
      "A coastal city and lagoon seen in the early morning",
      "Participating cities say pooled procurement could lower the cost of flood defences and cooling infrastructure.",
      "Unsplash / development media"
    ),
    body: [
      paragraph(
        "p1",
        "City leaders from Africa, Asia and South America have agreed to share project designs and combine purchasing power for flood barriers, cooling corridors and early-warning systems. The pact is designed to help projects that are too small for conventional infrastructure funds but too urgent to wait."
      ),
      paragraph(
        "p2",
        "Under the voluntary framework, participating cities will publish comparable risk data and use a common process for assessing contractors. A regional development bank will provide partial guarantees for the first group of projects."
      ),
      {
        _key: "facts",
        _type: "factBox",
        title: "What the pact covers",
        items: [
          "Shared engineering and procurement standards",
          "A project preparation fund for smaller cities",
          "Public reporting on cost, delivery and climate outcomes",
        ],
      },
      heading("h1", "Why local finance matters"),
      paragraph(
        "p3",
        "Adaptation funding has often been concentrated in national programmes, while local authorities carry responsibility for drainage, transport and public space. The coalition argues that a shared pipeline can reduce duplicated planning and give investors a clearer view of delivery risk."
      ),
      {
        _key: "quote",
        _type: "pullQuote",
        quote:
          "The real test is not the announcement. It is whether the first neighbourhood-level projects reach construction before the next rainy season.",
        attribution: "Amara Okafor, GlobHub Media",
      },
      heading("h2", "What happens next"),
      paragraph(
        "p4",
        "Technical teams will publish the first procurement catalogue in September. GlobHub Media will track the initial projects, their financing terms and whether participating cities disclose outcomes in a form residents can scrutinise."
      ),
      {
        _key: "sources",
        _type: "sourceNote",
        title: "Reporting sources",
        sources: [
          { label: "Coalition framework (fictional)", url: "https://example.org/framework" },
          { label: "Project finance note (fictional)", url: "https://example.org/finance" },
        ],
      },
    ],
    relatedStorySlugs: [
      "coastal-cities-climate-resilience-pact-ha",
      "inside-the-race-to-map-urban-heat",
      "new-trade-corridor-small-exporters",
    ],
    featured: true,
    homepageEligible: true,
    trendingEligible: true,
    breakingEligible: true,
    priority: 100,
    workflowStatus: "updated",
    seoTitle: "Coastal cities create joint climate resilience finance pact",
    seoDescription:
      "Eighteen coastal cities will pool data, procurement and credit guarantees to accelerate climate adaptation projects.",
    searchKeywords: ["adaptation finance", "urban resilience", "cities"],
    commentsEnabled: true,
    accessStatus: "free",
  },
  {
    id: "story-trade-corridor",
    headline:
      "New trade corridor promises faster borders — small exporters want proof",
    shortHeadline: "Small exporters test a faster trade corridor",
    slug: "new-trade-corridor-small-exporters",
    standfirst:
      "Digital customs documents cut one pilot journey by six hours, but businesses say predictable fees matter as much as speed.",
    kicker: "Trade",
    type: "analysis",
    primaryCategory: category("business"),
    secondaryCategories: [category("africa")],
    tags: ["trade", "logistics", "small business"],
    topics: ["Regional trade"],
    language: "en",
    edition: "Africa",
    authors: [daniel],
    publishedAt: "2026-07-28T06:30:00.000Z",
    readingTime: 6,
    hero: image(
      "/images/stories/trade-corridor.jpg",
      "Freight trucks moving through an inland logistics terminal"
    ),
    body: [
      paragraph(
        "trade-p1",
        "A digital border pilot has reduced paperwork for selected freight companies, but smaller exporters say the programme will only count as a success if informal charges and unpredictable inspections fall as well."
      ),
      heading("trade-h1", "A faster form, not yet a faster system"),
      paragraph(
        "trade-p2",
        "The first data shows shorter processing times at two crossings. It does not yet capture delays away from the border or the cost of complying with different standards along the route."
      ),
    ],
    relatedStorySlugs: ["coastal-cities-climate-resilience-pact"],
    featured: true,
    homepageEligible: true,
    trendingEligible: true,
    priority: 82,
    workflowStatus: "published",
    commentsEnabled: true,
    accessStatus: "free",
  },
  {
    id: "story-urban-heat",
    headline: "Inside the race to map urban heat, one street at a time",
    shortHeadline: "Mapping the heat hidden between city blocks",
    slug: "inside-the-race-to-map-urban-heat",
    standfirst:
      "Low-cost sensors are revealing temperature gaps that citywide averages conceal — and changing where trees and clinics are placed.",
    kicker: "Field report",
    type: "feature",
    primaryCategory: category("climate"),
    secondaryCategories: [category("science-health")],
    tags: ["heat", "cities", "data"],
    topics: ["Climate adaptation", "Public health"],
    language: "en",
    edition: "Global",
    authors: [leila],
    contributors: [{ person: noah, role: "Visual investigation" }],
    publishedAt: "2026-07-27T15:10:00.000Z",
    readingTime: 9,
    hero: image(
      "/images/stories/urban-heat.jpg",
      "A researcher carrying a temperature sensor through a shaded street"
    ),
    body: [
      paragraph(
        "heat-p1",
        "At noon, the difference between two streets less than a kilometre apart can exceed five degrees. Researchers are combining mobile sensors with satellite data to understand why."
      ),
      {
        _key: "heat-quote",
        _type: "pullQuote",
        quote:
          "A city average is useful for a forecast. It is not enough to decide where a shaded bus stop is most urgently needed.",
        attribution: "Leila Hassan",
      },
      paragraph(
        "heat-p2",
        "The maps are now being used to prioritise school retrofits, clinic opening hours and tree planting. Researchers caution that sensors need maintenance and community consent."
      ),
    ],
    relatedStorySlugs: ["coastal-cities-climate-resilience-pact"],
    featured: true,
    homepageEligible: true,
    trendingEligible: true,
    priority: 78,
    workflowStatus: "published",
    commentsEnabled: true,
    accessStatus: "free",
  },
  {
    id: "story-ai-public-records",
    headline:
      "Public agencies are buying AI systems faster than oversight can follow",
    shortHeadline: "AI procurement outpaces public oversight",
    slug: "public-agencies-ai-procurement-oversight",
    standfirst:
      "GlobHub reviewed 42 procurement notices and found inconsistent disclosure of training data, appeals and human review.",
    kicker: "Investigation",
    type: "investigation",
    primaryCategory: category("technology"),
    secondaryCategories: [category("politics")],
    tags: ["AI", "procurement", "accountability"],
    topics: ["Artificial intelligence", "Public services"],
    language: "en",
    edition: "Global",
    authors: [amara],
    contributors: [
      { person: leila, role: "Data review" },
      { person: noah, role: "Visual production" },
    ],
    publishedAt: "2026-07-27T10:00:00.000Z",
    readingTime: 12,
    hero: image(
      "/images/stories/ai-procurement.jpg",
      "Rows of documents beside a computer terminal in a public office"
    ),
    body: [
      paragraph(
        "ai-p1",
        "Procurement documents across five jurisdictions describe automated systems for benefits, hiring and fraud detection, but only a minority identify an appeals process or publish performance data."
      ),
      heading("ai-h1", "What the documents show"),
      paragraph(
        "ai-p2",
        "The review found that agencies often bought broad software categories before completing impact assessments. Several notices treated model updates as routine maintenance, even when those updates could change eligibility decisions."
      ),
    ],
    relatedStorySlugs: ["fact-check-viral-energy-grid-claim"],
    featured: true,
    homepageEligible: true,
    trendingEligible: true,
    priority: 76,
    workflowStatus: "published",
    editorsNote:
      "The procurement sample and methodology are available in the source note.",
    commentsEnabled: false,
    accessStatus: "free",
  },
  {
    id: "story-democracy-local-news",
    headline: "Opinion: Strong democracies need reporting close to home",
    shortHeadline: "Why local reporting is democratic infrastructure",
    slug: "opinion-local-reporting-democratic-infrastructure",
    standfirst:
      "National headlines set the mood. Local reporting shows people how decisions actually reach their street, school and hospital.",
    kicker: "Opinion",
    type: "opinion",
    primaryCategory: category("politics"),
    tags: ["media", "democracy", "local news"],
    topics: ["Media sustainability"],
    language: "en",
    edition: "Global",
    authors: [amara],
    publishedAt: "2026-07-26T12:00:00.000Z",
    readingTime: 5,
    hero: image(
      "/images/stories/local-newsroom.jpg",
      "A community reporter interviewing residents at an outdoor market"
    ),
    body: [
      paragraph(
        "op-p1",
        "The democratic value of local news is practical: it creates a shared record of decisions that would otherwise pass without scrutiny."
      ),
      paragraph(
        "op-p2",
        "Support for local reporting must protect editorial independence and make room for new membership, nonprofit and cooperative models."
      ),
    ],
    featured: true,
    homepageEligible: true,
    trendingEligible: false,
    priority: 65,
    workflowStatus: "published",
    disclosure: "This article represents the author's analysis.",
    commentsEnabled: true,
    accessStatus: "free",
  },
  {
    id: "story-solar-cold-chain",
    headline: "The solar cold chain bringing fresher medicine to remote clinics",
    shortHeadline: "Solar cold storage reaches remote clinics",
    slug: "solar-cold-chain-remote-clinics",
    standfirst:
      "Modular refrigeration and shared maintenance teams are reducing vaccine spoilage across a difficult last mile.",
    kicker: "Solutions",
    type: "explainer",
    primaryCategory: category("science-health"),
    secondaryCategories: [category("technology")],
    tags: ["health", "energy", "logistics"],
    topics: ["Public health", "Clean energy"],
    language: "en",
    edition: "Africa",
    authors: [leila],
    publishedAt: "2026-07-25T09:00:00.000Z",
    readingTime: 6,
    hero: image(
      "/images/stories/solar-clinic.jpg",
      "Solar panels on the roof of a small rural health clinic"
    ),
    body: [
      paragraph(
        "solar-p1",
        "Solar refrigerators are not new. The shift is in maintenance: regional teams now track temperature alerts and carry interchangeable parts across several clinic networks."
      ),
      heading("solar-h1", "The remaining constraints"),
      paragraph(
        "solar-p2",
        "Reliable transport, trained technicians and transparent procurement remain as important as the panels themselves."
      ),
    ],
    homepageEligible: true,
    trendingEligible: true,
    priority: 61,
    workflowStatus: "published",
    commentsEnabled: true,
    accessStatus: "free",
  },
  {
    id: "story-elections-young-voters",
    headline: "Five questions young voters are asking before city elections",
    shortHeadline: "Young voters put city services first",
    slug: "young-voters-city-elections-five-questions",
    standfirst:
      "Transport, rent and public safety dominate conversations in three closely watched municipal races.",
    kicker: "Elections",
    type: "news",
    primaryCategory: category("politics"),
    tags: ["elections", "cities", "young voters"],
    topics: ["Elections"],
    language: "en",
    edition: "Global",
    authors: [amara],
    publishedAt: "2026-07-25T06:00:00.000Z",
    readingTime: 4,
    hero: image(
      "/images/stories/election-queue.jpg",
      "Young adults waiting to enter a community election forum"
    ),
    body: [
      paragraph(
        "vote-p1",
        "Voters at community forums repeatedly returned to the cost and reliability of everyday services rather than national party disputes."
      ),
    ],
    homepageEligible: true,
    trendingEligible: true,
    priority: 58,
    workflowStatus: "published",
    commentsEnabled: true,
    accessStatus: "free",
  },
  {
    id: "story-film-archives",
    headline: "A new generation is restoring films once thought lost",
    shortHeadline: "Restoring the films a generation nearly lost",
    slug: "new-generation-restoring-lost-films",
    standfirst:
      "Archivists are pairing fragile reels with oral histories to rebuild a richer record of post-independence cinema.",
    kicker: "Culture",
    type: "feature",
    primaryCategory: category("culture"),
    tags: ["film", "archives", "history"],
    topics: ["Cultural heritage"],
    language: "en",
    edition: "Africa",
    authors: [noah],
    publishedAt: "2026-07-24T16:00:00.000Z",
    readingTime: 8,
    hero: image(
      "/images/stories/film-archive.jpg",
      "An archivist examining film reels on a light table"
    ),
    body: [
      paragraph(
        "film-p1",
        "For every reel restored, archivists are recording the memories of actors, projectionists and audiences who can explain what the surviving frames no longer show."
      ),
    ],
    homepageEligible: true,
    trendingEligible: false,
    priority: 52,
    workflowStatus: "published",
    commentsEnabled: true,
    accessStatus: "free",
  },
  {
    id: "story-cities-climate-pact-ha",
    headline:
      "Biranen bakin teku sun kulla sabuwar yarjejeniya kan kudaden jure sauyin yanayi",
    shortHeadline: "Biranen bakin teku sun haɗa kai kan kuɗaɗen sauyin yanayi",
    mobileHeadline: "Biranen bakin teku a haɗa kai",
    slug: "coastal-cities-climate-resilience-pact-ha",
    standfirst:
      "Ƙungiyar birane 18 tana haɗa sayayya, bayanai da garantin bashi domin maido da ayyukan jure sauyin yanayi daga tsare-tsare zuwa gini.",
    deck:
      "Yarjejeniyar za ta iya zama gwaji na ko haɗin kan birni zuwa birni zai iya buɗe ayyukan da kuɗaɗen ƙasa suka yi watsi da su.",
    kicker: "Ci gaban duniya",
    type: "news",
    primaryCategory: category("world"),
    secondaryCategories: [category("climate"), category("business")],
    tags: ["cities", "resilience", "finance"],
    topics: ["Climate adaptation", "Urban development"],
    locations: ["West Africa", "Indian Ocean"],
    language: "ha",
    edition: "Global",
    authors: [amara, leila],
    publishedAt: "2026-07-28T08:15:00.000Z",
    updatedAt: "2026-07-28T10:42:00.000Z",
    readingTime: 7,
    hero: image(
      "/images/stories/coastal-city.jpg",
      "Wani birni na bakin teku",
      "Biranen da ke shiga sun ce haɗin gwiwar sayayya zai iya rage farashin kariyar ambaliya.",
      "Unsplash / development media"
    ),
    body: [
      paragraph(
        "p1-ha",
        "Shugabannin birane daga Afirka, Asiya da Kudu maso Gabashin Amurka sun yarda su raba tsare-tsaren ayyuka da haɗa ikon sayan shingen ambaliyar ruwa da tsarin gargadi da wuri."
      ),
      paragraph(
        "p2-ha",
        "A ƙarƙashin tsarin son rai, biranen da ke shiga za su wallafa bayanan haɗari marasa son rai tare da amfani da tsari guda domin tantance yan kwangila."
      ),
      {
        _key: "facts-ha",
        _type: "factBox",
        title: "Abin da yarjejeniyar ta kunsa",
        items: [
          "Matsakaitan injiniya da sayayya na haɗin gwiwa",
          "Asusun shirya ayyuka don ƙananan birane",
          "Rahoton jama'a game da farashi da sakamakon yanayi",
        ],
      },
      heading("h1-ha", "Meyasa kudaden gida ke da muhimmanci"),
      paragraph(
        "p3-ha",
        "Ana maida hankali kan kuɗaɗen daidaitawa a shirye-shiryen ƙasa, yayin da hukumomin gida ke ɗaukar nauyin magudanan ruwa da wuraren jama'a."
      ),
    ],
    relatedStorySlugs: [
      "coastal-cities-climate-resilience-pact",
      "new-trade-corridor-small-exporters-ha",
    ],
    featured: true,
    homepageEligible: true,
    trendingEligible: true,
    breakingEligible: true,
    priority: 100,
    workflowStatus: "published",
    seoTitle: "Biranen bakin teku sun kulla yarjejeniya a Hausa",
    seoDescription: "Biranen bakin teku 18 za su haɗa bayanai don hanzarta ayyukan jure sauyin yanayi.",
    searchKeywords: ["hausanews", "resilience", "cities"],
    commentsEnabled: true,
    accessStatus: "free",
  },
  {
    id: "story-trade-corridor-ha",
    headline:
      "Sabuwar hanyar kasuwanci ta yi alƙawarin saurin kan iyaka — kananan yan kasuwa na son tabbaci",
    shortHeadline: "Kananan yan kasuwa na gwada hanyar kasuwanci",
    slug: "new-trade-corridor-small-exporters-ha",
    standfirst:
      "Takardun kwastam na na'ura mai kwakwalwa sun rage tafiya ta farko da sa'o'i shida, amma 'yan kasuwa sun ce kuɗaɗe bayyanannu suna da muhimmanci kamar gudu.",
    kicker: "Kasuwanci",
    type: "analysis",
    primaryCategory: category("business"),
    secondaryCategories: [category("africa")],
    tags: ["trade", "logistics", "small business"],
    topics: ["Regional trade"],
    language: "ha",
    edition: "Africa",
    authors: [daniel],
    publishedAt: "2026-07-28T06:30:00.000Z",
    readingTime: 6,
    hero: image(
      "/images/stories/trade-corridor.jpg",
      "Dillalan kaya a tashar jiragen kasa"
    ),
    body: [
      paragraph(
        "trade-p1-ha",
        "Wani gwajin kan iyaka na na'ura mai kwakwalwa ya rage aikin takardu don zaɓaɓɓun kamfanonin kaya, amma ƙananan masu fitar da kaya sun ce shirin zai yi nasara kawai idan haraji maras kyau ya ragu."
      ),
    ],
    relatedStorySlugs: [
      "new-trade-corridor-small-exporters",
      "coastal-cities-climate-resilience-pact-ha",
    ],
    featured: true,
    homepageEligible: true,
    trendingEligible: true,
    priority: 90,
    workflowStatus: "published",
    commentsEnabled: true,
    accessStatus: "free",
  },
];

export const videos: Video[] = [
  {
    id: "video-city-heat",
    title: "How one neighbourhood measured its own heat risk",
    slug: "neighbourhood-measured-heat-risk",
    summary:
      "Residents and researchers walk through the low-cost sensor network changing local planning.",
    provider: "youtube",
    sourceUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    poster: image(
      "/images/video/heat-map.jpg",
      "A thermal map layered over a city neighbourhood"
    ),
    duration: "08:42",
    publishedAt: "2026-07-27T16:00:00.000Z",
    series: "Field Notes",
    transcript: [
      { time: "00:00", text: "This street is where the temperature gap begins." },
      { time: "01:18", text: "Sensors are mounted in shade at a consistent height." },
    ],
    accessibilityLabel: "Play video about community heat mapping",
  },
  {
    id: "video-newsroom-briefing",
    title: "The Global Briefing: markets, cities and the week ahead",
    slug: "global-briefing-week-ahead",
    summary:
      "GlobHub editors identify the decisions and data releases to watch this week.",
    provider: "external",
    sourceUrl: "https://example.org/video/global-briefing.mp4",
    poster: image(
      "/images/video/global-briefing.jpg",
      "GlobHub editor in a broadcast studio"
    ),
    duration: "12:10",
    publishedAt: "2026-07-28T05:45:00.000Z",
    series: "The Global Briefing",
  },
  {
    id: "video-live-desk",
    title: "GlobHub Live Desk",
    slug: "globhub-live-desk",
    summary: "Rolling coverage, newsroom interviews and live explainers.",
    provider: "hls",
    sourceUrl: "https://example.org/live/globhub.m3u8",
    poster: image(
      "/images/video/live-desk.jpg",
      "GlobHub Media live newsroom desk"
    ),
    publishedAt: "2026-07-28T00:00:00.000Z",
    live: true,
    scheduledStart: "2026-07-28T12:00:00.000Z",
  },
];

export const podcastShows: PodcastShow[] = [
  {
    id: "podcast-context",
    title: "The Context",
    slug: "the-context",
    description:
      "One consequential story, unpacked with the reporters and specialists closest to it.",
    cover: image(
      "/images/podcasts/the-context.jpg",
      "The Context podcast cover in GlobHub purple and cyan"
    ),
    frequency: "Weekly",
    host: daniel,
    externalUrl: "https://example.org/podcasts/the-context",
  },
];

export const podcastEpisodes: PodcastEpisode[] = [
  {
    id: "episode-climate-finance",
    showSlug: "the-context",
    title: "Can cities finance climate adaptation together?",
    slug: "cities-climate-adaptation-finance",
    summary:
      "Amara Okafor explains why a new city coalition is focusing on procurement and guarantees.",
    publishedAt: "2026-07-28T07:00:00.000Z",
    duration: "24:16",
    audioUrl: "https://example.org/audio/context-climate-finance.mp3",
    transcript:
      "This fictional transcript is a development placeholder. A production episode should include a reviewed, time-coded transcript.",
  },
  {
    id: "episode-ai-procurement",
    showSlug: "the-context",
    title: "Who audits the algorithms public agencies buy?",
    slug: "auditing-public-sector-algorithms",
    summary:
      "Inside GlobHub's review of public-sector AI procurement notices.",
    publishedAt: "2026-07-21T07:00:00.000Z",
    duration: "28:03",
    audioUrl: "https://example.org/audio/context-ai-procurement.mp3",
  },
];

export const liveEvents: LiveEvent[] = [
  {
    id: "live-global-summit",
    title: "Global Cities Summit: climate finance and urban growth",
    slug: "global-cities-summit-2026",
    summary:
      "Live reporting from the summit floor, with verified announcements and context from GlobHub correspondents.",
    status: "live",
    startAt: "2026-07-28T09:00:00.000Z",
    cover: image(
      "/images/live/cities-summit.jpg",
      "Delegates arriving at a global cities summit"
    ),
    editors: [amara, leila],
    keyPoints: [
      "Eighteen cities joined a shared procurement framework.",
      "A project preparation fund will open in September.",
      "Public reporting standards are still under negotiation.",
    ],
    entries: [
      {
        id: "live-entry-3",
        timestamp: "2026-07-28T12:22:00.000Z",
        author: amara,
        headline: "Cities publish the first joint project shortlist",
        body:
          "The shortlist includes drainage, cooling and early-warning projects. Cost and financing details are expected later today.",
        importance: "key",
        pinned: true,
      },
      {
        id: "live-entry-2",
        timestamp: "2026-07-28T11:05:00.000Z",
        author: leila,
        headline: "Scientists call for a common heat-risk measure",
        body:
          "Researchers say comparable heat data would help cities judge which interventions deliver the greatest public-health benefit.",
        importance: "standard",
      },
      {
        id: "live-entry-1",
        timestamp: "2026-07-28T09:10:00.000Z",
        author: amara,
        headline: "Summit opens with focus on delivery",
        body:
          "Opening remarks concentrated on moving existing adaptation plans into procurement rather than announcing new targets.",
        importance: "standard",
      },
    ],
    updatedAt: "2026-07-28T12:22:00.000Z",
  },
];

export const factChecks: FactCheck[] = [
  {
    id: "fact-energy-grid",
    slug: "fact-check-viral-energy-grid-claim",
    title: "No, a single data centre did not cause the regional power outage",
    claim:
      "A viral post claimed one newly opened data centre consumed enough power to shut down the regional grid.",
    claimant: "Multiple social media accounts",
    claimOrigin: "A widely shared, unattributed image post",
    claimDate: "2026-07-24T00:00:00.000Z",
    reviewDate: "2026-07-27T00:00:00.000Z",
    verdict: "false",
    conclusion:
      "Grid records show the data centre was operating below its contracted load. The outage began after two transmission faults during severe weather.",
    analysis:
      "GlobHub reviewed the grid operator's incident timeline, public load data and the data centre's connection agreement. The timeline does not support the viral claim.",
    methodology:
      "We identify the original claim, seek primary records, compare timestamps and request responses from responsible institutions. Evidence is weighted by proximity to the event and independent corroboration.",
    reviewer: leila,
    factChecker: amara,
    sources: [
      { label: "Grid incident report (fictional)", url: "https://example.org/grid-report" },
      { label: "Load data (fictional)", url: "https://example.org/load-data" },
    ],
    image: image(
      "/images/fact-check/power-grid.jpg",
      "Electrical transmission lines at dusk"
    ),
  },
];

export const newsletters: Newsletter[] = [
  {
    id: "newsletter-daily-brief",
    name: "The Daily Brief",
    slug: "daily-brief",
    description:
      "The essential global stories, what they mean and what to watch next.",
    frequency: "Weekdays",
    cover: image(
      "/images/newsletters/daily-brief.jpg",
      "The Daily Brief newsletter cover"
    ),
    editor: amara,
    featured: true,
    privacyDisclaimer:
      "Signup is handled by the configured newsletter provider. Review the privacy notice before subscribing.",
  },
  {
    id: "newsletter-climate-file",
    name: "The Climate File",
    slug: "climate-file",
    description:
      "Evidence-led reporting on climate, energy and the choices shaping resilience.",
    frequency: "Thursdays",
    cover: image(
      "/images/newsletters/climate-file.jpg",
      "The Climate File newsletter cover"
    ),
    editor: leila,
    featured: true,
    privacyDisclaimer:
      "Signup is handled by the configured newsletter provider. Review the privacy notice before subscribing.",
  },
];

export const events: EventRecord[] = [
  {
    id: "event-trust-forum",
    title: "GlobHub Forum: Rebuilding trust in public information",
    slug: "rebuilding-trust-public-information",
    summary:
      "Editors, researchers and community leaders discuss practical standards for public-interest information.",
    startsAt: "2026-09-18T10:00:00.000Z",
    endsAt: "2026-09-18T16:00:00.000Z",
    location: "Lagos and online",
    image: image(
      "/images/events/trust-forum.jpg",
      "Speakers seated on stage at a public forum"
    ),
    registrationUrl: "https://example.org/events/trust-forum",
    virtual: true,
  },
];

export const breakingItems: BreakingItem[] = [
  {
    id: "breaking-1",
    label: "Developing",
    headline:
      "Global Cities Summit publishes first climate-project shortlist",
    href: "/live/global-cities-summit-2026",
    priority: 100,
    startsAt: "2026-07-28T11:30:00.000Z",
    expiresAt: "2027-07-29T00:00:00.000Z",
  },
  {
    id: "breaking-2",
    label: "Live",
    headline: "Follow verified updates from the summit floor",
    href: "/live/global-cities-summit-2026",
    priority: 90,
    startsAt: "2026-07-28T09:00:00.000Z",
    expiresAt: "2027-07-29T00:00:00.000Z",
  },
];

export const homepageModules: HomepageModule[] = [
  {
    id: "home-lead",
    type: "lead",
    layout: "lead-grid",
    storySlugs: [
      "coastal-cities-climate-resilience-pact",
      "new-trade-corridor-small-exporters",
      "inside-the-race-to-map-urban-heat",
      "public-agencies-ai-procurement-oversight",
    ],
    enabled: true,
  },
  {
    id: "home-latest",
    type: "latest",
    title: "Latest",
    layout: "river",
    limit: 6,
    enabled: true,
  },
  {
    id: "home-investigations",
    type: "category",
    title: "Reporting that goes deeper",
    layout: "split",
    storySlugs: [
      "public-agencies-ai-procurement-oversight",
      "inside-the-race-to-map-urban-heat",
    ],
    enabled: true,
  },
  {
    id: "home-ranked",
    type: "ranked",
    title: "Most read",
    layout: "rail",
    storySlugs: [
      "inside-the-race-to-map-urban-heat",
      "public-agencies-ai-procurement-oversight",
      "young-voters-city-elections-five-questions",
      "solar-cold-chain-remote-clinics",
    ],
    enabled: true,
  },
  {
    id: "home-opinion",
    type: "opinion",
    title: "Ideas & Opinion",
    layout: "split",
    storySlugs: ["opinion-local-reporting-democratic-infrastructure"],
    enabled: true,
  },
  {
    id: "home-video",
    type: "video",
    title: "Watch",
    layout: "four-up",
    enabled: true,
  },
  {
    id: "home-newsletter",
    type: "newsletter",
    title: "The Daily Brief",
    enabled: true,
  },
];

export const navigation: Navigation = {
  utilityLinks: [
    { label: "Latest", href: "/latest" },
    { label: "Newsletters", href: "/newsletters" },
    { label: "Watch live", href: "/watch-live" },
  ],
  categories,
  edition: "Global",
  language: "English",
  showDate: true,
  showLive: true,
  showNewsletter: true,
  showAccount: true,
};

export const siteSettings: SiteSettings = {
  title: "GlobHub Media",
  shortTitle: "GlobHub",
  description:
    "Independent global journalism for a connected world: verified news, analysis, investigations and ideas.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  edition: "Global",
  language: "en",
  contactEmail: "newsroom@example.globhub.test",
  correctionsEmail: "corrections@example.globhub.test",
  socialLinks: [
    { label: "YouTube", url: "https://example.org/globhub/youtube" },
    { label: "LinkedIn", url: "https://example.org/globhub/linkedin" },
    { label: "Instagram", url: "https://example.org/globhub/instagram" },
  ],
  commentsEnabled: false,
  analyticsProvider: "none",
};
