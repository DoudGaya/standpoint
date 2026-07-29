# Content editor guide

## Start in Studio

Open `/studio` and choose a desk from the left navigation. If the connection
screen appears, the application is running its fictional local dataset and a
developer must configure the Sanity project.

## Create a story

1. Create a Story and enter the internal title.
2. Write the public, short and mobile headlines.
3. Add the standfirst, kicker, content type and Portable Text body.
4. Select one primary category and optional secondary taxonomy.
5. Add authors and contributor roles.
6. Add hero imagery with meaningful alt text, caption and credit.
7. Complete disclosures, warnings, source notes and sponsorship fields.
8. Review distribution and SEO fields.
9. Update the workflow state and revision summary.

Use headings in order; do not use heading styles only to make text large.
Describe image purpose, not “image of”. Captions state what readers need to
know; credits state ownership/source.

## Homepage and navigation

Homepage modules are an ordered array. Editors can enable modules, select a
layout and curate stories or a category source. Keep one dominant lead and avoid
repeating the same story throughout the page.

Navigation is data-driven. Category entries control order, mobile/desktop
visibility and mega-menu behavior. Test menu changes on narrow and wide screens
before publishing.

Breaking items must have a start, expiry and destination. Remove obsolete
alerts; do not use the ticker as a permanent promotional strip.

## Media

Use the media embed object for approved providers. Paste the canonical HTTPS
URL, add a title/accessibility label, caption and transcript or equivalent when
available. The website refuses arbitrary iframe HTML.

Podcast episodes require a reviewed audio URL, summary, duration and publication
time. A transcript is strongly recommended. Live coverage needs status,
editors, key points and attributed entries.

## Fact checks

Record the exact claim, claimant, origin and claim date. Select a verdict only
after the methodology review. The conclusion should be short; the analysis and
source note should make the reasoning reproducible. Link related fact checks
when a claim evolves.

## Redirects

Create a redirect when a published slug or legacy URL changes. Sources must be
local paths and targets must be local paths or reviewed HTTPS URLs. Avoid
redirect chains; point directly to the final canonical URL.

## Preview

Use the Presentation tool or a signed Draft Mode link. Click-to-edit overlays
appear only with a configured Viewer token. Exit with
`/api/draft-mode/disable`; do not share a preview cookie or token.

## Legal and policy copy

Development legal pages are clearly marked for review. Editing them does not
turn them into legal advice. Obtain publication-specific review for privacy,
cookies, terms, accessibility, employment, advertising and tip-handling text.
