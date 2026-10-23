import { defineQuery } from 'next-sanity'

export const courseSummaryProjection = `
  _id,
  title,
  "slug": slug.current,
  summary,
  level,
  price,
  popular,
  studentCount,
  "coverImage": coverImage {
    alt,
    "asset": asset->{_id, url}
  },
  "instructor": instructor->{
    _id,
    name,
    "slug": slug.current,
    "photo": photo{alt, "asset": asset->{_id, url}}
  },
  "category": category->{_id, title, "slug": slug.current}
`

export const coursesQuery = defineQuery(`
  *[_type == "course"] | order(popular desc, title asc) {
    ${courseSummaryProjection}
  }
`)

export const courseBySlugQuery = defineQuery(`
  *[_type == "course" && slug.current == $slug][0] {
    ${courseSummaryProjection},
    learningOutcomes: coalesce(learningOutcomes, [])[]{_key, icon, title, description},
    modules[]{
      _key,
      title,
      summary,
      "lessons": lessons[]->{
        _id,
        title,
        "slug": slug.current,
        duration,
        freePreview,
        "thumbnail": thumbnail{alt, "asset": asset->{_id, url}}
      }
    }
  }
`)

export const lessonBySlugQuery = defineQuery(`
  *[_type == "lesson" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    videoUrl,
    duration,
    freePreview,
    studentCount,
    "thumbnail": thumbnail{alt, "asset": asset->{_id, url}},
    notes,
    keyPoints[]{_key, title},
    proTip,
    resources[]{_key, type, title, description, url},
    "course": *[_type == "course" && references(^._id)][0] {
      _id,
      title,
      "slug": slug.current,
      "instructor": instructor->{_id, name, "slug": slug.current},
      "modules": modules[]{
        _key,
        title,
        summary,
        "lessons": lessons[]->{_id, title, "slug": slug.current, duration}
      }
    }
  }
`)

export const instructorBySlugQuery = defineQuery(`
  *[_type == "instructor" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    "photo": photo{alt, "asset": asset->{_id, url}},
    expertise,
    bio,
    "courses": *[_type == "course" && references(^._id)] | order(title asc) {
      ${courseSummaryProjection}
    }
  }
`)

export const categoriesQuery = defineQuery(`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description
  }
`)
