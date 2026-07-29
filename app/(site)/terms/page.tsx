import type { Metadata } from "next";
import { StaticContentPage } from "@/components/pages/StaticContentPage";
import { staticPages } from "@/lib/content/static-pages";

export const metadata: Metadata = { title: "Terms of use", description: staticPages.terms.standfirst, alternates: { canonical: "/terms" } };
export default function Page() { return <StaticContentPage page={staticPages.terms} />; }
