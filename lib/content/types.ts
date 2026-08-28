export type StoryType =
  | "news"
  | "breaking"
  | "feature"
  | "analysis"
  | "opinion"
  | "editorial"
  | "interview"
  | "explainer"
  | "investigation"
  | "fact-check"
  | "press-release"
  | "sponsored"
  | "video"
  | "podcast"
  | "photo-essay"
  | "data-story"
  | "review";

export type WorkflowStatus =
  | "draft"
  | "assigned"
  | "in-progress"
  | "submitted"
  | "fact-checking"
  | "copy-editing"
  | "legal-review"
  | "approved"
  | "scheduled"
  | "published"
  | "updated"
  | "corrected"
  | "retracted"
  | "archived";

export type EditorialImage = {
  url: string;
  alt: string;
  caption?: string;
  credit?: string;
  blurDataURL?: string;
  width?: number;
  height?: number;
};

export type Person = {
  id: string;
  name: string;
  slug: string;
  title: string;
  roles: string[];
  shortBio: string;
  biography?: string;
  image?: EditorialImage;
  location?: string;
  expertise?: string[];
  languages?: string[];
  socialLinks?: Array<{ label: string; url: string }>;
  featured?: boolean;
  active?: boolean;
  publicProfile?: boolean;
  department?: string;
};

export type Category = {
  id: string;
  title: string;
  titleHa?: string;
  navigationLabel?: string;
  navigationLabelHa?: string;
  slug: string;
  description: string;
  descriptionHa?: string;
  language?: string;
  parentSlug?: string;
  accent: string;
  order: number;
  featured?: boolean;
  showInNavigation?: boolean;
  showInFooter?: boolean;
  megaMenu?: boolean;
  children?: Category[];
};

export type PortableTextSpan = {
  _key: string;
  _type: "span";
  text: string;
  marks?: string[];
};

export type PortableTextBlock = {
  _key: string;
  _type: "block";
  style?: "normal" | "h2" | "h3" | "blockquote";
  children: PortableTextSpan[];
  markDefs?: Array<{
    _key: string;
    _type: "link" | "internalLink";
    href?: string;
    storySlug?: string;
  }>;
};

export type BodyBlock =
  | PortableTextBlock
  | {
      _key: string;
      _type: "pullQuote";
      quote: string;
      attribution?: string;
    }
  | {
      _key: string;
      _type: "factBox";
      title: string;
      items: string[];
    }
  | {
      _key: string;
      _type: "editorialImage";
      image: EditorialImage;
    }
  | {
      _key: string;
      _type: "relatedContent";
      title?: string;
      storySlugs: string[];
    }
  | {
      _key: string;
      _type: "sourceNote";
      title?: string;
      sources: Array<{ label: string; url: string }>;
    };

export type Story = {
  id: string;
  internalTitle?: string;
  headline: string;
  shortHeadline: string;
  mobileHeadline?: string;
  slug: string;
  standfirst: string;
  deck?: string;
  kicker: string;
  type: StoryType;
  primaryCategory: Category;
  secondaryCategories?: Category[];
  tags: string[];
  topics: string[];
  locations?: string[];
  language: string;
  edition: string;
  authors: Person[];
  contributors?: Array<{ person: Person; role: string }>;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  hero?: EditorialImage;
  socialImage?: EditorialImage;
  coverImage?: EditorialImage;
  body: BodyBlock[];
  relatedStorySlugs?: string[];
  correctionNote?: string;
  editorsNote?: string;
  disclosure?: string;
  contentWarning?: string;
  sponsoredBy?: string;
  canonicalUrl?: string;
  featured?: boolean;
  homepageEligible?: boolean;
  trendingEligible?: boolean;
  breakingEligible?: boolean;
  priority?: number;
  workflowStatus: WorkflowStatus;
  seoTitle?: string;
  seoDescription?: string;
  searchKeywords?: string[];
  commentsEnabled?: boolean;
  accessStatus?: "free" | "registered" | "subscriber";
};

export type MediaProvider =
  | "youtube"
  | "vimeo"
  | "facebook"
  | "instagram"
  | "tiktok"
  | "x"
  | "soundcloud"
  | "spotify"
  | "apple-podcasts"
  | "mixcloud"
  | "hls"
  | "uploaded"
  | "external";

export type Video = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  provider: MediaProvider;
  sourceUrl: string;
  poster: EditorialImage;
  duration?: string;
  publishedAt: string;
  series?: string;
  live?: boolean;
  scheduledStart?: string;
  transcript?: Array<{ time: string; text: string }>;
  accessibilityLabel?: string;
};

export type PodcastShow = {
  id: string;
  title: string;
  slug: string;
  description: string;
  cover: EditorialImage;
  frequency: string;
  host: Person;
  externalUrl?: string;
};

export type PodcastEpisode = {
  id: string;
  showSlug: string;
  title: string;
  slug: string;
  summary: string;
  publishedAt: string;
  duration: string;
  audioUrl: string;
  transcript?: string;
};

export type RadioBulletin = {
  id: string;
  title: string;
  titleHa?: string;
  slug: string;
  summary: string;
  summaryHa?: string;
  bulletinType: "hourly" | "daily" | "breaking" | "article";
  audioUrl: string;
  duration: string;
  publishedAt: string;
  language: string;
  presenter?: string;
  cover?: EditorialImage;
  storySlug?: string;
};

export type LiveEntry = {
  id: string;
  timestamp: string;
  author: Person;
  headline?: string;
  body: string;
  importance: "standard" | "key" | "critical";
  pinned?: boolean;
  correction?: string;
};

export type LiveEvent = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  status: "scheduled" | "live" | "paused" | "ended" | "archived";
  startAt: string;
  endAt?: string;
  cover: EditorialImage;
  editors: Person[];
  keyPoints: string[];
  entries: LiveEntry[];
  updatedAt: string;
};

export type FactCheck = {
  id: string;
  slug: string;
  title: string;
  claim: string;
  claimant: string;
  claimOrigin: string;
  claimDate: string;
  reviewDate: string;
  verdict: "true" | "mostly-true" | "mixed" | "misleading" | "false" | "unproven";
  conclusion: string;
  analysis: string;
  methodology: string;
  reviewer: Person;
  factChecker: Person;
  sources: Array<{ label: string; url: string }>;
  image?: EditorialImage;
};

export type Newsletter = {
  id: string;
  name: string;
  slug: string;
  description: string;
  frequency: string;
  cover: EditorialImage;
  editor: Person;
  featured?: boolean;
  privacyDisclaimer: string;
};

export type EventRecord = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  startsAt: string;
  endsAt?: string;
  location: string;
  image: EditorialImage;
  registrationUrl?: string;
  virtual?: boolean;
};

export type BreakingItem = {
  id: string;
  label: string;
  headline: string;
  href: string;
  priority: number;
  startsAt: string;
  expiresAt: string;
};

export type HomepageModule = {
  id: string;
  type:
    | "lead"
    | "latest"
    | "category"
    | "ranked"
    | "opinion"
    | "video"
    | "podcast"
    | "newsletter"
    | "advertisement";
  title?: string;
  layout?: "lead-grid" | "river" | "four-up" | "split" | "rail";
  storySlugs?: string[];
  categorySlug?: string;
  limit?: number;
  enabled: boolean;
};

export type Navigation = {
  utilityLinks: Array<{ label: string; href: string }>;
  categories: Category[];
  edition: string;
  language: string;
  showDate: boolean;
  showLive: boolean;
  showNewsletter: boolean;
  showAccount: boolean;
};

export type SiteSettings = {
  title: string;
  shortTitle: string;
  description: string;
  siteUrl: string;
  edition: string;
  language: string;
  contactEmail: string;
  correctionsEmail: string;
  socialLinks: Array<{ label: string; url: string }>;
  commentsEnabled: boolean;
  analyticsProvider: "none" | "first-party" | "plausible" | "google";
};

export type SearchFilters = {
  category?: string;
  type?: StoryType;
  topic?: string;
  from?: string;
  to?: string;
  sort?: "relevance" | "newest";
  page?: number;
};

export type SearchResult = {
  items: Story[];
  total: number;
  page: number;
  pageSize: number;
  query: string;
};
