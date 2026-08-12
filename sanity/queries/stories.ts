import { defineQuery } from "next-sanity";
import {
  CATEGORY_PROJECTION,
  PERSON_PROJECTION,
  STORY_CARD_PROJECTION,
  STORY_DETAIL_PROJECTION,
} from "./fragments";

export const STORY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "story" && slug.current == $slug && (!defined(workflow.status) || workflow.status in ["published", "updated", "corrected"])][0]
  ${STORY_DETAIL_PROJECTION}
`);

export const STORY_LIST_QUERY = defineQuery(`
  *[_type == "story" && (!defined(workflow.status) || workflow.status in ["published", "updated", "corrected"])]
  | order(coalesce(publishedAt, _createdAt) desc) [$offset...$end]
  ${STORY_CARD_PROJECTION}
`);

export const STORY_SLUGS_QUERY = defineQuery(`
  *[_type == "story" && defined(slug.current) && (!defined(workflow.status) || workflow.status in ["published", "updated", "corrected"])] {
    "slug": slug.current,
    "updatedAt": coalesce(updatedAt, _updatedAt)
  }
`);

export const STORIES_BY_CATEGORY_QUERY = defineQuery(`
  *[
    _type == "story" &&
    (!defined(workflow.status) || workflow.status in ["published", "updated", "corrected"]) &&
    (
      primaryCategory->slug.current == $slug ||
      primaryCategory->slug.current == $slug + " " ||
      lower(primaryCategory->slug.current) == lower($slug) ||
      $slug in secondaryCategories[]->slug.current
    )
  ] | order(coalesce(publishedAt, _createdAt) desc) [$offset...$end]
  ${STORY_CARD_PROJECTION}
`);

export const STORIES_BY_AUTHOR_QUERY = defineQuery(`
  *[
    _type == "story" &&
    (!defined(workflow.status) || workflow.status in ["published", "updated", "corrected"]) &&
    $slug in authors[]->slug.current
  ] | order(coalesce(publishedAt, _createdAt) desc) [$offset...$end]
  ${STORY_CARD_PROJECTION}
`);

export const STORIES_BY_TOPIC_QUERY = defineQuery(`
  *[
    _type == "story" &&
    (!defined(workflow.status) || workflow.status in ["published", "updated", "corrected"]) &&
    ($slug in topics[]->slug.current || $slug in topics)
  ] | order(coalesce(publishedAt, _createdAt) desc) [$offset...$end]
  ${STORY_CARD_PROJECTION}
`);

export const STORIES_BY_TAG_QUERY = defineQuery(`
  *[
    _type == "story" &&
    (!defined(workflow.status) || workflow.status in ["published", "updated", "corrected"]) &&
    ($slug in tags[]->slug.current || $slug in tags)
  ] | order(coalesce(publishedAt, _createdAt) desc) [$offset...$end]
  ${STORY_CARD_PROJECTION}
`);

export const PERSON_BY_SLUG_QUERY = defineQuery(`
  *[_type == "person" && slug.current == $slug && showAuthorPage == true][0]
  ${PERSON_PROJECTION}
`);

export const PEOPLE_QUERY = defineQuery(`
  *[_type == "person" && active != false && showAuthorPage == true]
  | order(coalesce(displayOrder, 999) asc, fullName asc)
  ${PERSON_PROJECTION}
`);

export const CATEGORY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "category" && (slug.current == $slug || slug.current == $slug + " " || lower(slug.current) == lower($slug)) && active != false][0]
  ${CATEGORY_PROJECTION}
`);

export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category" && active != false]
  | order(coalesce(navigationOrder, 99) asc)
  ${CATEGORY_PROJECTION}
`);

export const SEARCH_STORIES_QUERY = defineQuery(`
  *[
    _type == "story" &&
    (!defined(workflow.status) || workflow.status in ["published", "updated", "corrected"]) &&
    (
      publicHeadline match $match ||
      summary match $match ||
      pt::text(body) match $match ||
      $match in authors[]->fullName ||
      $match in searchKeywords
    ) &&
    (!defined($category) || primaryCategory->slug.current == $category) &&
    (!defined($contentType) || contentType == $contentType) &&
    (!defined($topic) || $topic in topics[]->slug.current) &&
    (!defined($from) || publishedAt >= $from) &&
    (!defined($to) || publishedAt <= $to)
  ] | order(
    select($sort == "newest" => publishedAt, "") desc,
    select($sort != "newest" => _score, 0) desc,
    publishedAt desc
  ) [$offset...$end]
  ${STORY_CARD_PROJECTION}
`);
