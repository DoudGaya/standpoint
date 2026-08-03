# GlobHub Media — Sanity Desk Guide
## A Reference Manual for Editors, Managers, and Staff

This guide provides a comprehensive overview of the **GlobHub Media Sanity Studio**. It outlines the workspace structure, details the editorial workflow, defines every field across the core document models, and explains how updates are published and instantly reflected on the live website.

---

## 1. Accessing Sanity Studio

Managers and staff can access the CMS interface at:
* **Production**: `https://<your-website-domain>/studio`
* **Development (Local)**: `http://localhost:3000/studio`

### Connection Status
* **Connected**: When correctly configured with environment variables, the Studio links directly to the production or staging dataset.
* **Fictional Local Dataset**: If environment variables are missing, the Studio fallback alerts the user.

---

## 2. Instant Web Updates (Real-Time Sync)

GlobHub Media is engineered so that content changes made in the Sanity Desk are synced immediately to the public site without needing manual rebuilds. This instant reflection relies on two separate mechanisms:

### A. Real-Time Previews (While Writing/Drafting)
* **How it works**: Inside the Sanity Studio, editors can use the **Presentation Tool** to view pages exactly as they look live.
* **Under the Hood**: Clicking the preview link prompts Sanity to call the site's `/api/draft-mode/enable` endpoint. This sets a secure cookie enabling Next.js **Draft Mode**. 
* **Live Updates**: While in Draft Mode, the public site uses a server-side read token (`SANITY_API_READ_TOKEN`) to pull **draft** documents directly from Sanity. The `next-sanity/live` engine streams keystroke-level changes to the preview panel without requiring you to publish first.

### B. Instant Production Revalidation (After Publishing)
* **How it works**: Once a document is officially published, updated, deleted, or retracted, the cached public version of the webpage must be refreshed immediately.
* **Under the Hood**: A webhook configured in the Sanity Manage Dashboard monitors document events and sends a `POST` request to the site's `/api/revalidate` endpoint.
* **Webhook Setup Instructions**:
  Managers can configure the automatic invalidation in the [Sanity Manage Portal](https://manage.sanity.io):
  1. Navigate to **API** > **Webhooks** > **Create Webhook**.
  2. Set the **URL** to: `https://<your-website-domain>/api/revalidate`
  3. Set **Dataset** to: `production`
  4. Set **Trigger On**: `Create`, `Update`, `Delete`.
  5. In **HTTP Headers**, add a custom header:
     * Header name: `x-sanity-revalidate-secret`
     * Header value: *[Must match the value of `SANITY_REVALIDATE_SECRET` set in your `.env` file]*
  6. **Projection**: Set the projection body to send the type and slugs:
     ```json
     {
       "_type": _type,
       "slug": slug,
       "categorySlug": primaryCategory->slug.current
     }
     ```
  7. Save the webhook. Once active, any published update will clear the Next.js cache and go live on the site instantly (typically under 1 second).

---

## 3. The Editorial Workflow States

Documents move through a structured pipeline in the Studio, visible via workflow status badges on documents:

```
[Draft] ➔ [Assigned] ➔ [In-Progress] ➔ [Submitted] ➔ [Fact-Checking] ➔ [Copy-Editing] ➔ [Legal-Review] ➔ [Approved] ➔ [Scheduled] ➔ [Published]
```

### Workflow Badges & Transitions:
1. **Draft**: Initial sandbox state. Only visible in the editor's workspace.
2. **Assigned**: The story is delegated to a specific reporter.
3. **In-Progress**: The reporter is actively writing and assembling media.
4. **Submitted**: Draft is completed and sent to the editorial desk.
5. **Fact-Checking**: Material claims are researched and verified by a fact-checker.
6. **Copy-Editing**: Copy editors refine readability, links, alt text, and SEO fields.
7. **Legal-Review**: Sensitive coverage is paused for legal counsel approval.
8. **Approved**: The piece is cleared for scheduling or immediate release.
9. **Scheduled**: Embargo dates are verified. The story will automatically publish at the specified UTC datetime.
10. **Published**: The document is live on the public site.

*Note: For post-publication changes, documents can be updated via the `Updated`, `Corrected`, `Retracted`, or `Archived` states.*

---

## 4. Comprehensive Field Directory

Each document type has defined fields, constraints, and validation rules. Below is the directory of all schemas on the Sanity Desk.

---

### A. Story (`story`)
Used for articles, reports, opinion pieces, features, and sponsored content.

#### 1. Group: Editorial (Core Content)
* **Internal newsroom title (`internalTitle`)**
  * *Type*: String
  * *Description*: Used strictly for internal organization in the Studio. Can be more descriptive than the public headline.
  * *Rules*: Required. Max 180 characters.
* **Public headline (`publicHeadline`)**
  * *Type*: String
  * *Description*: Main title displayed on the site.
  * *Rules*: Required. Min 12, Max 180 characters.
* **Short headline (`shortHeadline`)**
  * *Type*: String
  * *Description*: Compact headline used in grids and list views where space is tight.
  * *Rules*: Required. Max 85 characters.
* **Mobile headline (`mobileHeadline`)**
  * *Type*: String
  * *Description*: Optimized short headline for mobile layouts.
  * *Rules*: Max 70 characters.
* **Standfirst / summary (`summary`)**
  * *Type*: Text (3 rows)
  * *Description*: Introductory paragraph summarizing the article (manifests as sub-headline).
  * *Rules*: Required. Min 40, Max 420 characters.
* **Deck / subtitle (`deck`)**
  * *Type*: Text (2 rows)
  * *Description*: Additional secondary summary lines.
  * *Rules*: Max 320 characters.
* **Kicker / eyebrow (`kicker`)**
  * *Type*: String
  * *Description*: Short label displayed above the headline (e.g., "EXCLUSIVE", "ANALYSIS").
  * *Rules*: Max 60 characters.
* **Content type (`contentType`)**
  * *Type*: Dropdown list
  * *Options*: `news`, `analysis`, `feature`, `investigation`, `opinion`, `editorial`, `explainer`, `interview`, `photo-essay`, `sponsored`.
  * *Rules*: Required.
* **Body (`body`)**
  * *Type*: Portable Text (Rich Text Editor)
  * *Description*: Main article text supporting headings, block quotes, tables, and media embeds.
  * *Rules*: Required. Min 1 block.
* **Dateline (`dateline`)**
  * *Type*: String
  * *Description*: Geographic location of the reporting origin (e.g., "LONDON —").

#### 2. Group: Taxonomy (Classification)
* **Primary category (`primaryCategory`)**
  * *Type*: Reference to Category document
  * *Description*: Determines the primary navigation section and URL structure.
  * *Rules*: Required.
* **Secondary categories (`secondaryCategories`)**
  * *Type*: Array of references to Category documents
  * *Rules*: Unique values. Max 5 items.
* **Tags (`tags`)**
  * *Type*: Array of references to Tag documents
  * *Rules*: Unique values. Max 20 items.
* **Topics (`topics`)**
  * *Type*: Array of references to Topic documents
  * *Rules*: Unique values. Max 10 items.
* **Geographic coverage (`locations`)**
  * *Type*: Array of references to Location documents
  * *Rules*: Unique values. Max 12 items.
* **Series (`series`)**
  * *Type*: Reference to Series document
  * *Description*: Groups stories under an ongoing editorial series name.

#### 3. Group: People
* **Authors (`authors`)**
  * *Type*: Array of references to Person documents
  * *Rules*: Required. Min 1 author. Unique values.
* **Contributors and production roles (`contributors`)**
  * *Type*: Array of Objects (Reference to Person + string list)
  * *Role Dropdown*: `Editor`, `Photographer`, `Videographer`, `Producer`, `Fact checker`, `Data analysis`, `Graphics`, `Translation`.
* **Source / wire attribution (`sourceAttribution`)**
  * *Type*: String
  * *Description*: Credit external news wires (e.g., "Reuters", "Associated Press").

#### 4. Group: Media
* **Hero media (`heroMedia`)**
  * *Type*: Object containing:
    * *Hero type (`kind`)*: Dropdown (`image`, `media`, `none`).
    * *Hero image (`image`)*: Reference to Editorial Image. Hidden if type is not `image`.
    * *Hero video / audio (`media`)*: URL/Embed. Hidden if type is not `media`.
* **Story sharing image (`socialImage`)**
  * *Type*: Reference to Editorial Image
  * *Description*: Overrides the main hero image when shared on social channels.

#### 5. Group: Publishing
* **URL slug (`slug`)**
  * *Type*: Slug
  * *Description*: The path suffix for the story (e.g. `my-headline-story`). Generates automatically from the Public Headline.
  * *Rules*: Required. Unique. Max 96 characters.
* **Language (`language`)**
  * *Type*: String (Default: `en`)
  * *Rules*: Required.
* **Edition (`edition`)**
  * *Type*: String (Default: `Global`)
  * *Rules*: Required.
* **Publication date (`publishedAt`)**
  * *Type*: Datetime
  * *Rules*: Required if workflow status is set to `published`, `updated`, or `corrected`.
* **Last substantive update (`updatedAt`)**
  * *Type*: Datetime
* **Show updated label (`showUpdatedLabel`)**
  * *Type*: Boolean (Default: `true`)
* **Reading time (`readingTime`)**
  * *Type*: Number
  * *Rules*: Integer between 1 and 180 (minutes).
* **Scheduling and embargo (`schedule`)**
  * *Type*: Object (startsAt datetime, expiresAt datetime).
* **Workflow (`workflow`)**
  * *Type*: Object (status string, notes/revisions log).
  * *Rules*: Required.

#### 6. Group: Distribution
* **Related stories (`relatedStories`)**
  * *Type*: Array of references to other Story documents
  * *Rules*: Unique values. Max 8 items.
* **Associated newsletter (`newsletter`)**
  * *Type*: Reference to Newsletter document
* **Translations (`translations`)**
  * *Type*: Array of references to other Story versions
* **Homepage eligible (`homepageEligible`)**
  * *Type*: Boolean (Default: `true`)
* **Trending eligible (`trendingEligible`)**
  * *Type*: Boolean (Default: `true`)
* **Breaking-news eligible (`breakingEligible`)**
  * *Type*: Boolean (Default: `false`)
* **Featured (`featured`)**
  * *Type*: Boolean (Default: `false`)
* **Editorial priority (`priority`)**
  * *Type*: Number (Default: `50`)
  * *Rules*: Integer between 0 and 100. Higher numbers rank higher in content collections.
* **Access status (`accessStatus`)**
  * *Type*: Dropdown list (`free`, `registered`, `subscriber`).
  * *Default*: `free`
* **Comments enabled (`commentsEnabled`)**
  * *Type*: Boolean (Default: `false`)
* **Advertising controls (`advertising`)**
  * *Type*: Object containing:
    * *Allow advertising (`allowAds`)*: Boolean (Default: `true`)
    * *Excluded placements (`excludePlacements`)*: Array of references to Ad Placement configurations.
* **SEO and social metadata (`seo`)**
  * *Type*: SEO object (SEO Title, Meta Description, Keywords, Focus Phrase).

#### 7. Group: Governance (Accountability & Policy)
* **Public correction note (`correctionNote`)**
  * *Type*: Text (3 rows)
  * *Description*: Visible note detailing what was changed and why (for transparent corrections).
* **Public editor's note (`editorsNote`)**
  * *Type*: Text (3 rows)
* **Disclosure (`disclosure`)**
  * *Type*: Text (3 rows)
  * *Description*: Details any conflicts of interest or reporter affiliations.
* **Sponsored by (`sponsoredBy`)**
  * *Type*: Reference to Advertiser document.
  * *Rules*: Required if Content Type is set to `sponsored`.
* **Sponsored-content disclosure (`sponsoredDisclosure`)**
  * *Type*: Text (2 rows).
  * *Rules*: Required if Content Type is set to `sponsored`.
* **Content warning (`contentWarning`)**
  * *Type*: String (e.g. "Graphic violence description").
* **Sensitive content (`sensitiveContent`)**
  * *Type*: Boolean (Default: `false`).
* **Copyright note (`copyright`)**
  * *Type*: String.
* **Original publication reference (`originalPublication`)**
  * *Type*: URL.
* **Retraction reason (`retractionReason`)**
  * *Type*: Text (4 rows).
  * *Rules*: Required if workflow status is set to `retracted`.

---

### B. Homepage Curation (`homepage`)
A singleton document representing the main page layout modules.

* **Internal title (`title`)**
  * *Type*: String (ReadOnly, defaults to "GlobHub homepage").
* **Homepage modules (`modules`)**
  * *Type*: Array of Homepage Module blocks.
  * *Rules*: Required. Min 1, Max 30 modules.
  * *Description*: Editors can append, remove, or rearrange layout stripes (e.g. Lead Story Block, Category Grids, Carousel, Newsletter promo).
* **Internal curation notes (`notes`)**
  * *Type*: Text (4 rows).

---

### C. Main Navigation (`navigation`)
Controls header and mobile menus.

* **Utility links (`utilityLinks`)**
  * *Type*: Array of label/href path pairs (e.g., "Account" linking to `/account`).
  * *Rules*: Paths must start with `/` or be valid HTTPS URLs.
* **Category navigation (`categories`)**
  * *Type*: Array of navigation objects:
    * *Category*: Reference to Category document (Required).
    * *Label override*: String (Custom menu link name).
    * *Order*: Number (Required, determines left-to-right order).
    * *Show*: Boolean (Default: `true`).
    * *Featured*: Boolean (Default: `false`).
    * *Mega Menu*: Boolean (Default: `false`, renders large mega-grid dropdown on hover).
    * *Direct URL override*: String (Directs click away from the default category route).
* **Default edition (`edition`)**
  * *Type*: String (Default: `Global`).
* **Default language label (`language`)**
  * *Type*: String (Default: `English`).
* **Display Toggles**:
  * *Show date (`showDate`)*: Boolean.
  * *Show live links (`showLive`)*: Boolean.
  * *Show newsletter links (`showNewsletter`)*: Boolean.
  * *Show account placeholder (`showAccount`)*: Boolean.

---

### D. Breaking News Bar (`breakingNews`)
Curates red alerts spanning the top navigation header.

* **Enabled (`enabled`)**
  * *Type*: Boolean (Global toggle for the entire breaking ticker).
* **Auto-rotate headlines (`autoRotate`)**
  * *Type*: Boolean (Automatically scroll through multiple active alerts).
* **Rotation interval (`rotationSeconds`)**
  * *Type*: Number (Default: `8` seconds).
  * *Rules*: Integer between 5 and 60.
* **Headlines (`items`)**
  * *Type*: Array of alert objects:
    * *Enabled*: Boolean.
    * *Label*: String (Default: "Breaking").
    * *Headline*: String (Alert text. Max 180 chars. Required).
    * *Story*: Reference to a Story page.
    * *External URL*: URL (e.g., external breaking coverage).
    * *Priority*: Number (0-100 rating).
    * *Starts at (`startsAt`)*: Datetime (Required).
    * *Expires at (`expiresAt`)*: Datetime (Required. Must be chronologically *after* Starts At).

---

### E. Site Settings (`siteSettings`)
Global metadata and configuration.

* **Site title (`title`)**
  * *Type*: String (Default: "GlobHub Media").
* **Short title (`shortTitle`)**
  * *Type*: String (Default: "GlobHub").
* **Site description (`description`)**
  * *Type*: Text.
* **Logo (`logo`)**
  * *Type*: Image asset.
* **Production URL (`siteUrl`)**
  * *Type*: URL.
* **Public contact email (`contactEmail`)**
  * *Type*: Email.
* **Corrections email (`correctionsEmail`)**
  * *Type*: Email.
* **Social links (`socialLinks`)**
  * *Type*: Array of label/URL objects.
* **Enable comments globally (`commentsEnabled`)**
  * *Type*: Boolean.
* **Analytics provider (`analyticsProvider`)**
  * *Type*: Dropdown (`none`, `first-party`, `plausible`, `google`).
* **Enable reader accounts (`enableReaderAccounts`)**
  * *Type*: Boolean.

---

### F. Footer (`footer`)
Curates the site map at the base of every page.

* **Link columns (`columns`)**
  * *Type*: Array of columns containing titles and arrays of label/path items.
* **Copyright line (`copyright`)**
  * *Type*: String.
* **Footer disclaimer (`disclaimer`)**
  * *Type*: Text (e.g., terms of service or demo warning text).

---

### G. Redirects (`redirect`)
Handles legacy URL mapping to avoid 404 errors.

* **Old local path (`source`)**
  * *Type*: String (e.g., `/old-slug-path`).
  * *Rules*: Required. Must begin with `/` and not double slash `//`.
* **Destination (`destination`)**
  * *Type*: String (e.g., `/story/new-slug-path` or `https://another-site.com`).
  * *Rules*: Required. Local path or valid HTTPS URL.
* **Permanent (308) (`permanent`)**
  * *Type*: Boolean (Default: `true`). Tells search engines the change is permanent.
* **Active (`active`)**
  * *Type*: Boolean (Default: `true`).
* **Internal note (`note`)**
  * *Type*: String.

---

### H. Fact Checks (`factCheck`)
Records structured ratings of public statements.

* **Claim (`claim`)**
  * *Type*: String (The statement being audited).
* **Claimant (`claimant`)**
  * *Type*: String (The person/organization who made the statement).
* **Origin (`origin`)**
  * *Type*: String (Where it was said, e.g., "TV Interview").
* **Claim Date (`claimDate`)**
  * *Type*: Date.
* **Verdict rating (`verdict`)**
  * *Type*: Dropdown rating (e.g., `True`, `Mostly True`, `Half True`, `Mostly False`, `False`, `Pants on Fire`).
* **Conclusion (`conclusion`)**
  * *Type*: Text (Short summary reasoning).
* **Analysis and source notes (`analysis`)**
  * *Type*: Portable Text (Detailed evidence walkthrough).

---

### I. Live Events (`liveEvent`)
Powers live chronological blogging feeds (e.g. elections, breaking situations).

* **Status (`status`)**
  * *Type*: Dropdown (`active`, `paused`, `completed`).
* **Timeline entries (`entries`)**
  * *Type*: Array of updates sorted chronologically. Each update contains:
    * *Timestamp*: Datetime (Required).
    * *Author*: Reference to Person (Required).
    * *Markdown Body*: Text.
    * *Key point*: Boolean (Toggles highlight status).
    * *Pinned*: Boolean (Pins update to the top of the live feed).
