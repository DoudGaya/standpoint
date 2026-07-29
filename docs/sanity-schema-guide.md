# Sanity schema guide

## Schema map

Editorial documents:

- `story`: news, analysis, feature, investigation, opinion, editorial,
  explainer, interview and photo-essay variants.
- `video`, `podcastShow`, `podcastEpisode`, `liveEvent`, `factCheck`.
- `person`, `department`, `team`.

Taxonomy:

- `category` supports a parent reference, display flags, navigation ordering,
  accent color, hero content and SEO.
- `topic`, `tag`, `location` and `series` are distinct concepts so editorial
  grouping does not collapse into uncontrolled labels.

Products and commercial records:

- `newsletter`, `newsletterEdition`, `event`.
- `advertiser`, `adPlacement`, `adCampaign`.

Website and governance:

- `homepage`, `homepageModule`, `navigation`, `breakingNews`, `footer`,
  `siteSettings`, `page`, `redirect`.
- `correction`, `editorialPolicy`.

Reusable objects include `editorialImage`, `seo`, `workflow`, `schedule`,
`mediaEmbed`, `bodyContent`, callouts and rich editorial blocks.

## Canonical story model

`story` uses a `contentType` discriminator. Shared fields include internal and
public headlines, summaries, body, taxonomy, authors and contributors, hero
media, scheduling, workflow, distribution flags, corrections, disclosures,
warnings, sponsorship and SEO. Conditional fields collect opinion labels,
investigation/source notes and retraction details without fragmenting the
publishing model.

Required fields and limits are enforced in the schema. Validation covers:

- title, slug, summary, body, category, author and publication requirements;
- HTTPS and provider allowlists for external media;
- unique arrays and bounded counts;
- valid schedule start/end ordering;
- retraction reason when status is retracted;
- accessible image alt text, captions and credits;
- commercial labels and separation metadata.

## Portable Text

The body supports paragraphs, headings, block quotes, external and internal
links, editorial images, galleries, embeds, pull quotes, fact boxes, timelines,
FAQ, related content, attachments, tables, external embeds, newsletter/ad
callouts, corrections, source notes and code.

The public renderer explicitly maps supported blocks. Unknown blocks produce a
visible, safe fallback rather than injecting arbitrary HTML. External link and
embed validation happens at both authoring and rendering boundaries.

## Desk structure

`sanity/structure/index.ts` organizes:

- Editorial desk: drafts, assigned, submitted, fact checking, copy editing,
  legal review, approved, scheduled, published, corrections and archive.
- Multimedia: video, shows, episodes and live coverage.
- Taxonomy: categories, topics, tags, locations and series.
- Newsroom: people, departments and teams.
- Website management: homepage, navigation, breaking news, footer, pages,
  redirects and settings.
- Commercial and governance.

Workflow document badges make state visible in lists and editors.

## Roles and permissions

Sanity project roles are the authority. Recommended custom roles:

- Reporter: create/edit assigned drafts, no publish.
- Producer: multimedia documents and assigned stories, no policy or settings.
- Copy editor: edit submitted/copy-editing documents.
- Fact checker: fact-check documents and workflow fields.
- Section editor: desk content, scheduling and publish for scoped categories.
- Managing editor: editorial publish, corrections and homepage curation.
- Legal reviewer: read relevant content and update legal-review status.
- Commercial manager: commercial documents only, never editorial body fields.
- Administrator: project configuration and role assignment.

Configure these in Sanity Manage. Schema field groups improve the editing
experience but are not a security boundary.

## Queries and generated types

Queries live in `sanity/queries`, use `defineQuery`, share projections and pass
parameters rather than concatenating user input. `sanity-typegen.json` points
type generation at the schema and query files.

Run:

```powershell
npm.cmd run sanity:schema
npm.cmd run sanity:typegen
```

Commit the generated types if the team wants CI to detect schema/query drift.
The handwritten domain types currently keep the local fictional fallback and
the Sanity projection aligned.

## Importing the development seed

```powershell
npm.cmd run seed:write
npx.cmd sanity dataset import sanity/seed/development.ndjson production --replace
```

The generated records use deterministic `seed-*` IDs. They are fictional and
safe to replace. Images are deliberately omitted because valid Sanity image
references require uploaded assets.
