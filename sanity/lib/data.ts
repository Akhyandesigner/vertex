import 'server-only'

import { sanityClient } from './client'
import {
  categoriesQuery,
  courseBySlugQuery,
  coursesQuery,
  instructorBySlugQuery,
  lessonBySlugQuery,
} from './queries'

export interface SanityImage {
  alt?: string | null
  asset: { _id: string; url: string } | null
}

export interface InstructorSummary {
  _id: string
  name: string
  slug: string
  photo?: SanityImage | null
}

export interface Category {
  _id: string
  title: string
  slug: string
  description?: string | null
}

export interface CourseSummary {
  _id: string
  title: string
  slug: string
  summary?: string | null
  level?: string | null
  price?: number | null
  popular?: boolean | null
  studentCount?: number | null
  coverImage?: SanityImage | null
  instructor?: InstructorSummary | null
  category?: Pick<Category, '_id' | 'title' | 'slug'> | null
}

export interface LessonSummary {
  _id: string
  title: string
  slug: string
  duration?: number | null
  freePreview?: boolean | null
  thumbnail?: SanityImage | null
}

export interface CourseModule {
  _key: string
  title: string
  summary?: string | null
  lessons: Array<LessonSummary | null>
}

export interface Course extends CourseSummary {
  learningOutcomes: Array<{
    _key: string
    icon: string
    title: string
    description: string
  }>
  modules: CourseModule[]
}

export interface Lesson extends LessonSummary {
  videoUrl: string
  studentCount?: number | null
  notes?: Array<Record<string, unknown>> | null
  keyPoints?: Array<{ _key: string; title: string }> | null
  proTip?: string | null
  resources?: Array<{
    _key: string
    type: string
    title: string
    description?: string | null
    url: string
  }> | null
  course?: {
    _id: string
    title: string
    slug: string
    instructor?: InstructorSummary | null
    modules: CourseModule[]
  } | null
}

export interface Instructor extends InstructorSummary {
  expertise: string[]
  bio?: string | null
  courses: CourseSummary[]
}

export async function getCourses(): Promise<CourseSummary[]> {
  return sanityClient.fetch<CourseSummary[]>(coursesQuery)
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  return sanityClient.fetch<Course | null>(courseBySlugQuery, { slug })
}

export async function getLessonBySlug(slug: string): Promise<Lesson | null> {
  return sanityClient.fetch<Lesson | null>(lessonBySlugQuery, { slug })
}

export async function getInstructorBySlug(
  slug: string,
): Promise<Instructor | null> {
  return sanityClient.fetch<Instructor | null>(instructorBySlugQuery, { slug })
}

export async function getCategories(): Promise<Category[]> {
  return sanityClient.fetch<Category[]>(categoriesQuery)
}
