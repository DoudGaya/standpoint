import { defineField, defineType } from "sanity";
import { isAfter } from "../helpers/validation";

export const liveEvent = defineType({
  name: "liveEvent",
  title: "Live coverage",
  type: "document",
  groups: [
    { name: "overview", title: "Overview", default: true },
    { name: "entries", title: "Live entries" },
    { name: "publishing", title: "Publishing" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Live event title",
      type: "string",
      group: "overview",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "publishing",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      group: "overview",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Live status",
      type: "string",
      group: "publishing",
      options: {
        list: ["Scheduled", "Live", "Paused", "Ended", "Archived"],
      },
      initialValue: "Scheduled",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "startAt",
      title: "Start time",
      type: "datetime",
      group: "publishing",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endAt",
      title: "End time",
      type: "datetime",
      group: "publishing",
      validation: (rule) =>
        rule.custom((value, context) => isAfter(value, context, "startAt")),
    }),
    defineField({
      name: "cover",
      title: "Cover image",
      type: "editorialImage",
      group: "overview",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "editors",
      title: "Lead editors",
      type: "array",
      group: "overview",
      of: [{ type: "reference", to: [{ type: "person" }] }],
      validation: (rule) => rule.required().min(1).unique(),
    }),
    defineField({
      name: "reporters",
      title: "Reporters",
      type: "array",
      group: "overview",
      of: [{ type: "reference", to: [{ type: "person" }] }],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: "mainStory",
      title: "Related main story",
      type: "reference",
      group: "overview",
      to: [{ type: "story" }],
    }),
    defineField({
      name: "keyPoints",
      title: "Key points",
      type: "array",
      group: "overview",
      of: [{ type: "string" }],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: "entries",
      title: "Live entries",
      type: "array",
      group: "entries",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "timestamp",
              title: "Timestamp",
              type: "datetime",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "author",
              title: "Author",
              type: "reference",
              to: [{ type: "person" }],
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "headline", title: "Headline", type: "string" }),
            defineField({
              name: "body",
              title: "Update",
              type: "bodyContent",
              validation: (rule) => rule.required().min(1),
            }),
            defineField({ name: "media", title: "Media", type: "mediaEmbed" }),
            defineField({ name: "location", title: "Location", type: "string" }),
            defineField({
              name: "importance",
              title: "Importance",
              type: "string",
              options: { list: ["Standard", "Key", "Critical"] },
              initialValue: "Standard",
            }),
            defineField({
              name: "pinned",
              title: "Pin this update",
              type: "boolean",
              initialValue: false,
            }),
            defineField({ name: "correction", title: "Correction", type: "text" }),
          ],
          preview: {
            select: {
              title: "headline",
              timestamp: "timestamp",
              author: "author.fullName",
              pinned: "pinned",
            },
            prepare: ({ title, timestamp, author, pinned }) => ({
              title: `${pinned ? "PINNED · " : ""}${title || "Live update"}`,
              subtitle: [timestamp, author].filter(Boolean).join(" · "),
            }),
          },
        },
      ],
    }),
    defineField({
      name: "refreshSeconds",
      title: "Fallback refresh interval",
      type: "number",
      group: "publishing",
      initialValue: 30,
      validation: (rule) => rule.integer().min(15).max(300),
    }),
    defineField({
      name: "updatedAt",
      title: "Last updated",
      type: "datetime",
      group: "publishing",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "publishing" }),
  ],
  preview: {
    select: { title: "title", subtitle: "status", media: "cover" },
  },
});

