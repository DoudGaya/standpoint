import { defineField, defineType } from "sanity";

export const newsletter = defineType({
  name: "newsletter",
  title: "Newsletter",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
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
      name: "frequency",
      title: "Frequency",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cover",
      title: "Cover image",
      type: "editorialImage",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "editorialOwner",
      title: "Editorial owner",
      type: "reference",
      to: [{ type: "person" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "provider",
      title: "External provider",
      type: "string",
      description: "Configuration label only; secrets remain server-side.",
    }),
    defineField({
      name: "signupUrl",
      title: "External signup URL",
      type: "url",
    }),
    defineField({
      name: "privacyDisclaimer",
      title: "Privacy disclaimer",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    select: { title: "name", subtitle: "frequency", media: "cover" },
  },
});

export const newsletterEdition = defineType({
  name: "newsletterEdition",
  title: "Newsletter edition",
  type: "document",
  fields: [
    defineField({
      name: "newsletter",
      title: "Newsletter",
      type: "reference",
      to: [{ type: "newsletter" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subject",
      title: "Subject line",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "subject" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "introduction",
      title: "Introduction",
      type: "bodyContent",
    }),
    defineField({
      name: "stories",
      title: "Stories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "story" }] }],
      validation: (rule) => rule.required().min(1).unique(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
    defineField({ name: "workflow", title: "Workflow", type: "workflow" }),
  ],
  preview: {
    select: { title: "subject", subtitle: "newsletter.name" },
  },
});

export const event = defineType({
  name: "event",
  title: "Event",
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
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "body", title: "Details", type: "bodyContent" }),
    defineField({
      name: "startsAt",
      title: "Starts at",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "endsAt", title: "Ends at", type: "datetime" }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "virtual",
      title: "Virtual / hybrid",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "registrationUrl", title: "Registration URL", type: "url" }),
    defineField({
      name: "image",
      title: "Event image",
      type: "editorialImage",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "organizers",
      title: "Editorial owners",
      type: "array",
      of: [{ type: "reference", to: [{ type: "person" }] }],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    select: { title: "title", subtitle: "startsAt", media: "image" },
  },
});

