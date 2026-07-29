# CCSA Reference Findings

## Scope and safety

The local reference project at `C:\projects\cosmopolitan\ccsa` was inspected as
read-only. No source files, configuration, data, or environment files were
modified. Secret-bearing `.env` files were deliberately not opened; only
`.env.example` was reviewed.

## What exists in CCSA

- A Next.js App Router application with route groups for public, authentication,
  and administrative experiences.
- An embedded Sanity Studio mounted at `/admin` through
  `app/admin/[[...tool]]/page.tsx`.
- Root-level `sanity.config.ts` and `sanity.cli.ts` configuration.
- Sanity code grouped into `sanity/schemaTypes`, `sanity/lib`, and a minimal
  `sanity/structure.ts`.
- Separate document types for articles, authors, article types, events,
  activities, publications, media, training, members, and supporting taxonomy.
- A centralized `next-sanity` client and an image URL builder.
- GROQ functions grouped by domain under a query directory.
- Tag/time-based query revalidation and a webhook route that revalidates public
  paths.
- Slugs generally generated from document titles or names.
- Basic hotspot-enabled image fields.
- Public content pages rendered as Server Components.
- NextAuth, Prisma, and route middleware for a separate administrative
  dashboard, with provider and credentials authentication.
- Prisma models for operational records such as applications, comments, users,
  sessions, and view events.
- A basic sitemap and analytics helper.

## Useful patterns adapted

1. Keep Studio embedded in the main application so editorial and public builds
   share types, schema definitions, and deployment.
2. Keep Sanity configuration at the repository root while organizing schema,
   structure, queries, and CMS utilities under `sanity/`.
3. Centralize the Sanity client and image builder.
4. Keep domain-specific queries out of React components.
5. Use cache tags and a webhook to invalidate affected public routes.
6. Use Server Components for content-heavy pages.
7. Keep operational data and authentication conceptually separate from
   editorial content.

## What is improved for GlobHub Media

### Content model

CCSA's article model is intentionally small. GlobHub uses a newsroom-oriented
hybrid model: a central `story` document contains shared publishing fields, and
specialized documents cover live blogs, fact checks, videos, podcasts, events,
newsletters, ads, redirects, and homepage curation. This avoids duplicating the
full editorial field set while preserving specialized Studio experiences.

Schemas are split into `documents`, `objects`, `fields`, and `helpers`. Reusable
SEO, workflow, media, Portable Text, and scheduling objects prevent copy/paste
drift without hiding editor-facing behavior.

### Validation and previews

GlobHub adds:

- Required public headlines, slugs, categories, authors, and publication dates.
- Cross-field date checks for schedules, embargoes, expirations, campaigns, and
  live events.
- Sponsored-content disclosure requirements.
- Image accessibility and credit fields.
- Safe provider allowlisting for embeds.
- Parent-category checks and a documented server-side cycle audit.
- Descriptive document previews with state, date, and content-type context.

### Data access

The CCSA query layer contains a misspelled `quesries` directory and mixes query
declarations with fetching. GlobHub separates:

- reusable GROQ projections;
- query strings by domain;
- typed fetch functions;
- a provider-neutral repository interface;
- a deterministic development fallback when Sanity is not configured.

This keeps the application runnable before external credentials exist and makes
future search-provider replacement straightforward.

### Environment handling

CCSA's environment helper throws at import time when Sanity variables are
missing. GlobHub distinguishes required production configuration from local
fallback operation. Public pages remain usable with fictional seed content;
Studio clearly reports missing configuration instead of crashing the entire
site. Server-only tokens never cross a client boundary.

### Studio information architecture

CCSA exposes the default document list. GlobHub provides newsroom desks:
Editorial, Multimedia, Taxonomy, Newsroom, Website Management, Commercial, and
Governance. Singleton documents such as site settings, navigation, footer, and
homepage curation have dedicated entries.

### Authentication and permissions

The CCSA dashboard protects broad route groups using NextAuth middleware and a
two-role Prisma model. GlobHub does not copy that approach because Sanity Studio
authorization must be enforced by Sanity project roles, not frontend UI.
Newsroom role metadata is modeled for documentation and assignments, but actual
publish/manage permissions must be configured in the Sanity dashboard.

Reader accounts are represented by a provider-neutral boundary only. No
mandatory authentication or insecure frontend-only authorization is introduced
in the initial public release.

### Publishing and revalidation

GlobHub verifies a shared webhook secret, maps changed document types to
specific cache tags and routes, and provides protected draft-mode entry/exit
handlers. Audit trails, granular workflow enforcement, and approval gates that
depend on Sanity plan features or custom backend services are documented
accurately instead of represented as automatic platform features.

## Patterns intentionally not copied

- Hard-coded administrator email allowlists.
- Storing private staff contact information in public projections.
- An approved-by-default comments database.
- Raw page-view writes to the editorial CMS.
- Unrestricted or duplicated GROQ inside page components.
- Flat Studio navigation.
- Hard-coded production URLs in sitemap logic.
- Catch-all error handling that surfaces internal messages.
- Provider-specific analytics, mail, or newsletter logic scattered through UI.

## Type generation

CCSA uses a handwritten `@types` surface. GlobHub keeps explicit application
view models for the credential-free fallback and adds Sanity type-generation
scripts so generated schema/query types can replace or augment them once a real
project is connected.

## Conclusion

The reference was valuable for integration shape, but GlobHub's architecture is
deliberately stricter, more modular, more resilient without credentials, and
better aligned with newsroom governance and public-interest publishing.
