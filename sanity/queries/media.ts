import { defineQuery } from "next-sanity";
import { IMAGE_PROJECTION } from "./fragments";

export const RADIO_BULLETINS_QUERY = defineQuery(`
  *[_type == "radioBulletin"] | order(publishedAt desc) [0...20] {
    "id": _id,
    title,
    titleHa,
    "slug": slug.current,
    summary,
    summaryHa,
    bulletinType,
    audioUrl,
    duration,
    publishedAt,
    language,
    presenter,
    "cover": cover ${IMAGE_PROJECTION}
  }
`);
