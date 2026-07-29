import { defineField, defineType } from "sanity";
import { workflowStatusOptions } from "../helpers/options";

export const workflow = defineType({
  name: "workflow",
  title: "Editorial workflow",
  type: "object",
  fields: [
    defineField({
      name: "status",
      title: "Workflow status",
      type: "string",
      options: { list: [...workflowStatusOptions] },
      initialValue: "draft",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "assignedEditor",
      title: "Assigned editor",
      type: "reference",
      to: [{ type: "person" }],
    }),
    defineField({
      name: "assignedReporters",
      title: "Assigned reporters",
      type: "array",
      of: [{ type: "reference", to: [{ type: "person" }] }],
    }),
    defineField({
      name: "dueAt",
      title: "Due date",
      type: "datetime",
    }),
    defineField({
      name: "revisionSummary",
      title: "Revision summary",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "editorialNotes",
      title: "Editorial notes",
      type: "text",
      rows: 4,
      description: "Internal. Never projected to the public website.",
    }),
    defineField({
      name: "approvalRecord",
      title: "Approval record",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "person",
              title: "Approved by",
              type: "reference",
              to: [{ type: "person" }],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "stage",
              title: "Stage",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "approvedAt",
              title: "Approved at",
              type: "datetime",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "note",
              title: "Note",
              type: "text",
              rows: 2,
            }),
          ],
          preview: {
            select: {
              title: "person.fullName",
              subtitle: "stage",
            },
          },
        },
      ],
    }),
  ],
});
