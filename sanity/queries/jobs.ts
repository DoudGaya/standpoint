export const JOB_LISTINGS_QUERY = `*[_type == "jobListing" && (active == true || !defined(active))] | order(featured desc, publishedAt desc) {
  "id": _id,
  title,
  "slug": slug.current,
  department,
  location,
  "type": select(defined(employmentType) => employmentType, "Full-time"),
  description,
  googleFormUrl,
  "postedAt": publishedAt,
  closingDate,
  featured
}`;

export const JOB_BY_SLUG_QUERY = `*[_type == "jobListing" && slug.current == $slug && (active == true || !defined(active))][0] {
  "id": _id,
  title,
  "slug": slug.current,
  department,
  location,
  "type": select(defined(employmentType) => employmentType, "Full-time"),
  description,
  googleFormUrl,
  "postedAt": publishedAt,
  closingDate,
  featured
}`;

export const JOB_SLUGS_QUERY = `*[_type == "jobListing" && (active == true || !defined(active))] {
  "slug": slug.current,
  "updatedAt": _updatedAt
}`;
