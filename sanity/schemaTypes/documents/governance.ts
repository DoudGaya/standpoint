import { defineField, defineType } from "sanity";

export const correction = defineType({
  name: "correction",
  title: "Correction / retraction",
  type: "document",
  fields: [
    defineField({
      name: "kind",
      title: "Type",
      type: "string",
      options: { list: ["Correction", "Clarification", "Retraction"] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "story",
      title: "Affected story",
      type: "reference",
      to: [{ type: "story" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publicNote",
      title: "Public note",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "internalSummary",
      title: "Internal summary",
      type: "text",
      rows: 4,
      description: "Never project publicly.",
    }),
    defineField({
      name: "approvedBy",
      title: "Approved by",
      type: "reference",
      to: [{ type: "person" }],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "story.publicHeadline", kind: "kind", date: "publishedAt" },
    prepare: ({ title, kind, date }) => ({
      title: `${kind || "Correction"}: ${title || "Story"}`,
      subtitle: date,
    }),
  },
});

export const editorialPolicy = defineType({
  name: "editorialPolicy",
  title: "Editorial policy",
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
      name: "kind",
      title: "Policy type",
      type: "string",
      options: {
        list: [
          "Editorial standards",
          "Corrections policy",
          "Fact-checking methodology",
          "Community guidelines",
          "Diversity statement",
          "Ownership and funding",
          "Legal",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Content",
      type: "bodyContent",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: "reviewedAt", title: "Last reviewed", type: "date" }),
    defineField({
      name: "reviewOwner",
      title: "Review owner",
      type: "reference",
      to: [{ type: "person" }],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { select: { title: "title", subtitle: "kind" } },
});

