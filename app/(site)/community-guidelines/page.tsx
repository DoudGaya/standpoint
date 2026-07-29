import type { Metadata } from "next";
import { StaticContentPage } from "@/components/pages/StaticContentPage";
import { staticPages } from "@/lib/content/static-pages";

export const metadata: Metadata = { title: "Community guidelines", description: staticPages["community-guidelines"].standfirst, alternates: { canonical: "/community-guidelines" } };
export default function Page() { return <StaticContentPage page={staticPages["community-guidelines"]} />; }
