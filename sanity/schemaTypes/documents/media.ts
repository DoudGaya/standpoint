import { defineField, defineType } from "sanity";

export const video = defineType({
  name: "video",
  title: "Video",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Media" },
    { name: "publishing", title: "Publishing" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(180),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "publishing",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "media",
      title: "Video source",
      type: "mediaEmbed",
      group: "media",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "series",
      title: "Series",
      type: "reference",
      group: "content",
      to: [{ type: "series" }],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      group: "content",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "presenters",
      title: "Presenters / producers",
      type: "array",
      group: "content",
      of: [{ type: "reference", to: [{ type: "person" }] }],
    }),
    defineField({
      name: "live",
      title: "Live stream",
      type: "boolean",
      group: "publishing",
      initialValue: false,
    }),
    defineField({
      name: "scheduledStart",
      title: "Scheduled start",
      type: "datetime",
      group: "publishing",
      hidden: ({ document }) => document?.live !== true,
    }),
    defineField({
      name: "scheduledEnd",
      title: "Scheduled end",
      type: "datetime",
      group: "publishing",
      hidden: ({ document }) => document?.live !== true,
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "publishing",
    }),
    defineField({
      name: "workflow",
      title: "Workflow",
      type: "workflow",
      group: "publishing",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "publishing" }),
  ],
  preview: {
    select: {
      title: "title",
      provider: "media.provider",
      live: "live",
      media: "media.poster",
    },
    prepare: ({ title, provider, live, media }) => ({
      title,
      subtitle: `${live ? "LIVE · " : ""}${provider || "No provider"}`,
      media,
    }),
  },
});

export const podcastShow = defineType({
  name: "podcastShow",
  title: "Podcast show",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cover",
      title: "Cover art",
      type: "editorialImage",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "frequency",
      title: "Frequency",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "host",
      title: "Host",
      type: "reference",
      to: [{ type: "person" }],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "externalUrl", title: "External show URL", type: "url" }),
    defineField({ name: "rssUrl", title: "External RSS URL", type: "url" }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { select: { title: "title", subtitle: "frequency", media: "cover" } },
});

export const podcastEpisode = defineType({
  name: "podcastEpisode",
  title: "Podcast episode",
  type: "document",
  fields: [
    defineField({
      name: "show",
      title: "Show",
      type: "reference",
      to: [{ type: "podcastShow" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "audio",
      title: "Audio source",
      type: "mediaEmbed",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "episodeNumber",
      title: "Episode number",
      type: "number",
      validation: (rule) => rule.integer().min(1),
    }),
    defineField({ name: "publishedAt", title: "Published at", type: "datetime" }),
    defineField({ name: "workflow", title: "Workflow", type: "workflow" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    select: {
      title: "title",
      show: "show.title",
      number: "episodeNumber",
      media: "audio.poster",
    },
    prepare: ({ title, show, number, media }) => ({
      title,
      subtitle: `${show || "Podcast"}${number ? ` · Episode ${number}` : ""}`,
      media,
    }),
  },
});

export const radioBulletin = defineType({
  name: "radioBulletin",
  title: "GlobHub Radio Bulletin",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title (English)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "titleHa",
      title: "Title (Hausa)",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary (English)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "summaryHa",
      title: "Summary (Hausa)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "bulletinType",
      title: "Bulletin type",
      type: "string",
      options: {
        list: [
          { title: "Hourly News Briefing", value: "hourly" },
          { title: "Daily Headlines", value: "daily" },
          { title: "Breaking News Audio", value: "breaking" },
          { title: "Narrated Article", value: "article" },
        ],
      },
      initialValue: "hourly",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "language",
      title: "Language setting",
      type: "string",
      options: {
        list: [
          { title: "English (en)", value: "en" },
          { title: "Hausa (ha)", value: "ha" },
          { title: "All languages", value: "all" },
        ],
      },
      initialValue: "all",
    }),
    defineField({
      name: "audioUrl",
      title: "Audio URL / Stream link",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration (e.g. 3:45)",
      type: "string",
      initialValue: "3:30",
    }),
    defineField({
      name: "presenter",
      title: "Presenter / Anchor",
      type: "string",
    }),
    defineField({
      name: "cover",
      title: "Cover / Thumbnail image",
      type: "editorialImage",
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", titleHa: "titleHa", type: "bulletinType", media: "cover" },
    prepare: ({ title, titleHa, type, media }) => ({
      title: titleHa ? `${title} / ${titleHa}` : title,
      subtitle: `Radio Bulletin · ${type || "General"}`,
      media,
    }),
  },
});

