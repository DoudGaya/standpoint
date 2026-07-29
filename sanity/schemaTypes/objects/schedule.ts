import { defineField, defineType } from "sanity";
import { isAfter } from "../helpers/validation";

export const schedule = defineType({
  name: "schedule",
  title: "Publishing schedule",
  type: "object",
  fields: [
    defineField({
      name: "publishAt",
      title: "Scheduled publication",
      type: "datetime",
    }),
    defineField({
      name: "embargoAt",
      title: "Embargo until",
      type: "datetime",
    }),
    defineField({
      name: "expireAt",
      title: "Archive / expire at",
      type: "datetime",
      validation: (rule) =>
        rule.custom((value, context) => isAfter(value, context, "publishAt")),
    }),
  ],
});

