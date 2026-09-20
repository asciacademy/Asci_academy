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

export function getCurriculumLessonInfo(lessonId: string): {
  course: CurriculumCourse
  module: CurriculumModule
  lesson: CurriculumLesson
} | undefined {
  if (!lessonId) return undefined
  const targetId = lessonId.toLowerCase().trim()
  for (const course of CURRICULUM_COURSES) {
    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        if (lesson.id?.toLowerCase().trim() === targetId) {
          return { course, module, lesson }
        }
      }
    }
  }
  return undefined
}

export interface CourseParts {
  beginnerModules: (CurriculumModule & { is_premium?: boolean })[]
  advancedModules: (CurriculumModule & { is_premium?: boolean })[]
}

export function getCourseParts(course: CurriculumCourse): CourseParts {
  if (!course || !course.modules || course.modules.length === 0) {
    return { beginnerModules: [], advancedModules: [] }
  }

  const hasExplicitPremium = course.modules.some((m: any) => m.is_premium === true)
  if (hasExplicitPremium) {
    return {
      beginnerModules: course.modules.filter((m: any) => !m.is_premium),
      advancedModules: course.modules.filter((m: any) => m.is_premium),
    }
  }

  if (course.modules.length === 1) {
    return {
      beginnerModules: [...course.modules],
      advancedModules: [],
    }
  }

  const splitIdx = Math.ceil(course.modules.length / 2)
  const beginner = course.modules.slice(0, splitIdx)
  const advanced = course.modules.slice(splitIdx).map((m) => ({ ...m, is_premium: true }))

  return {
    beginnerModules: beginner,
    advancedModules: advanced,
  }
}

export function isLessonLocked(
  course: CurriculumCourse,
  module: CurriculumModule & { is_premium?: boolean },
  userTier?: string,
  isTestDrive?: boolean
): boolean {
  if (isTestDrive) return false
  if (userTier === "pro" || userTier === "architect") return false
  if (module?.is_premium) return true
  return false
}

