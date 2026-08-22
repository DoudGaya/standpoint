import { defineQuery } from "next-sanity";
import {
  CATEGORY_PROJECTION,
  IMAGE_PROJECTION,
  PERSON_PROJECTION,
} from "./fragments";

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    title,
    shortTitle,
    description,
    "siteUrl": coalesce(siteUrl, $fallbackSiteUrl),
    edition,
    language,
    contactEmail,
    correctionsEmail,
    socialLinks,
    commentsEnabled,
    analyticsProvider
  }
`);

export const NAVIGATION_QUERY = defineQuery(`
  *[_type == "navigation"][0] {
    utilityLinks,
    edition,
    language,
    showDate,
    showLive,
    showNewsletter,
    showAccount,
    "categories": categories[show == true] | order(order asc) {
      "id": coalesce(_key, category->_id),
      "title": coalesce(label, category->title),
      "titleHa": coalesce(labelHa, category->titleHa),
      "navigationLabel": coalesce(label, category->navigationLabel, category->title),
      "navigationLabelHa": coalesce(labelHa, category->navigationLabelHa, category->titleHa),
      "slug": category->slug.current,
      "description": category->description,
      "descriptionHa": category->descriptionHa,
      "language": category->language,
      "accent": category->accentColor,
      "order": order,
      featured,
      "showInNavigation": show,
      "showInFooter": category->showInFooter,
      megaMenu,
      "children": category->subcategories[]->${CATEGORY_PROJECTION}
    }
  }
`);

export const BREAKING_NEWS_QUERY = defineQuery(`
  *[_type == "breakingNews" && enabled == true][0].items[
    enabled == true &&
    startsAt <= now() &&
    expiresAt > now()
  ] | order(priority desc, order asc) {
    "id": _key,
    label,
    headline,
    "href": coalesce(story->{"value": "/story/" + slug.current}.value, externalUrl),
    priority,
    startsAt,
    expiresAt
  }
`);

export const HOMEPAGE_QUERY = defineQuery(`
  *[_type == "homepage"][0] {
    modules[enabled == true] {
      "id": _key,
      "type": moduleType,
      title,
      layout,
      "storySlugs": stories[]->slug.current,
      "categorySlug": category->slug.current,
      limit,
      enabled
    }
  }.modules
`);

export const VIDEO_LIST_QUERY = defineQuery(`
  *[_type == "video" && workflow.status in ["published", "updated"]]
  | order(publishedAt desc) {
    "id": _id,
    title,
    "slug": slug.current,
    summary,
    "provider": media.provider,
    "sourceUrl": media.url,
    "poster": media.poster ${IMAGE_PROJECTION},
    duration,
    publishedAt,
    "series": series->title,
    live,
    scheduledStart,
    transcript,
    accessibilityLabel
  }
`);

export const PODCAST_SHOWS_QUERY = defineQuery(`
  *[_type == "podcastShow" && active == true] | order(title asc) {
    "id": _id,
    title,
    "slug": slug.current,
    description,
    "cover": cover ${IMAGE_PROJECTION},
    frequency,
    "host": host->${PERSON_PROJECTION},
    externalUrl
  }
`);

export const ACTIVE_AD_CAMPAIGN_QUERY = defineQuery(`
  *[_type == "adCampaign" &&
    active != false &&
    (startsAt == null || startsAt <= now()) &&
    (endsAt == null || endsAt >= now()) &&
    (
      !defined($placement) || $placement == "" ||
      count(placements[]->[
        key.current == $placement ||
        lower(location) == lower($placement) ||
        lower(title) == lower($placement) ||
        slug.current == $placement
      ]) > 0
    )
  ] | order(coalesce(priority, 0) desc, _createdAt desc)[0] {
    _id,
    title,
    kind,
    destinationUrl,
    trackingParameters,
    "desktopCreative": desktopCreative ${IMAGE_PROJECTION},
    "mobileCreative": mobileCreative ${IMAGE_PROJECTION},
    "advertiser": advertiser->{
      name,
      website
    },
    "placements": placements[]->{
      _id,
      title,
      "key": key.current,
      location,
      desktopSize,
      mobileSize
    }
  }
`);

export const FALLBACK_AD_CAMPAIGN_QUERY = defineQuery(`
  *[_type == "adCampaign" &&
    active != false &&
    (startsAt == null || startsAt <= now()) &&
    (endsAt == null || endsAt >= now())
  ] | order(coalesce(priority, 0) desc, _createdAt desc)[0] {
    _id,
    title,
    kind,
    destinationUrl,
    trackingParameters,
    "desktopCreative": desktopCreative ${IMAGE_PROJECTION},
    "mobileCreative": mobileCreative ${IMAGE_PROJECTION},
    "advertiser": advertiser->{
      name,
      website
    },
    "placements": placements[]->{
      _id,
      title,
      "key": key.current,
      location,
      desktopSize,
      mobileSize
    }
  }
`);


