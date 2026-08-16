import { defineField, defineType } from "sanity";
import { storyTypeOptions } from "../helpers/options";

export const story = defineType({
  name: "story",
  title: "Story",
  type: "document",
  groups: [
    { name: "editorial", title: "Editorial", default: true },
    { name: "taxonomy", title: "Taxonomy" },
    { name: "people", title: "People" },
    { name: "media", title: "Media" },
    { name: "publishing", title: "Publishing" },
    { name: "governance", title: "Governance" },
    { name: "distribution", title: "Distribution" },
  ],
  fields: [
    defineField({
      name: "internalTitle",
      title: "Internal newsroom title",
      type: "string",
      group: "editorial",
      description: "Used in Studio. May be more descriptive than the public headline.",
      validation: (rule) => rule.required().max(180),
    }),
    defineField({
      name: "publicHeadline",
      title: "Public headline",
      type: "string",
      group: "editorial",
      validation: (rule) => rule.required().min(12).max(180),
    }),
    defineField({
      name: "shortHeadline",
      title: "Short headline",
      type: "string",
      group: "editorial",
      validation: (rule) => rule.required().max(85),
    }),
    defineField({
      name: "mobileHeadline",
      title: "Mobile headline",
      type: "string",
      group: "editorial",
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "publishing",
      options: { source: "publicHeadline", maxLength: 96, isUnique: undefined },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Standfirst / summary",
      type: "text",
      rows: 3,
      group: "editorial",
      validation: (rule) => rule.required().min(40).max(420),
    }),
    defineField({
      name: "deck",
      title: "Deck / subtitle",
      type: "text",
      rows: 2,
      group: "editorial",
      validation: (rule) => rule.max(320),
    }),
    defineField({
      name: "kicker",
      title: "Kicker / eyebrow",
      type: "string",
      group: "editorial",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "contentType",
      title: "Content type",
      type: "string",
      group: "editorial",
      options: { list: [...storyTypeOptions] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "bodyContent",
      group: "editorial",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "primaryCategory",
      title: "Primary category",
      type: "reference",
      group: "taxonomy",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "secondaryCategories",
      title: "Secondary categories",
      type: "array",
      group: "taxonomy",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (rule) => rule.unique().max(5),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "taxonomy",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      validation: (rule) => rule.unique().max(20),
    }),
    defineField({
      name: "topics",
      title: "Topics",
      type: "array",
      group: "taxonomy",
      of: [{ type: "reference", to: [{ type: "topic" }] }],
      validation: (rule) => rule.unique().max(10),
    }),
    defineField({
      name: "locations",
      title: "Geographic coverage",
      type: "array",
      group: "taxonomy",
      of: [{ type: "reference", to: [{ type: "location" }] }],
      validation: (rule) => rule.unique().max(12),
    }),
    defineField({
      name: "series",
      title: "Series",
      type: "reference",
      group: "taxonomy",
      to: [{ type: "series" }],
    }),
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      group: "publishing",
      initialValue: "en",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Hausa", value: "ha" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "edition",
      title: "Edition",
      type: "string",
      group: "publishing",
      initialValue: "Global",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "authors",
      title: "Authors",
      type: "array",
      group: "people",
      of: [{ type: "reference", to: [{ type: "person" }] }],
      validation: (rule) => rule.required().min(1).unique(),
    }),
    defineField({
      name: "contributors",
      title: "Contributors and production roles",
      type: "array",
      group: "people",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "person",
              title: "Person",
              type: "reference",
              to: [{ type: "person" }],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "role",
              title: "Contribution",
              type: "string",
              options: {
                list: [
                  "Editor",
                  "Photographer",
                  "Videographer",
                  "Producer",
                  "Fact checker",
                  "Data analysis",
                  "Graphics",
                  "Translation",
                ],
              },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "person.fullName", subtitle: "role", media: "person.profileImage" },
          },
        },
      ],
    }),
    defineField({
      name: "sourceAttribution",
      title: "Source / wire attribution",
      type: "string",
      group: "people",
    }),
    defineField({
      name: "dateline",
      title: "Dateline",
      type: "string",
      group: "editorial",
    }),
    defineField({
      name: "heroMedia",
      title: "Hero media",
      type: "object",
      group: "media",
      fields: [
        defineField({
          name: "kind",
          title: "Hero type",
          type: "string",
          options: {
            list: [
              { title: "Image", value: "image" },
              { title: "Video / audio", value: "media" },
              { title: "None", value: "none" },
            ],
          },
          initialValue: "image",
        }),
        defineField({
          name: "image",
          title: "Hero image",
          type: "editorialImage",
          hidden: ({ parent }) => parent?.kind !== "image",
        }),
        defineField({
          name: "media",
          title: "Hero video / audio",
          type: "mediaEmbed",
          hidden: ({ parent }) => parent?.kind !== "media",
        }),
      ],
    }),
    defineField({
      name: "socialImage",
      title: "Story sharing image",
      type: "editorialImage",
      group: "media",
    }),
    defineField({
      name: "publishedAt",
      title: "Publication date",
      type: "datetime",
      group: "publishing",
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.document as { workflow?: { status?: string } };
          return ["published", "updated", "corrected"].includes(
            parent.workflow?.status || ""
          ) && !value
            ? "Published content requires a publication date."
            : true;
        }),
    }),
    defineField({
      name: "updatedAt",
      title: "Last substantive update",
      type: "datetime",
      group: "publishing",
    }),
    defineField({
      name: "showUpdatedLabel",
      title: "Show updated label",
      type: "boolean",
      group: "publishing",
      initialValue: true,
    }),
    defineField({
      name: "readingTime",
      title: "Reading time (minutes)",
      type: "number",
      group: "publishing",
      validation: (rule) => rule.integer().min(1).max(180),
    }),
    defineField({
      name: "schedule",
      title: "Scheduling and embargo",
      type: "schedule",
      group: "publishing",
    }),
    defineField({
      name: "workflow",
      title: "Workflow",
      type: "workflow",
      group: "publishing",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "relatedStories",
      title: "Related stories",
      type: "array",
      group: "distribution",
      of: [{ type: "reference", to: [{ type: "story" }] }],
      validation: (rule) => rule.unique().max(8),
    }),
    defineField({
      name: "newsletter",
      title: "Associated newsletter",
      type: "reference",
      group: "distribution",
      to: [{ type: "newsletter" }],
    }),
    defineField({
      name: "translations",
      title: "Translations",
      type: "array",
      group: "distribution",
      of: [{ type: "reference", to: [{ type: "story" }] }],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: "homepageEligible",
      title: "Homepage eligible",
      type: "boolean",
      group: "distribution",
      initialValue: true,
    }),
    defineField({
      name: "trendingEligible",
      title: "Trending eligible",
      type: "boolean",
      group: "distribution",
      initialValue: true,
    }),
    defineField({
      name: "breakingEligible",
      title: "Breaking-news eligible",
      type: "boolean",
      group: "distribution",
      initialValue: false,
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "distribution",
      initialValue: false,
    }),
    defineField({
      name: "priority",
      title: "Editorial priority",
      type: "number",
      group: "distribution",
      validation: (rule) => rule.integer().min(0).max(100),
      initialValue: 50,
    }),
    defineField({
      name: "accessStatus",
      title: "Access status",
      type: "string",
      group: "distribution",
      options: {
        list: [
          { title: "Free", value: "free" },
          { title: "Registration required", value: "registered" },
          { title: "Subscriber", value: "subscriber" },
        ],
      },
      initialValue: "free",
    }),
    defineField({
      name: "commentsEnabled",
      title: "Comments enabled",
      type: "boolean",
      group: "distribution",
      initialValue: false,
    }),
    defineField({
      name: "advertising",
      title: "Advertising controls",
      type: "object",
      group: "distribution",
      fields: [
        defineField({
          name: "allowAds",
          title: "Allow advertising",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "excludePlacements",
          title: "Excluded placements",
          type: "array",
          of: [{ type: "reference", to: [{ type: "adPlacement" }] }],
        }),
      ],
    }),
    defineField({
      name: "correctionNote",
      title: "Public correction note",
      type: "text",
      rows: 3,
      group: "governance",
    }),
    defineField({
      name: "editorsNote",
      title: "Public editor's note",
      type: "text",
      rows: 3,
      group: "governance",
    }),
    defineField({
      name: "disclosure",
      title: "Disclosure",
      type: "text",
      rows: 3,
      group: "governance",
    }),
    defineField({
      name: "sponsoredBy",
      title: "Sponsored by",
      type: "reference",
      group: "governance",
      to: [{ type: "advertiser" }],
      hidden: ({ document }) => document?.contentType !== "sponsored",
      validation: (rule) =>
        rule.custom((value, context) =>
          context.document?.contentType === "sponsored" && !value
            ? "Sponsored content requires an advertiser."
            : true
        ),
    }),
    defineField({
      name: "sponsoredDisclosure",
      title: "Sponsored-content disclosure",
      type: "text",
      rows: 2,
      group: "governance",
      hidden: ({ document }) => document?.contentType !== "sponsored",
      validation: (rule) =>
        rule.custom((value, context) =>
          context.document?.contentType === "sponsored" && !value
            ? "Sponsored content requires a clear disclosure."
            : true
        ),
    }),
    defineField({
      name: "contentWarning",
      title: "Content warning",
      type: "string",
      group: "governance",
    }),
    defineField({
      name: "sensitiveContent",
      title: "Sensitive content",
      type: "boolean",
      group: "governance",
      initialValue: false,
    }),
    defineField({
      name: "copyright",
      title: "Copyright note",
      type: "string",
      group: "governance",
    }),
    defineField({
      name: "originalPublication",
      title: "Original publication reference",
      type: "url",
      group: "governance",
    }),
    defineField({
      name: "retractionReason",
      title: "Retraction reason",
      type: "text",
      rows: 4,
      group: "governance",
      hidden: ({ document }) =>
        (document?.workflow as { status?: string } | undefined)?.status !==
        "retracted",
      validation: (rule) =>
        rule.custom((value, context) =>
          context.document?.workflow &&
          (context.document.workflow as { status?: string }).status ===
            "retracted" &&
          !value
            ? "Retracted stories require a public reason."
            : true
        ),
    }),
    defineField({
      name: "seo",
      title: "SEO and social metadata",
      type: "seo",
      group: "distribution",
    }),
  ],
  preview: {
    select: {
      title: "publicHeadline",
      internalTitle: "internalTitle",
      subtitle: "primaryCategory.title",
      status: "workflow.status",
      date: "publishedAt",
      media: "heroMedia.image",
    },
    prepare: ({ title, internalTitle, subtitle, status, date, media }) => ({
      title: title || internalTitle || "Untitled story",
      subtitle: [status, subtitle, date ? new Date(date).toLocaleDateString() : null]
        .filter(Boolean)
        .join(" · "),
      media,
    }),
  },
});
