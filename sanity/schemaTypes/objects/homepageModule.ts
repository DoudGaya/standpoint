import { defineField, defineType } from "sanity";
import { isAfter } from "../helpers/validation";

export const homepageModule = defineType({
  name: "homepageModule",
  title: "Homepage module",
  type: "object",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "feed", title: "Fallback feed" },
    { name: "display", title: "Display" },
    { name: "schedule", title: "Schedule" },
  ],
  fields: [
    defineField({
      name: "enabled",
      title: "Enabled",
      type: "boolean",
      initialValue: true,
      group: "display",
    }),
    defineField({
      name: "moduleType",
      title: "Module type",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Lead story package", value: "lead" },
          { title: "Latest stream", value: "latest" },
          { title: "Category / topic section", value: "category" },
          { title: "Editors' picks", value: "editors-picks" },
          { title: "Ranked / most read", value: "ranked" },
          { title: "Live coverage", value: "live" },
          { title: "Video", value: "video" },
          { title: "Podcast / audio", value: "podcast" },
          { title: "Photo stories", value: "photo" },
          { title: "Opinion", value: "opinion" },
          { title: "Newsletter", value: "newsletter" },
          { title: "Advertisement", value: "advertisement" },
          { title: "Event promotion", value: "event" },
          { title: "Social follow", value: "social" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Custom heading",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "stories",
      title: "Pinned stories",
      type: "array",
      group: "content",
      of: [{ type: "reference", to: [{ type: "story" }] }],
      validation: (rule) => rule.unique().max(12),
    }),
    defineField({
      name: "category",
      title: "Category feed",
      type: "reference",
      group: "feed",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "excludeStories",
      title: "Exclude stories",
      type: "array",
      group: "feed",
      of: [{ type: "reference", to: [{ type: "story" }] }],
      validation: (rule) => rule.unique().max(30),
    }),
    defineField({
      name: "limit",
      title: "Feed limit",
      type: "number",
      group: "feed",
      initialValue: 6,
      validation: (rule) => rule.integer().min(1).max(20),
    }),
    defineField({
      name: "fallbackQuery",
      title: "Fallback strategy",
      type: "string",
      group: "feed",
      options: {
        list: [
          { title: "Latest published", value: "latest" },
          { title: "Editorial priority", value: "priority" },
          { title: "Manual only", value: "manual" },
        ],
      },
      initialValue: "latest",
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      group: "display",
      options: {
        list: [
          { title: "Lead grid", value: "lead-grid" },
          { title: "Story river", value: "river" },
          { title: "Four-up", value: "four-up" },
          { title: "Split", value: "split" },
          { title: "Ranked rail", value: "rail" },
        ],
      },
    }),
    defineField({
      name: "mobileBehavior",
      title: "Mobile behavior",
      type: "string",
      group: "display",
      options: {
        list: [
          { title: "Stack", value: "stack" },
          { title: "Horizontal scroll", value: "horizontal" },
          { title: "Compact list", value: "compact" },
        ],
      },
      initialValue: "stack",
    }),
    defineField({
      name: "startsAt",
      title: "Show from",
      type: "datetime",
      group: "schedule",
    }),
    defineField({
      name: "endsAt",
      title: "Hide after",
      type: "datetime",
      group: "schedule",
      validation: (rule) =>
        rule.custom((value, context) => isAfter(value, context, "startsAt")),
    }),
  ],
  preview: {
    select: {
      title: "title",
      type: "moduleType",
      enabled: "enabled",
      stories: "stories",
    },
    prepare: ({ title, type, enabled, stories }) => ({
      title: title || type || "Homepage module",
      subtitle: `${enabled === false ? "Disabled · " : ""}${
        Array.isArray(stories) ? `${stories.length} pinned` : "Feed"
      }`,
    }),
  },
});

