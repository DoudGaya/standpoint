import type { Metadata } from "next";
import { StaticContentPage } from "@/components/pages/StaticContentPage";
import { staticPages } from "@/lib/content/static-pages";

export const metadata: Metadata = { title: "Diversity and inclusion", description: staticPages.diversity.standfirst, alternates: { canonical: "/diversity" } };
export default function Page() { return <StaticContentPage page={staticPages.diversity} />; }
