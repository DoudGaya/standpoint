# Deployment

## Preflight

Run the full local gate:

```powershell
npm.cmd ci
npm.cmd run verify
```

With a configured Sanity project, also run:

```powershell
npm.cmd run sanity:schema
npm.cmd run sanity:typegen
```

Review legal placeholders, fictional seed content, media licensing and all
adapter boundaries before launch.

## Application environment

Configure:

- final `NEXT_PUBLIC_SITE_URL` using HTTPS;
- Sanity project, dataset and pinned API version;
- server-only Viewer token;
- long random revalidation secret;
- real newsletter/contact provider endpoints when those forms are enabled;
- analytics identifier only after consent and privacy review.

Do not reuse Sanity write tokens in the public app.

## Sanity

Add the production application origin to CORS and allow credentials for
Presentation. Configure the Presentation URL and signed Draft Mode endpoint.
Create custom roles and least-privilege assignments in Sanity Manage.

The Studio is embedded at `/studio`. A standalone deployment is optional:

```powershell
npm.cmd run sanity:deploy
```

## Webhook

Send document mutations to `POST /api/revalidate` with
`Authorization: Bearer <secret>`. Use the projection from the README. Configure
retries with backoff and alert on repeated non-2xx responses.

## Host requirements

The app needs a Next.js 16 compatible Node runtime, server actions, route
handlers and image optimization. Preserve response headers from
`next.config.ts`. Cache HTML and feeds through the platform while allowing
tag/path revalidation.

Verify after deployment:

- canonical and Open Graph URLs use the final origin;
- `/`, a story, category, search, video, podcast, live and fact-check routes;
- `/rss.xml`, category/podcast RSS, `/sitemap.xml`,
  `/news-sitemap.xml` and `/robots.txt`;
- `/studio`, signed preview enable/disable and Visual Editing;
- webhook revalidation after a test publish;
- forms against real provider sandboxes;
- 404, error and loading states;
- responsive keyboard navigation and contrast.

## Redirects

The repository includes a Sanity redirect schema. For a small migration, export
validated redirect documents and materialize them as platform redirects during
the build/deploy pipeline. For a large or frequently changing set, add a cached
server-side redirect lookup at the edge. Reject loops, wildcard surprises and
unreviewed external targets.

## Rollback

Keep the last known-good application artifact and Sanity schema commit. App
rollbacks do not roll back Content Lake. For damaging editorial changes, use
Sanity document history and corrections policy; do not restore the whole
dataset casually.
