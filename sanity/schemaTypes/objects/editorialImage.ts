import { defineField, defineType } from "sanity";

export const editorialImage = defineType({
  name: "editorialImage",
  title: "Editorial image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description:
        "Describe the information conveyed by the image. Do not start with “image of”.",
      validation: (rule) => rule.required().min(5).max(220),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "credit",
      title: "Credit",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "copyright",
      title: "Copyright / licence note",
      type: "string",
    }),
  ],
});

