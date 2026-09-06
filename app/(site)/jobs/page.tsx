import type { Metadata } from "next";
import { getJobListings } from "@/lib/content/repository";
import { JobBoard } from "@/components/jobs/JobBoard";

export const metadata: Metadata = {
  title: "Careers & Jobs | GlobHub Media",
  description:
    "Explore open positions in global journalism, newsroom technology, visual investigation, and editorial operations — or post a new job vacancy via Google Form.",
  alternates: { canonical: "/jobs" },
};

export default async function JobsPage() {
  const jobs = await getJobListings();
  return <JobBoard initialJobs={jobs} />;
}
