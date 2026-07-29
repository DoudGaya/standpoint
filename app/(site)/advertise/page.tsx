import type { Metadata } from "next";
import Link from "next/link";
import { StaticContentPage } from "@/components/pages/StaticContentPage";
import { staticPages } from "@/lib/content/static-pages";

export const metadata: Metadata = { title: "Advertise with us", description: staticPages.advertise.standfirst, alternates: { canonical: "/advertise" } };
export default function Page() { return <><StaticContentPage page={staticPages.advertise} /><div className="reading-container" style={{ paddingBottom: "4rem" }}><Link href="/contact?kind=advertising" className="button">Contact the commercial team</Link></div></>; }
