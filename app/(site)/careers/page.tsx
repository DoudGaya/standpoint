import type { Metadata } from "next";
import { StaticContentPage } from "@/components/pages/StaticContentPage";
import { staticPages } from "@/lib/content/static-pages";

export const metadata: Metadata = { title: "Careers", description: staticPages.careers.standfirst, alternates: { canonical: "/careers" } };
export default function Page() { return <StaticContentPage page={staticPages.careers} />; }
