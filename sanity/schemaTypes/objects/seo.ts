import { defineField, defineType } from "sanity";
import { isHttpsUrl } from "../helpers/validation";

export const seo = defineType({
  name: "seo",
  title: "Search and social",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "SEO title",
      type: "string",
      validation: (rule) => rule.max(65).warning("Aim for 50–60 characters."),
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "text",
      rows: 3,
      validation: (rule) =>
        rule.max(170).warning("Aim for 140–160 characters."),
    }),
    defineField({
      name: "socialTitle",
      title: "Social title",
      type: "string",
      validation: (rule) => rule.max(90),
    }),
    defineField({
      name: "socialDescription",
      title: "Social description",
      type: "text",
      rows: 2,
      validation: (rule) => rule.max(220),
    }),
    defineField({
      name: "socialImage",
      title: "Social image",
      type: "editorialImage",
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL override",
      type: "url",
      description: "Leave empty unless this content's canonical URL is elsewhere.",
      validation: (rule) =>
        rule.custom((value) =>
          isHttpsUrl(value) ? true : "Use a valid HTTPS URL."
        ),
    }),
    defineField({
      name: "searchKeywords",
      title: "Search keywords",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "noIndex",
      title: "Exclude from search engines",
      type: "boolean",
      initialValue: false,
    }),
  ],
});

