"use client"

import { UnifiedCoursePlayer } from "@/components/curriculum/unified-course-player"
import { TYPESCRIPT_COURSE_PARTS } from "@/lib/curriculum/typescript-course-data"

export default function TypeScriptCoursePage() {
  return (
    <UnifiedCoursePlayer
      courseTitle="Modern TypeScript & Type Systems Masterclass"
      courseSlug="typescript"
      trackBadge="TypeScript 5.x Standard"
      parts={TYPESCRIPT_COURSE_PARTS}
      backUrl="/programs/typescript"
    />
  )
}
