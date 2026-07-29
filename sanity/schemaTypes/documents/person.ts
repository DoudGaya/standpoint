import { defineField, defineType } from "sanity";
import { staffRoleOptions } from "../helpers/options";
import { isHttpsUrl } from "../helpers/validation";

export const person = defineType({
  name: "person",
  title: "Person",
  type: "document",
  groups: [
    { name: "public", title: "Public profile", default: true },
    { name: "newsroom", title: "Newsroom" },
    { name: "private", title: "Private — internal only" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "fullName",
      title: "Full name",
      type: "string",
      group: "public",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Public profile slug",
      type: "slug",
      group: "public",
      options: { source: "fullName", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "professionalTitle",
      title: "Professional title",
      type: "string",
      group: "public",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "roles",
      title: "Editorial and organizational roles",
      type: "array",
      group: "newsroom",
      of: [{ type: "string" }],
      options: { list: staffRoleOptions },
      validation: (rule) => rule.required().min(1).unique(),
    }),
    defineField({
      name: "department",
      title: "Department",
      type: "reference",
      group: "newsroom",
      to: [{ type: "department" }],
    }),
    defineField({
      name: "team",
      title: "Team",
      type: "reference",
      group: "newsroom",
      to: [{ type: "team" }],
    }),
    defineField({
      name: "manager",
      title: "Manager",
      type: "reference",
      group: "newsroom",
      to: [{ type: "person" }],
      validation: (rule) =>
        rule.custom((value, context) =>
          value && typeof value === "object" && "_ref" in value && value._ref === context.document?._id
            ? "A person cannot manage themselves."
            : true
        ),
    }),
    defineField({
      name: "shortBio",
      title: "Short biography",
      type: "text",
      rows: 3,
      group: "public",
      validation: (rule) => rule.required().max(320),
    }),
    defineField({
      name: "biography",
      title: "Biography",
      type: "array",
      of: [{ type: "block" }],
      group: "public",
    }),
    defineField({
      name: "profileImage",
      title: "Profile image",
      type: "editorialImage",
      group: "public",
    }),
    defineField({
      name: "publicEmail",
      title: "Public email",
      type: "email",
      group: "public",
    }),
    defineField({
      name: "publicContact",
      title: "Public contact note",
      type: "string",
      group: "public",
    }),
    defineField({
      name: "personalWebsite",
      title: "Personal website",
      type: "url",
      group: "public",
      validation: (rule) =>
        rule.custom((value) =>
          isHttpsUrl(value) ? true : "Use a valid HTTPS URL."
        ),
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      group: "public",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Network",
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
    }),
    defineField({ name: "location", title: "Location", type: "string", group: "public" }),
    defineField({
      name: "languages",
      title: "Languages",
      type: "array",
      group: "public",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "expertise",
      title: "Areas of expertise",
      type: "array",
      group: "public",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "employmentType",
      title: "Employment type",
      type: "string",
      group: "newsroom",
      options: {
        list: ["Employee", "Contractor", "Freelancer", "Contributor", "Board member"],
      },
    }),
    defineField({
      name: "startDate",
      title: "Start date",
      type: "date",
      group: "newsroom",
    }),
    defineField({
      name: "endDate",
      title: "End date",
      type: "date",
      group: "newsroom",
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      group: "newsroom",
      initialValue: true,
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "public",
      initialValue: false,
    }),
    defineField({
      name: "showAuthorPage",
      title: "Show public author page",
      type: "boolean",
      group: "public",
      initialValue: true,
    }),
    defineField({
      name: "displayOrder",
      title: "Display order",
      type: "number",
      group: "public",
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: "permissionMetadata",
      title: "Permission notes",
      type: "text",
      rows: 3,
      group: "newsroom",
      description:
        "Documentation only. Actual access must be configured in Sanity project roles.",
    }),
    defineField({
      name: "internalEmail",
      title: "Internal email",
      type: "email",
      group: "private",
    }),
    defineField({
      name: "internalPhone",
      title: "Internal phone",
      type: "string",
      group: "private",
    }),
    defineField({
      name: "internalNotes",
      title: "Internal notes",
      type: "text",
      rows: 4,
      group: "private",
      description: "Never include this field in public GROQ projections.",
    }),
    defineField({ name: "seo", title: "SEO metadata", type: "seo", group: "seo" }),
  ],
  preview: {
    select: {
      title: "fullName",
      subtitle: "professionalTitle",
      media: "profileImage",
      active: "active",
    },
    prepare: ({ title, subtitle, media, active }) => ({
      title,
      subtitle: `${active === false ? "Inactive · " : ""}${subtitle || ""}`,
      media,
    }),
  },
});

