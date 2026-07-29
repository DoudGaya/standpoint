import { defineField, defineType } from "sanity";
import { isAfter, isHttpsUrl } from "../helpers/validation";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage curation",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      initialValue: "GlobHub homepage",
      readOnly: true,
    }),
    defineField({
      name: "modules",
      title: "Homepage modules",
      type: "array",
      of: [{ type: "homepageModule" }],
      validation: (rule) => rule.required().min(1).max(30),
    }),
    defineField({
      name: "notes",
      title: "Internal curation notes",
      type: "text",
      rows: 4,
    }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage curation", subtitle: "Singleton" }),
  },
});

export const navigation = defineType({
  name: "navigation",
  title: "Main navigation",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      initialValue: "Primary navigation",
      readOnly: true,
    }),
    defineField({
      name: "utilityLinks",
      title: "Utility links",
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
              name: "href",
              title: "Internal path or external URL",
              type: "string",
              validation: (rule) =>
                rule.required().custom((value) => {
                  if (!value) return true;
                  if (value.startsWith("/") && !value.startsWith("//")) return true;
                  return isHttpsUrl(value)
                    ? true
                    : "Use a local /path or a valid HTTPS URL.";
                }),
            }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),
    defineField({
      name: "categories",
      title: "Category navigation",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "category",
              title: "Category",
              type: "reference",
              to: [{ type: "category" }],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "Navigation label override",
              type: "string",
            }),
            defineField({
              name: "order",
              title: "Order",
              type: "number",
              validation: (rule) => rule.required().integer().min(0),
            }),
            defineField({
              name: "show",
              title: "Show",
              type: "boolean",
              initialValue: true,
            }),
            defineField({
              name: "featured",
              title: "Featured",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "megaMenu",
              title: "Mega menu",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "directUrl",
              title: "Optional direct URL override",
              type: "string",
              description: "Use only when this item should not open the category page.",
            }),
          ],
          preview: {
            select: {
              title: "label",
              category: "category.title",
              show: "show",
              mega: "megaMenu",
            },
            prepare: ({ title, category, show, mega }) => ({
              title: title || category || "Navigation item",
              subtitle: `${show === false ? "Hidden · " : ""}${mega ? "Mega menu" : "Standard"}`,
            }),
          },
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "edition",
      title: "Default edition",
      type: "string",
      initialValue: "Global",
    }),
    defineField({
      name: "language",
      title: "Default language label",
      type: "string",
      initialValue: "English",
    }),
    defineField({ name: "showDate", title: "Show date", type: "boolean", initialValue: true }),
    defineField({ name: "showLive", title: "Show live links", type: "boolean", initialValue: true }),
    defineField({
      name: "showNewsletter",
      title: "Show newsletter links",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "showAccount",
      title: "Show account placeholder",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: { prepare: () => ({ title: "Main navigation", subtitle: "Singleton" }) },
});

export const breakingNews = defineType({
  name: "breakingNews",
  title: "Breaking news bar",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      initialValue: "Breaking news",
      readOnly: true,
    }),
    defineField({
      name: "enabled",
      title: "Enabled",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "autoRotate",
      title: "Auto-rotate headlines",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "rotationSeconds",
      title: "Rotation interval",
      type: "number",
      initialValue: 8,
      validation: (rule) => rule.integer().min(5).max(60),
    }),
    defineField({
      name: "items",
      title: "Headlines",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "enabled",
              title: "Enabled",
              type: "boolean",
              initialValue: true,
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              initialValue: "Breaking",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "headline",
              title: "Headline",
              type: "string",
              validation: (rule) => rule.required().max(180),
            }),
            defineField({
              name: "story",
              title: "Story",
              type: "reference",
              to: [{ type: "story" }],
            }),
            defineField({ name: "externalUrl", title: "External URL", type: "url" }),
            defineField({
              name: "priority",
              title: "Priority",
              type: "number",
              validation: (rule) => rule.integer().min(0).max(100),
            }),
            defineField({
              name: "order",
              title: "Manual order",
              type: "number",
              validation: (rule) => rule.integer().min(0),
            }),
            defineField({
              name: "startsAt",
              title: "Starts at",
              type: "datetime",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "expiresAt",
              title: "Expires at",
              type: "datetime",
              validation: (rule) =>
                rule.required().custom((value, context) =>
                  isAfter(value, context, "startsAt")
                ),
            }),
          ],
          preview: {
            select: {
              title: "headline",
              subtitle: "label",
              enabled: "enabled",
            },
            prepare: ({ title, subtitle, enabled }) => ({
              title,
              subtitle: `${enabled === false ? "Disabled · " : ""}${subtitle || ""}`,
            }),
          },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Breaking news bar", subtitle: "Singleton" }) },
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "brand", title: "Brand", default: true },
    { name: "contact", title: "Contact" },
    { name: "features", title: "Features" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Site title",
      type: "string",
      group: "brand",
      initialValue: "GlobHub Media",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortTitle",
      title: "Short title",
      type: "string",
      group: "brand",
      initialValue: "GlobHub",
    }),
    defineField({
      name: "description",
      title: "Site description",
      type: "text",
      rows: 3,
      group: "brand",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "logo", title: "Logo", type: "image", group: "brand" }),
    defineField({ name: "siteUrl", title: "Production URL", type: "url", group: "brand" }),
    defineField({
      name: "edition",
      title: "Default edition",
      type: "string",
      group: "brand",
      initialValue: "Global",
    }),
    defineField({
      name: "language",
      title: "Default language",
      type: "string",
      group: "brand",
      initialValue: "en",
    }),
    defineField({ name: "contactEmail", title: "Public contact email", type: "email", group: "contact" }),
    defineField({
      name: "correctionsEmail",
      title: "Corrections email",
      type: "email",
      group: "contact",
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      group: "contact",
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
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "label", subtitle: "url" } },
        },
      ],
    }),
    defineField({
      name: "commentsEnabled",
      title: "Enable comments globally",
      type: "boolean",
      group: "features",
      initialValue: false,
    }),
    defineField({
      name: "analyticsProvider",
      title: "Analytics provider",
      type: "string",
      group: "features",
      options: {
        list: [
          { title: "None", value: "none" },
          { title: "First-party", value: "first-party" },
          { title: "Plausible", value: "plausible" },
          { title: "Google Analytics", value: "google" },
        ],
      },
      initialValue: "none",
    }),
    defineField({
      name: "enableReaderAccounts",
      title: "Enable reader accounts",
      type: "boolean",
      group: "features",
      initialValue: false,
      description: "Requires a separately configured authentication provider.",
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings", subtitle: "Singleton" }) },
});

export const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      initialValue: "Primary footer",
      readOnly: true,
    }),
    defineField({
      name: "columns",
      title: "Link columns",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Column title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "links",
              title: "Links",
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
                      name: "href",
                      title: "Path / URL",
                      type: "string",
                      validation: (rule) => rule.required(),
                    }),
                  ],
                  preview: { select: { title: "label", subtitle: "href" } },
                },
              ],
            }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),
    defineField({ name: "copyright", title: "Copyright line", type: "string" }),
    defineField({ name: "disclaimer", title: "Footer disclaimer", type: "text" }),
  ],
  preview: { prepare: () => ({ title: "Footer", subtitle: "Singleton" }) },
});

export const page = defineType({
  name: "page",
  title: "Page",
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
    defineField({ name: "standfirst", title: "Standfirst", type: "text", rows: 3 }),
    defineField({
      name: "body",
      title: "Content",
      type: "bodyContent",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "legalReviewRequired",
      title: "Legal review required",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "reviewedAt",
      title: "Last reviewed",
      type: "date",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { select: { title: "title", subtitle: "slug.current" } },
});

export const redirect = defineType({
  name: "redirect",
  title: "Redirect",
  type: "document",
  fields: [
    defineField({
      name: "source",
      title: "Old local path",
      type: "string",
      description: "Must begin with /.",
      validation: (rule) =>
        rule
          .required()
          .custom((value) =>
            value?.startsWith("/") && !value.startsWith("//")
              ? true
              : "Use a local path beginning with /."
          ),
    }),
    defineField({
      name: "destination",
      title: "Destination",
      type: "string",
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) return true;
          if (value.startsWith("/") && !value.startsWith("//")) return true;
          return isHttpsUrl(value)
            ? true
            : "Use a local /path or a valid HTTPS URL.";
        }),
    }),
    defineField({
      name: "permanent",
      title: "Permanent (308)",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
    defineField({ name: "note", title: "Internal note", type: "string" }),
  ],
  preview: {
    select: { title: "source", subtitle: "destination", active: "active" },
    prepare: ({ title, subtitle, active }) => ({
      title: `${active === false ? "Inactive · " : ""}${title}`,
      subtitle,
    }),
  },
});

