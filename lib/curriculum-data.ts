export interface CurriculumLesson {
  id: string
  title: string
  sequence_order: number
  content_type: "text" | "challenge"
  xp_reward: number
  description: string
  content: string
  challenge_data?: {
    initialCode: string
    expectedOutput: string
    instructions: string
  }
}

export interface CurriculumModule {
  id: string
  title: string
  sequence_order: number
  description?: string
  lessons: CurriculumLesson[]
}

export interface CurriculumCourse {
  id: string
  title: string
  slug: string
  description: string
  category: "AI & ML" | "Data Science" | "Git & DevOps" | "Cybersecurity" | "Programming" | "Cloud & Infra" | "DSA" | "Backend" | "Web Development"
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels"
  weeks: string
  duration_hours: number
  lessons: number
  projects: number
  certificate: string
  is_premium: boolean
  thumbnail_url?: string
  tools: string[]
  iconName?: string
  highlights?: string[]
  modules: CurriculumModule[]
}

import { AI_ML_COURSES } from "./curriculum/ai-ml"
import { DATA_SCIENCE_COURSES } from "./curriculum/data-science"
import { DEVOPS_GIT_COURSES } from "./curriculum/devops-git"
import { CYBERSECURITY_COURSES } from "./curriculum/cybersecurity"
import { PROGRAMMING_COURSES } from "./curriculum/programming"
import { DSA_JAVA_COURSES } from "./curriculum/dsa-java"
import { WEBDEV_AND_LANGUAGES_COURSES } from "./curriculum/webdev"

export const CURRICULUM_COURSES: CurriculumCourse[] = [
  ...WEBDEV_AND_LANGUAGES_COURSES,
  ...PROGRAMMING_COURSES,
  ...DSA_JAVA_COURSES,
  ...AI_ML_COURSES,
  ...DATA_SCIENCE_COURSES,
  ...DEVOPS_GIT_COURSES,
  ...CYBERSECURITY_COURSES,
]

export function getCurriculumCourseBySlug(slug: string): CurriculumCourse | undefined {
  if (!slug) return undefined
  const s = slug.toLowerCase().replace(/_/g, "-")
  return CURRICULUM_COURSES.find(c => {
    const cSlug = c.slug?.toLowerCase().replace(/_/g, "-")
    const cId = c.id?.toLowerCase().replace(/_/g, "-")
    return cSlug === s || cId === s
  })
}

export function getAllCurriculumCourses(): CurriculumCourse[] {
  return CURRICULUM_COURSES
}

