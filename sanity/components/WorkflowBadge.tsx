import type { DocumentBadgeComponent } from "sanity";

const colors: Record<string, "primary" | "success" | "warning" | "danger"> = {
  draft: "warning",
  assigned: "primary",
  "in-progress": "primary",
  submitted: "warning",
  "fact-checking": "warning",
  "copy-editing": "warning",
  "legal-review": "danger",
  approved: "success",
  scheduled: "primary",
  published: "success",
  updated: "success",
  corrected: "warning",
  retracted: "danger",
  archived: "primary",
};

export const WorkflowBadge: DocumentBadgeComponent = ({ draft, published }) => {
  const document = (draft || published) as
    | { workflow?: { status?: string } }
    | null;
  const status = document?.workflow?.status;
  if (!status) return null;

  return {
    label: status.replaceAll("-", " "),
    title: "GlobHub editorial workflow status",
    color: colors[status] || "primary",
  };
};
