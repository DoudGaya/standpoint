import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "navigation", title: "Navigation" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "navigationLabel",
      title: "Navigation label",
      type: "string",
      group: "navigation",
      description: "Optional shorter label for menus.",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => rule.required().max(420),
    }),
    defineField({
      name: "parent",
      title: "Parent category",
      type: "reference",
      group: "navigation",
      to: [{ type: "category" }],
      options: {
        filter: ({ document }) => ({
          filter: "_id != $id && _id != $draftId",
          params: {
            id: document?._id?.replace("drafts.", ""),
            draftId: `drafts.${document?._id?.replace("drafts.", "")}`,
          },
        }),
      },
      validation: (rule) =>
        rule.custom((value, context) => {
          if (!value || typeof value !== "object" || !("_ref" in value)) return true;
          const id = context.document?._id?.replace("drafts.", "");
          return value._ref.replace("drafts.", "") === id
            ? "A category cannot be its own parent."
            : true;
        }),
    }),
    defineField({
      name: "subcategories",
      title: "Subcategories",
      type: "array",
      group: "navigation",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: "navigationOrder",
      title: "Navigation order",
      type: "number",
      group: "navigation",
      initialValue: 100,
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "navigation",
      initialValue: false,
    }),
    defineField({
      name: "showInNavigation",
      title: "Show in main navigation",
      type: "boolean",
      group: "navigation",
      initialValue: true,
    }),
    defineField({
      name: "showInFooter",
      title: "Show in footer",
      type: "boolean",
      group: "navigation",
      initialValue: true,
    }),
    defineField({
      name: "megaMenu",
      title: "Enable mega menu",
      type: "boolean",
      group: "navigation",
      initialValue: false,
    }),
    defineField({
      name: "megaMenuFeaturedStory",
      title: "Mega-menu featured story",
      type: "reference",
      group: "navigation",
      to: [{ type: "story" }],
      hidden: ({ document }) => document?.megaMenu !== true,
    }),
    defineField({
      name: "accentColor",
      title: "Accent colour",
      type: "string",
      group: "navigation",
      description: "Accessible CSS hex colour, e.g. #006B82.",
      validation: (rule) =>
        rule.regex(/^#[0-9a-fA-F]{6}$/, {
          name: "hex color",
          invert: false,
        }),
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "editorialImage",
      group: "content",
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      group: "navigation",
      initialValue: true,
    }),
    defineField({ name: "seo", title: "SEO metadata", type: "seo", group: "seo" }),
  ],
  preview: {
    select: {
      title: "title",
      parent: "parent.title",
      active: "active",
      media: "heroImage",
    },
    prepare: ({ title, parent, active, media }) => ({
      title,
      subtitle: [active === false ? "Inactive" : null, parent ? `Under ${parent}` : "Top level"]
        .filter(Boolean)
        .join(" · "),
      media,
    }),
  },
});

function simpleTaxonomy(name: string, title: string) {
  return defineType({
    name,
    title,
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
        options: { source: "title", maxLength: 96 },
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: "description",
        title: "Description",
        type: "text",
        rows: 3,
      }),
      defineField({ name: "heroImage", title: "Hero image", type: "editorialImage" }),
      defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
      defineField({ name: "seo", title: "SEO metadata", type: "seo" }),
    ],
    preview: {
      select: { title: "title", subtitle: "description", media: "heroImage" },
    },
  });
}

export const topic = simpleTaxonomy("topic", "Topic");
export const tag = simpleTaxonomy("tag", "Tag");
export const series = simpleTaxonomy("series", "Series");

export const location = defineType({
  name: "location",
  title: "Location",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "kind",
      title: "Location type",
      type: "string",
      options: {
        list: ["Country", "Region", "City", "Continent", "Other"],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "isoCode", title: "ISO code", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "seo", title: "SEO metadata", type: "seo" }),
  ],
  preview: { select: { title: "title", subtitle: "kind" } },
});

