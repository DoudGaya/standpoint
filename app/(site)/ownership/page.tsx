import type { Metadata } from "next";
import { StaticContentPage } from "@/components/pages/StaticContentPage";
import { staticPages } from "@/lib/content/static-pages";

export const metadata: Metadata = { title: "Ownership and funding", description: staticPages.ownership.standfirst, alternates: { canonical: "/ownership" } };
export default function Page() { return <StaticContentPage page={staticPages.ownership} />; }
