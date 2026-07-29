import type { Metadata } from "next";
import { StaticContentPage } from "@/components/pages/StaticContentPage";
import { staticPages } from "@/lib/content/static-pages";

export const metadata: Metadata = { title: "Fact-checking methodology", description: staticPages["fact-checking-methodology"].standfirst, alternates: { canonical: "/fact-checking-methodology" } };
export default function Page() { return <StaticContentPage page={staticPages["fact-checking-methodology"]} />; }
