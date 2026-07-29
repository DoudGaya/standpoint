import type { Metadata } from "next";
import { StaticContentPage } from "@/components/pages/StaticContentPage";
import { staticPages } from "@/lib/content/static-pages";

export const metadata: Metadata = { title: "Privacy", description: staticPages.privacy.standfirst, alternates: { canonical: "/privacy" }, robots: { index: true, follow: true } };
export default function Page() { return <StaticContentPage page={staticPages.privacy} />; }
