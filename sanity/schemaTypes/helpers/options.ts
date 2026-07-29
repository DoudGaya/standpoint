export const storyTypeOptions = [
  { title: "News", value: "news" },
  { title: "Breaking news", value: "breaking" },
  { title: "Feature", value: "feature" },
  { title: "Analysis", value: "analysis" },
  { title: "Opinion", value: "opinion" },
  { title: "Editorial", value: "editorial" },
  { title: "Interview", value: "interview" },
  { title: "Explainer", value: "explainer" },
  { title: "Investigation", value: "investigation" },
  { title: "Fact check", value: "fact-check" },
  { title: "Press release", value: "press-release" },
  { title: "Sponsored story", value: "sponsored" },
  { title: "Video", value: "video" },
  { title: "Podcast", value: "podcast" },
  { title: "Photo essay", value: "photo-essay" },
  { title: "Data story", value: "data-story" },
  { title: "Review", value: "review" },
] as const;

export const workflowStatusOptions = [
  { title: "Draft", value: "draft" },
  { title: "Assigned", value: "assigned" },
  { title: "In progress", value: "in-progress" },
  { title: "Submitted for review", value: "submitted" },
  { title: "Fact checking", value: "fact-checking" },
  { title: "Copy editing", value: "copy-editing" },
  { title: "Legal review", value: "legal-review" },
  { title: "Approved", value: "approved" },
  { title: "Scheduled", value: "scheduled" },
  { title: "Published", value: "published" },
  { title: "Updated", value: "updated" },
  { title: "Corrected", value: "corrected" },
  { title: "Retracted", value: "retracted" },
  { title: "Archived", value: "archived" },
] as const;

export const staffRoleOptions = [
  "Super administrator",
  "Publisher",
  "Editor in chief",
  "Managing editor",
  "Section editor",
  "Copy editor",
  "Reporter",
  "Correspondent",
  "Contributor",
  "Fact checker",
  "Video editor",
  "Photo editor",
  "Photographer",
  "Videographer",
  "Producer",
  "Presenter",
  "Commercial editor",
  "Advertising manager",
  "Analyst",
  "Read-only reviewer",
].map((role) => ({
  title: role,
  value: role.toLocaleLowerCase().replaceAll(" ", "-"),
}));

export const mediaProviderOptions = [
  "YouTube",
  "Vimeo",
  "Facebook",
  "Instagram",
  "TikTok",
  "X / Twitter",
  "SoundCloud",
  "Spotify",
  "Apple Podcasts",
  "Mixcloud",
  "Custom HLS",
  "Uploaded",
  "External file",
].map((provider) => ({
  title: provider,
  value: provider
    .toLocaleLowerCase()
    .replace(" / twitter", "")
    .replace("custom ", "")
    .replace(" file", "")
    .replaceAll(" ", "-"),
}));

