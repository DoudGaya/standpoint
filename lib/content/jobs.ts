export interface JobListing {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship" | "Remote";
  description: string;
  googleFormUrl?: string;
  postedAt: string;
  closingDate?: string;
  featured?: boolean;
}

export function isValidGoogleFormUrl(url: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url.trim());
    return (
      (parsed.protocol === "http:" || parsed.protocol === "https:") &&
      (parsed.hostname.includes("forms.google.com") ||
        parsed.hostname.includes("docs.google.com") ||
        parsed.hostname.includes("forms.gle") ||
        url.includes("google.com/forms"))
    );
  } catch {
    return false;
  }
}
