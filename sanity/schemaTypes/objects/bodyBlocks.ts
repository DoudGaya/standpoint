import { defineField, defineType } from "sanity";
import { isHttpsUrl } from "../helpers/validation";

export const pullQuote = defineType({
  name: "pullQuote",
  title: "Pull quote",
  type: "object",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().max(450),
    }),
    defineField({ name: "attribution", title: "Attribution", type: "string" }),
  ],
  preview: { select: { title: "quote", subtitle: "attribution" } },
});

export const factBox = defineType({
  name: "factBox",
  title: "Fact / key points box",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      title: "Points",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1).max(12),
    }),
  ],
  preview: { select: { title: "title" } },
});

export const gallery = defineType({
  name: "gallery",
  title: "Image gallery",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Gallery title",
      type: "string",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "editorialImage" }],
      validation: (rule) => rule.required().min(2).max(30),
    }),
  ],
  preview: { select: { title: "title", media: "images.0" } },
});

export const timeline = defineType({
  name: "timeline",
  title: "Timeline",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      title: "Entries",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "date",
              title: "Date / time label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
          ],
          preview: { select: { title: "title", subtitle: "date" } },
        },
      ],
      validation: (rule) => rule.required().min(2),
    }),
  ],
  preview: { select: { title: "title" } },
});

export const faqBlock = defineType({
  name: "faqBlock",
  title: "Frequently asked questions",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Heading", type: "string" }),
    defineField({
      name: "items",
      title: "Questions",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "array",
              of: [{ type: "block" }],
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "question" } },
        },
      ],
    }),
  ],
  preview: { select: { title: "title" } },
});

export const relatedContent = defineType({
  name: "relatedContent",
  title: "Related content",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Heading", type: "string" }),
    defineField({
      name: "stories",
      title: "Stories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "story" }] }],
      validation: (rule) => rule.required().min(1).max(6),
    }),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: title || "Related content" }) },
});

export const sourceNote = defineType({
  name: "sourceNote",
  title: "Source note",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Heading", type: "string" }),
    defineField({
      name: "sources",
      title: "Sources",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) =>
                rule.required().custom((value) =>
                  isHttpsUrl(value) ? true : "Use a valid HTTPS URL."
                ),
            }),
          ],
          preview: { select: { title: "label", subtitle: "url" } },
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: title || "Source note" }) },
});

export const dataTable = defineType({
  name: "dataTable",
  title: "Data table",
  type: "object",
  fields: [
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "columns",
      title: "Columns",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(2).max(12),
    }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "cells",
              title: "Cells",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: {
            select: { cells: "cells" },
            prepare: ({ cells }) => ({
              title: Array.isArray(cells) ? cells.join(" · ") : "Row",
            }),
          },
        },
      ],
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
    }),
  ],
  preview: { select: { title: "caption", subtitle: "source" } },
});

export const documentAttachment = defineType({
  name: "documentAttachment",
  title: "Document / download",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({
      name: "file",
      title: "File",
      type: "file",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "title", subtitle: "description" } },
});

export const externalEmbed = defineType({
  name: "externalEmbed",
  title: "Approved data / map embed",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      options: {
        list: [
          { title: "Map", value: "map" },
          { title: "Data visualization", value: "data-visualization" },
          { title: "Social post", value: "social" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "Approved HTTPS URL",
      type: "url",
      validation: (rule) =>
        rule.required().custom((value) =>
          isHttpsUrl(value) ? true : "Use a valid HTTPS URL."
        ),
    }),
    defineField({
      name: "fallbackDescription",
      title: "Accessible fallback",
      type: "text",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "title", subtitle: "kind" } },
});

export const codeSnippet = defineType({
  name: "codeSnippet",
  title: "Code snippet",
  type: "object",
  fields: [
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "code",
      title: "Code",
      type: "text",
      rows: 12,
      validation: (rule) => rule.required().max(20000),
    }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
  ],
  preview: { select: { title: "caption", subtitle: "language" } },
});

