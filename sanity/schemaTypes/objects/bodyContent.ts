import { defineArrayMember, defineType } from "sanity";
import { isHttpsUrl } from "../helpers/validation";

export const bodyContent = defineType({
  name: "bodyContent",
  title: "Body content",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragraph", value: "normal" },
        { title: "Section heading", value: "h2" },
        { title: "Subheading", value: "h3" },
        { title: "Block quote", value: "blockquote" },
      ],
      marks: {
        annotations: [
          {
            name: "link",
            title: "External link",
            type: "object",
            fields: [
              {
                name: "href",
                title: "URL",
                type: "url",
                validation: (rule) =>
                  rule.required().custom((value) =>
                    typeof value === "string" && isHttpsUrl(value)
                      ? true
                      : "Use a valid HTTPS URL."
                  ),
              },
              {
                name: "newWindow",
                title: "Open in new window",
                type: "boolean",
                initialValue: false,
              },
            ],
          },
          {
            name: "internalLink",
            title: "Internal story link",
            type: "object",
            fields: [
              {
                name: "story",
                title: "Story",
                type: "reference",
                to: [{ type: "story" }],
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({ type: "editorialImage" }),
    defineArrayMember({ type: "gallery" }),
    defineArrayMember({ type: "mediaEmbed" }),
    defineArrayMember({ type: "pullQuote" }),
    defineArrayMember({ type: "factBox" }),
    defineArrayMember({ type: "timeline" }),
    defineArrayMember({ type: "faqBlock" }),
    defineArrayMember({ type: "relatedContent" }),
    defineArrayMember({ type: "documentAttachment" }),
    defineArrayMember({ type: "dataTable" }),
    defineArrayMember({ type: "externalEmbed" }),
    defineArrayMember({ type: "newsletterCallout" }),
    defineArrayMember({ type: "adSlotReference" }),
    defineArrayMember({ type: "correctionBlock" }),
    defineArrayMember({ type: "sourceNote" }),
    defineArrayMember({ type: "codeSnippet" }),
  ],
});
