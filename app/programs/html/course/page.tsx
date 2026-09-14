"use client"

import { UnifiedCoursePlayer } from "@/components/curriculum/unified-course-player"
import { HTML_COURSE_PARTS } from "@/lib/curriculum/html-course-data"

export default function HTMLCoursePage() {
  return (
    <UnifiedCoursePlayer
      courseTitle="HTML5 Web Structure & Semantics Masterclass"
      courseSlug="html"
      trackBadge="HTML5 & W3C Standard"
      parts={HTML_COURSE_PARTS}
      backUrl="/programs/html"
    />
  )
}

