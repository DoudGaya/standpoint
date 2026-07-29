import { defineField, defineType } from "sanity";
import { mediaProviderOptions } from "../helpers/options";
import { isAllowedEmbedUrl, isHttpsUrl } from "../helpers/validation";

export const mediaEmbed = defineType({
  name: "mediaEmbed",
  title: "Media source",
  type: "object",
  fields: [
    defineField({
      name: "provider",
      title: "Provider",
      type: "string",
      options: { list: mediaProviderOptions },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "Original media URL",
      type: "url",
      validation: (rule) =>
        rule.required().custom((value, context) => {
          const parent = context.parent as { provider?: string } | undefined;
          if (parent?.provider === "external" || parent?.provider === "hls") {
            return isHttpsUrl(value) ? true : "Use a valid HTTPS URL.";
          }
          if (parent?.provider === "uploaded") return true;
          return isAllowedEmbedUrl(value)
            ? true
            : "Use an HTTPS URL from an approved media provider.";
        }),
    }),
    defineField({
      name: "uploadedFile",
      title: "Uploaded media file",
      type: "file",
      hidden: ({ parent }) => parent?.provider !== "uploaded",
    }),
    defineField({
      name: "poster",
      title: "Poster image",
      type: "editorialImage",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: "Use HH:MM:SS or MM:SS.",
      validation: (rule) =>
        rule.regex(/^(\d{1,2}:)?\d{1,2}:\d{2}$/, {
          name: "duration",
          invert: false,
        }),
    }),
    defineField({
      name: "accessibilityLabel",
      title: "Accessibility label",
      type: "string",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "captions",
      title: "Captions file",
      type: "file",
      options: { accept: ".vtt,.srt" },
    }),
    defineField({
      name: "transcript",
      title: "Transcript",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "contentWarning",
      title: "Content warning",
      type: "string",
    }),
  ],
});

