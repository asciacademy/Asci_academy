"use client"

import { UnifiedCoursePlayer } from "@/components/curriculum/unified-course-player"
import { C_COURSE_PARTS } from "@/lib/curriculum/c-course-data"

export default function CCoursePage() {
  return (
    <UnifiedCoursePlayer
      courseTitle="C Programming Masterclass"
      courseSlug="c"
      trackBadge="Systems & Hardware"
      parts={C_COURSE_PARTS}
      backUrl="/programs/c"
    />
  )
}
