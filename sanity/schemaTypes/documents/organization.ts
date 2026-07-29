import { defineField, defineType } from "sanity";

export const department = defineType({
  name: "department",
  title: "Department",
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
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({
      name: "leader",
      title: "Department lead",
      type: "reference",
      to: [{ type: "person" }],
    }),
    defineField({
      name: "public",
      title: "Show public department page",
      type: "boolean",
      initialValue: false,
    }),
  ],
});

export const team = defineType({
  name: "team",
  title: "Team",
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
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({
      name: "department",
      title: "Department",
      type: "reference",
      to: [{ type: "department" }],
    }),
    defineField({
      name: "members",
      title: "Members",
      type: "array",
      of: [{ type: "reference", to: [{ type: "person" }] }],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: "leader",
      title: "Team lead",
      type: "reference",
      to: [{ type: "person" }],
    }),
  ],
});

