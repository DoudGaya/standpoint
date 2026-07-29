import { defineField, defineType } from "sanity";
import { isAfter } from "../helpers/validation";

export const advertiser = defineType({
  name: "advertiser",
  title: "Advertiser",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "website", title: "Website", type: "url" }),
    defineField({
      name: "contactName",
      title: "Internal contact name",
      type: "string",
    }),
    defineField({
      name: "contactEmail",
      title: "Internal contact email",
      type: "email",
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: { select: { title: "name", subtitle: "website" } },
});

export const adPlacement = defineType({
  name: "adPlacement",
  title: "Ad placement",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "key",
      title: "Placement key",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      options: {
        list: [
          "Header leaderboard",
          "Homepage in-feed",
          "Sidebar",
          "Article inline",
          "Article end",
          "Category page",
          "Video pre-roll",
          "Footer promotion",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "desktopSize",
      title: "Reserved desktop size",
      type: "string",
      description: "Example: 970x250",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mobileSize",
      title: "Reserved mobile size",
      type: "string",
      description: "Example: 320x100",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: { select: { title: "title", subtitle: "location" } },
});

export const adCampaign = defineType({
  name: "adCampaign",
  title: "Ad campaign",
  type: "document",
  groups: [
    { name: "campaign", title: "Campaign", default: true },
    { name: "creative", title: "Creative" },
    { name: "targeting", title: "Targeting" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Internal campaign name",
      type: "string",
      group: "campaign",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "advertiser",
      title: "Advertiser",
      type: "reference",
      group: "campaign",
      to: [{ type: "advertiser" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "kind",
      title: "Format",
      type: "string",
      group: "campaign",
      options: { list: ["Display", "Native", "Sponsored section", "Promotion"] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "placements",
      title: "Placements",
      type: "array",
      group: "campaign",
      of: [{ type: "reference", to: [{ type: "adPlacement" }] }],
      validation: (rule) => rule.required().min(1).unique(),
    }),
    defineField({
      name: "startsAt",
      title: "Starts at",
      type: "datetime",
      group: "campaign",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endsAt",
      title: "Ends at",
      type: "datetime",
      group: "campaign",
      validation: (rule) =>
        rule.required().custom((value, context) => isAfter(value, context, "startsAt")),
    }),
    defineField({
      name: "desktopCreative",
      title: "Desktop creative",
      type: "editorialImage",
      group: "creative",
    }),
    defineField({
      name: "mobileCreative",
      title: "Mobile creative",
      type: "editorialImage",
      group: "creative",
    }),
    defineField({
      name: "destinationUrl",
      title: "Destination URL",
      type: "url",
      group: "creative",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "trackingParameters",
      title: "Tracking parameters",
      type: "string",
      group: "creative",
      description: "Query string only. Do not include scripts.",
    }),
    defineField({
      name: "priority",
      title: "Priority",
      type: "number",
      group: "campaign",
      validation: (rule) => rule.integer().min(0).max(100),
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      group: "campaign",
      initialValue: true,
    }),
    defineField({
      name: "countries",
      title: "Country targeting metadata",
      type: "array",
      group: "targeting",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "categories",
      title: "Category targeting",
      type: "array",
      group: "targeting",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      advertiser: "advertiser.name",
      active: "active",
      media: "desktopCreative",
    },
    prepare: ({ title, advertiser, active, media }) => ({
      title,
      subtitle: `${active === false ? "Inactive · " : ""}${advertiser || ""}`,
      media,
    }),
  },
});

