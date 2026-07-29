# GlobHub Media

GlobHub Media is a production-oriented, fictional global newsroom built with
Next.js 16, React 19 and Sanity 6. It includes a responsive editorial website,
an embedded `/studio`, structured newsroom workflows, media and live coverage,
fact checks, newsletters, events, corporate pages, feeds, search, Draft Mode,
Visual Editing and secure revalidation.

The repository is safe to run without credentials. It falls back to a clearly
fictional local dataset and tells editors when Sanity or a form provider has not
been configured.

## Technical stack

- Next.js 16 App Router, React Server Components and TypeScript strict mode
- React 19, Tailwind CSS 4 tokens plus scoped CSS Modules
- Sanity 6, next-sanity 13, Presentation/Visual Editing and Portable Text
- Zod server-action validation and Lucide icons
- Node's native test runner through `tsx`

## Install

Prerequisites: Node.js 22+ and npm 11+.

```powershell
npm.cmd install
Copy-Item .env.example .env.local
npm.cmd run dev
```

Open `http://localhost:3000`. The embedded Studio is at
`http://localhost:3000/studio`.

## Environment configuration

Copy `.env.example` and set:

- `NEXT_PUBLIC_SITE_URL`: canonical HTTPS origin in production.
- `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` and
  `NEXT_PUBLIC_SANITY_API_VERSION`: public Sanity client configuration.
- `SANITY_API_READ_TOKEN`: server-only Viewer token for protected draft
  previews. Never prefix it with `NEXT_PUBLIC_`.
- `SANITY_REVALIDATE_SECRET`: long random secret for webhook verification.
- `NEWSLETTER_WEBHOOK_URL` and `CONTACT_WEBHOOK_URL`: optional server-side
  adapters. Forms report “not configured” when these are absent.

## Sanity setup

1. Create or select a Sanity project and dataset.
2. Add the project ID and dataset to `.env.local`.
3. Add `http://localhost:3000` and the production origin to the Sanity CORS
   origins. Allow credentials for Presentation/Draft Mode.
4. Create a read-only Viewer token and set `SANITY_API_READ_TOKEN` only in the
   server environment.
5. Start the app and visit `/studio`, or run the standalone Studio command:

```powershell
npm.cmd run sanity:dev
```

The custom structure groups editorial desks, multimedia, taxonomy, newsroom,
website management, commercial records and governance. Access control remains
in Sanity project roles; the public app does not invent a parallel staff-login
system.

## Seed content

The public fallback content is in `lib/content/seed.ts`. Generate an importable
NDJSON dataset:

```powershell
npm.cmd run seed:write
npx.cmd sanity dataset import sanity/seed/development.ndjson production --replace
```

The script writes fictional categories, public staff profiles and stories. It
intentionally omits Sanity image assets; upload and credit production imagery in
Studio after import.

## Type generation and schema checks

```powershell
npm.cmd run sanity:schema
npm.cmd run sanity:typegen
npm.cmd run typecheck
```

Schema extraction and Sanity type generation require valid project
configuration and, when the dataset is private, an authenticated Sanity CLI.

## Testing and building

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd test
npm.cmd run build
```

`npm run verify` runs all four gates. The test suite covers embed allowlisting,
URL safety, RSS escaping, content relationships and accessible brand markup.
The recommended production extension is Playwright coverage for menu keyboard
behavior, Draft Mode, search filters and critical route smoke tests.

## Webhook setup

Create a Sanity webhook pointing to:

```text
POST https://your-domain.example/api/revalidate
Authorization: Bearer <SANITY_REVALIDATE_SECRET>
Content-Type: application/json
```

Suggested projection:

```json
{
  "_type": _type,
  "slug": slug.current,
  "categorySlug": primaryCategory->slug.current
}
```

The endpoint validates the secret with a constant-time comparison, bounds the
payload, and revalidates document tags and affected public paths. Do not expose
the secret in Studio or browser code.

## Preview setup

`/api/draft-mode/enable` uses Sanity's signed preview flow. Presentation should
target the deployed site origin and use this Draft Mode endpoint. A valid
server-only read token enables draft perspective, Stega metadata, click-to-edit
overlays and live updates. `/api/draft-mode/disable` exits preview.

## Deployment

Deploy the Next.js app to a Node-compatible host, configure all production
environment variables, set the final Sanity CORS origin, and then configure the
revalidation webhook. Deploy a standalone Studio only if `/studio` is not the
preferred editorial URL:

```powershell
npm.cmd run sanity:deploy
```

See `docs/deployment.md` for the launch checklist, cache behavior, DNS, feeds
and rollback expectations.

## Common troubleshooting

- **The site shows fictional content:** Sanity variables are absent, invalid or
  the query failed. Check the server log and `/studio` connection message.
- **Studio opens but preview does not:** verify the Viewer token, credentialed
  CORS origin, Presentation URL and browser cookie settings.
- **Webhook returns 401:** the Bearer secret differs from
  `SANITY_REVALIDATE_SECRET`.
- **Images are blank after importing seed data:** the NDJSON intentionally does
  not fabricate Sanity asset references. Upload images in Studio.
- **Forms do not submit:** configure a server-side provider webhook. No provider
  is simulated.
- **Windows blocks npm.ps1:** use `npm.cmd` and `npx.cmd`, as in this guide.

## Project guides

- [Architecture](docs/architecture.md)
- [Sanity schema guide](docs/sanity-schema-guide.md)
- [Editorial workflow](docs/editorial-workflow.md)
- [Content editor guide](docs/content-editor-guide.md)
- [Deployment](docs/deployment.md)
- [Security](docs/security.md)
- [Implementation plan](docs/implementation-plan.md)
- [CCSA reference findings](docs/ccsa-reference-findings.md)
- [Development media credits](docs/media-credits.md)
