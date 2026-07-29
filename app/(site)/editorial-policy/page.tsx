import type { Metadata } from "next";
import { StaticContentPage } from "@/components/pages/StaticContentPage";
import { staticPages } from "@/lib/content/static-pages";

export const metadata: Metadata = { title: "Editorial standards", description: staticPages["editorial-policy"].standfirst, alternates: { canonical: "/editorial-policy" } };
export default function Page() { return <StaticContentPage page={staticPages["editorial-policy"]} />; }
