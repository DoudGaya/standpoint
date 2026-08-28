export const IMAGE_PROJECTION = `{
  "url": coalesce(asset->url, url),
  "width": coalesce(asset->metadata.dimensions.width, width),
  "height": coalesce(asset->metadata.dimensions.height, height),
  "blurDataURL": coalesce(asset->metadata.lqip, blurDataURL),
  alt,
  caption,
  credit
}`;

export const PERSON_PROJECTION = `{
  "id": _id,
  "name": fullName,
  "slug": slug.current,
  "title": professionalTitle,
  roles,
  shortBio,
  "biography": coalesce(pt::text(biography), biography),
  "image": profileImage ${IMAGE_PROJECTION},
  location,
  expertise,
  languages,
  featured,
  active,
  "publicProfile": showAuthorPage,
  "department": department->title
}`;

export const CATEGORY_PROJECTION = `{
  "id": _id,
  title,
  titleHa,
  navigationLabel,
  navigationLabelHa,
  "slug": slug.current,
  description,
  descriptionHa,
  language,
  "parentSlug": parent->slug.current,
  "accent": accentColor,
  "order": navigationOrder,
  featured,
  showInNavigation,
  showInFooter,
  megaMenu
}`;

const STORY_CARD_FIELDS = `
  "id": _id,
  internalTitle,
  "headline": coalesce(publicHeadline, internalTitle),
  shortHeadline,
  mobileHeadline,
  "slug": slug.current,
  "standfirst": summary,
  deck,
  kicker,
  "type": contentType,
  "primaryCategory": primaryCategory->${CATEGORY_PROJECTION},
  "secondaryCategories": coalesce(secondaryCategories[]->${CATEGORY_PROJECTION}, []),
  "authors": coalesce(authors[]->${PERSON_PROJECTION}, []),
  "tags": coalesce(tags[]->title, []),
  "topics": coalesce(topics[]->title, []),
  "locations": coalesce(locations[]->title, []),
  language,
  edition,
  publishedAt,
  updatedAt,
  readingTime,
  "hero": coalesce(socialImage, seo.socialImage, heroMedia.image, coverImage, mainImage, cover, heroImage, image) ${IMAGE_PROJECTION},
  "socialImage": coalesce(socialImage, seo.socialImage, heroMedia.image, coverImage, mainImage, cover, heroImage, image) ${IMAGE_PROJECTION},
  "coverImage": coalesce(coverImage, mainImage, heroMedia.image, socialImage, seo.socialImage, cover, heroImage, image) ${IMAGE_PROJECTION},
  featured,
  homepageEligible,
  trendingEligible,
  breakingEligible,
  priority,
  "workflowStatus": workflow.status,
  "seoTitle": seo.title,
  "seoDescription": seo.description,
  searchKeywords,
  commentsEnabled,
  accessStatus
`;

export const STORY_CARD_PROJECTION = `{${STORY_CARD_FIELDS}}`;

export const STORY_DETAIL_PROJECTION = `{
  ${STORY_CARD_FIELDS},
  body,
  "contributors": contributors[]{
    "person": person->${PERSON_PROJECTION},
    role
  },
  "relatedStorySlugs": relatedStories[]->slug.current,
  correctionNote,
  editorsNote,
  disclosure,
  "sponsoredBy": coalesce(sponsoredBy->name, sponsoredBy.name, sponsoredBy),
  canonicalUrl
}`;
