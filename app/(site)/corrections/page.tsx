import type { Metadata } from "next";
import { StaticContentPage } from "@/components/pages/StaticContentPage";
import { staticPages } from "@/lib/content/static-pages";

export const metadata: Metadata = { title: "Corrections policy", description: staticPages.corrections.standfirst, alternates: { canonical: "/corrections" } };
export default function Page() { return <StaticContentPage page={staticPages.corrections} />; }
