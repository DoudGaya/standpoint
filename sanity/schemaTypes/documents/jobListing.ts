import { defineField, defineType } from "sanity";

export const jobListing = defineType({
  name: "jobListing",
  title: "Job Vacancies & Postings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Job Title",
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
      name: "department",
      title: "Department / Team",
      type: "string",
      options: {
        list: [
          { title: "Editorial", value: "Editorial" },
          { title: "Technology", value: "Technology" },
          { title: "Multimedia & Audio", value: "Multimedia" },
          { title: "Business & Operations", value: "Business & Ops" },
          { title: "Product & Design", value: "Product" },
        ],
      },
      initialValue: "Editorial",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "e.g. Remote, Lagos, Nairobi, London",
      initialValue: "Remote",
    }),
    defineField({
      name: "employmentType",
      title: "Employment Type",
      type: "string",
      options: {
        list: [
          { title: "Full-time", value: "Full-time" },
          { title: "Part-time", value: "Part-time" },
          { title: "Contract", value: "Contract" },
          { title: "Internship", value: "Internship" },
          { title: "Remote", value: "Remote" },
        ],
      },
      initialValue: "Full-time",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Job Description & Summary",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "googleFormUrl",
      title: "Google Form Application URL",
      type: "url",
      description: "Paste the Google Form URL where applicants will submit their application.",
      validation: (rule) =>
        rule.uri({ scheme: ["http", "https"] }).custom((url) => {
          if (!url) return true;
          if (
            url.includes("forms.google.com") ||
            url.includes("docs.google.com/forms") ||
            url.includes("forms.gle") ||
            url.includes("google.com/forms")
          ) {
            return true;
          }
          return "Must be a valid Google Form URL (e.g., https://forms.google.com/... or https://forms.gle/...)";
        }),
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "closingDate",
      title: "Application Closing Date",
      type: "date",
    }),
    defineField({
      name: "featured",
      title: "Featured Vacancy",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "active",
      title: "Active (Visible on Site)",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "department",
      active: "active",
    },
    prepare({ title, subtitle, active }) {
      return {
        title: title || "Untitled Vacancy",
        subtitle: `${subtitle || "General"} · ${active === false ? "Draft/Inactive" : "Active"}`,
      };
    },
  },
});
