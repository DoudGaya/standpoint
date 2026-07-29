# GlobHub Media Implementation Plan

## Existing project assessment

- Fresh Next.js `16.2.12` application using the App Router.
- React `19.2.4`, TypeScript in strict mode, Tailwind CSS 4, and ESLint 9.
- Application code lives directly under `app/`; there is no `src` directory.
- The starter has no persistence, authentication, CMS, tests, or hosting
  configuration.
- The existing package manager and lockfile are npm-based and will be preserved.
- The installed Next.js 16 documentation in `node_modules/next/dist/docs` is the
  source of truth for route props, caching, revalidation, metadata, route
  handlers, draft mode, forms, and Server/Client Component boundaries.

## Reference-project findings

The read-only CCSA findings are documented in
`docs/ccsa-reference-findings.md`. GlobHub adapts its embedded Studio,
centralized CMS utilities, and server-rendered data access while replacing its
flat schemas, weak validation, fragmented queries, import-time environment
failures, and broad authentication patterns.

## Product architecture

The product has four clear layers:

1. Public editorial website: Server Component-first Next.js routes.
2. Interactive UI islands: navigation, search controls, sharing, reading
   progress, live-update prompts, media controls, and forms.
3. Editorial platform: embedded Sanity Studio with a newsroom desk structure.
4. Integration boundaries: analytics, newsletters, comments, email, accounts,
   search, advertising, rate limiting, and secure tips.

When Sanity credentials are absent, public routes use deterministic fictional
GlobHub content. This is a development mode, not a fake external integration.

## Route map

### Editorial

- `/`, `/latest`, `/news`
- `/story/[slug]`
- `/category/[slug]`, `/category/[parent]/[child]`
- `/topic/[slug]`, `/tag/[slug]`
- `/opinion`, `/investigations`
- `/fact-check`, `/fact-check/[slug]`
- `/live`, `/live/[slug]`

### Multimedia

- `/video`, `/video/[slug]`, `/watch-live`
- `/audio`
- `/podcasts`, `/podcasts/[showSlug]`
- `/podcasts/[showSlug]/[episodeSlug]`
- `/photo`

### People and products

- `/author/[slug]`, `/team`, `/leadership`
- `/newsletters`, `/newsletters/[slug]`
- `/events`, `/events/[slug]`

### Corporate and service

- `/about`, `/contact`, `/advertise`, `/careers`
- `/editorial-policy`, `/corrections`, `/fact-checking-methodology`
- `/privacy`, `/terms`, `/cookies`, `/accessibility`
- `/community-guidelines`, `/diversity`, `/ownership`

### Platform

- `/search`
- `/studio/[[...tool]]`
- `/api/draft-mode/enable`, `/api/draft-mode/disable`
- `/api/revalidate`, `/api/forms/[kind]`, `/api/newsletter`
- `/rss.xml`, `/news-sitemap.xml`
- metadata routes for sitemap and robots

Story URLs use `/story/[slug]` to prevent taxonomy changes from breaking
canonical URLs. Sanity-managed redirects preserve legacy paths.

## Component architecture

### Global shell

`SiteHeader`, `UtilityBar`, `BrandRow`, `DesktopNavigation`, `MegaMenu`,
`MobileNavigation`, `BreakingTicker`, `SiteFooter`, `SkipLink`.

### Editorial modules

`LeadPackage`, `StoryCard` variants, `CompactStoryRow`, `LatestStream`,
`RankedList`, `OpinionCard`, `MediaCard`, `FactCheckCard`, `LiveCard`,
`SectionHeading`, `NewsletterCallout`, `AdSlot`.

### Reading

`ArticleHeader`, `Byline`, `ReadingProgress`, `ShareToolbar`,
`PortableTextRenderer`, `PullQuote`, `FactBox`, `Timeline`, `Embed`,
`MediaPlayer`, `Transcript`, `RelatedStories`, `AuthorCard`.

### System

`Breadcrumbs`, `Pagination`, `SearchForm`, `SearchFilters`, `ContactForm`,
`EmptyState`, `ErrorState`, `Skeleton`, `Toast`, and accessible dialog
primitives where needed.

## Sanity schema map

### Primary editorial documents

- `story`
- `liveEvent`
- `factCheck`
- `video`
- `podcastShow`
- `podcastEpisode`
- `event`
- `newsletter`
- `newsletterEdition`

### People and taxonomy

- `person`, `team`, `department`
- `category`, `topic`, `tag`, `location`, `series`

### Curation and website management

- `homepage`, `navigation`, `breakingNews`, `page`
- `siteSettings`, `footer`, `redirect`

### Commercial and governance

- `advertiser`, `adCampaign`, `adPlacement`
- `correction`, `editorialPolicy`

### Reusable objects

- `seo`, `socialMetadata`, `workflow`, `schedule`, `editorialImage`
- `heroMedia`, `mediaEmbed`, `portableText`, `relatedLink`
- `contentModule`, `storySelection`, `socialLink`, `contactPoint`
- rich-body blocks for pull quotes, galleries, facts, timelines, FAQs,
  related content, documents, maps, data embeds, newsletter calls to action,
  ads, corrections, source notes, and restricted code samples

## Data relationships

- Stories reference one primary category, optional secondary categories,
  authors/contributors/editors, topics, tags, locations, series, newsletters,
  related stories, and source documents.
- Categories use an optional parent reference; navigation can reference
  categories or explicit links.
- Homepage modules reference stories or query configuration, with manual order,
  exclusion, scheduling, fallback, and layout fields.
- Live events reference people, a main story, and embedded live-entry objects.
- Fact checks reference people, evidence sources, topics, and related claims.
- Podcast episodes reference a show; videos and stories can reference series.
- Corrections reference affected stories and retain public correction details.
- Ad campaigns reference an advertiser and target placement/category metadata.

All public projections deliberately omit private staff fields and internal
workflow notes.

## Editorial workflow

Statuses: draft, assigned, in progress, submitted, fact checking, copy editing,
legal review, approved, scheduled, published, updated, corrected, retracted,
archived.

Stories include assigned staff, due dates, revision summaries, internal notes,
embargoes, approval metadata, corrections, and retraction details. Schema rules
provide guardrails; strict approval and publishing enforcement belongs to
Sanity project roles, custom document actions, and—where required—a higher
Sanity plan or external workflow service.

## User roles and permissions

Roles modeled for newsroom operations: super administrator, publisher, editor
in chief, managing editor, section editor, copy editor, reporter, contributor,
fact checker, video editor, photo editor, producer, commercial editor,
advertising manager, analyst, and read-only reviewer.

Sanity project roles enforce creation, review, publication, settings, curation,
taxonomy, staff, advertising, and analytics access. The public frontend never
uses role metadata as an authorization decision. Reader authentication remains
an optional adapter boundary for a future Auth.js implementation.

## Search architecture

`SearchService` provides a stable interface. The initial Sanity implementation
uses parameterized GROQ with a bounded search term and fixed filter mappings;
it never accepts raw GROQ. Development uses the same interface over seed data.
URL search params make result pages shareable. Recent searches remain
device-local. The interface can later target Algolia, Typesense, or Meilisearch
without changing page components.

## SEO architecture

- Root metadata base and per-document `generateMetadata`.
- Canonical URLs, Open Graph, X cards, and robots controls.
- `NewsArticle`, article subtype, `ClaimReview`, `LiveBlogPosting`,
  `VideoObject`, `AudioObject`, `PodcastSeries`, `PodcastEpisode`, `Person`,
  `Organization`, `BreadcrumbList`, and `WebSite` JSON-LD as applicable.
- Dynamic sitemap, news sitemap, robots, global RSS, and category-ready feed
  functions.
- Redirect records and safe canonical overrides.

## Analytics architecture

A typed provider-neutral event helper covers page views, reads, engaged time,
scroll depth, search, shares, newsletters, video/audio progress, ads, authors,
and categories. The browser helper is inert until a consent-aware provider is
configured. Raw view events are not written to Sanity. Sanity can provide
manual popular-content overrides.

## Security approach

- Tokens remain server-only; only project ID, dataset, API date, and site URL
  are public.
- Draft mode and revalidation require secrets.
- Webhooks use constant-time secret comparison and bounded payload validation.
- Forms validate server-side, include honeypot and rate-limit adapter hooks,
  bound input sizes, and expose no provider secrets.
- Embed URLs are parsed against an explicit provider/host allowlist.
- Redirects accept only local destinations or separately allowlisted hosts.
- Recommended CSP and secure headers are configured with room for Sanity and
  approved media providers.
- Private staff fields never appear in public queries.
- No claim of end-to-end secure tips is made without a separately configured
  secure-tip platform.

## Performance strategy

- Server Components by default; client JavaScript is limited to interactions.
- Parallel content fetches, bounded GROQ projections, cache tags, and webhook
  revalidation.
- Responsive `next/image` usage and Sanity image transforms with reserved
  dimensions.
- Font optimization with a restrained serif/sans pairing.
- Lazy below-fold embeds, reserved ad slots, route loading states, and minimal
  third-party scripts.
- Reduced-motion behavior and no body-text animation.

## Accessibility approach

Target WCAG 2.2 AA through semantic landmarks, skip links, logical headings,
visible focus indicators, keyboard-operable menus, Escape/outside-close
behavior, accessible accordions, labeled controls, error associations, live
regions, captions/transcripts, adequate touch targets, and contrast-safe dark
cyan links on light surfaces. Motion pauses for user control and respects
`prefers-reduced-motion`.

## Testing strategy

- `tsc --noEmit`
- ESLint
- Vitest unit tests for embed validation, search filtering, feed generation,
  route helpers, and schema helpers
- React component tests for navigation, story rendering, and empty states
- Accessibility assertions for critical components
- Smoke checks for homepage, article, search, sitemap, RSS, and protected
  preview behavior
- Production build as the final integration gate
- Browser/end-to-end and CMS integration tests documented for CI once a real
  Sanity project is available

## Deployment checklist

1. Create or select the Sanity project and production dataset.
2. Configure allowed CORS origins and Studio host.
3. Create least-privilege preview and webhook credentials.
4. Configure newsroom roles in the Sanity dashboard.
5. Import seed content, generate types, and review legal/editorial placeholders.
6. Add environment variables to the hosting platform.
7. Configure revalidation webhook payload and secret.
8. Configure analytics consent, newsletter/email provider, and rate limiting.
9. Verify CSP against only the selected embed providers.
10. Run typecheck, lint, tests, build, and production smoke tests.
11. Verify sitemap, news sitemap, feeds, structured data, and preview.
12. Set monitoring, backups, secret rotation, and incident owners.

## Environment variables

Required for a connected production CMS:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `NEXT_PUBLIC_SITE_URL`
- `SANITY_API_READ_TOKEN` for authenticated previews
- `SANITY_REVALIDATE_SECRET`
- `SANITY_PREVIEW_SECRET`

Optional adapters:

- analytics provider/site identifiers
- newsletter provider and API token
- email provider and destination addresses
- comments provider identifiers
- rate-limit provider URL/token
- authentication secret/provider credentials when reader accounts are enabled

`SANITY_API_WRITE_TOKEN` is intentionally absent unless a legitimate
server-side write workflow is later approved.

## Major implementation phases

1. Assess the starter and CCSA architecture.
2. Record architectural findings and this plan.
3. Install only required CMS, Portable Text, icon, validation, and test
   dependencies.
4. Establish brand tokens, typography, global shell, and editorial components.
5. Build Sanity schemas, previews, Studio structure, config, and type-generation
   scripts.
6. Build the typed data-access layer, seed fallback, images, queries, preview,
   and revalidation.
7. Implement the homepage and global dynamic navigation.
8. Implement story, taxonomy, author, multimedia, live, fact-check, newsletter,
   event, and corporate routes.
9. Implement search, feeds, metadata, structured data, forms, analytics, ads,
   comments, and account boundaries.
10. Add tests, seed tooling, error/loading states, and operational
    documentation.
11. Run all quality gates, fix blocking issues, and produce the final
    implementation report.
