import { defineField, defineType } from "sanity";

export const newsletterCallout = defineType({
  name: "newsletterCallout",
  title: "Newsletter callout",
  type: "object",
  fields: [
    defineField({
      name: "newsletter",
      title: "Newsletter",
      type: "reference",
      to: [{ type: "newsletter" }],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "heading", title: "Custom heading", type: "string" }),
  ],
  preview: {
    select: { title: "heading", subtitle: "newsletter.name" },
    prepare: ({ title, subtitle }) => ({
      title: title || subtitle || "Newsletter callout",
      subtitle: "Newsletter callout",
    }),
  },
});

export const adSlotReference = defineType({
  name: "adSlotReference",
  title: "Advertisement slot",
  type: "object",
  fields: [
    defineField({
      name: "placement",
      title: "Placement",
      type: "reference",
      to: [{ type: "adPlacement" }],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "placement.title", subtitle: "placement.key" },
  },
});

export const correctionBlock = defineType({
  name: "correctionBlock",
  title: "Correction / update",
  type: "object",
  fields: [
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      options: {
        list: [
          { title: "Correction", value: "correction" },
          { title: "Clarification", value: "clarification" },
          { title: "Update", value: "update" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Public note",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "text", subtitle: "kind" } },
});

