"use client"

import { UnifiedCoursePlayer } from "@/components/curriculum/unified-course-player"
import { JAVASCRIPT_COURSE_PARTS } from "@/lib/curriculum/javascript-course-data"

export default function JavaScriptCoursePage() {
  return (
    <UnifiedCoursePlayer
      courseTitle="Modern JavaScript (ES6+) Architecture Masterclass"
      courseSlug="javascript"
      trackBadge="JavaScript & Runtime Standard"
      parts={JAVASCRIPT_COURSE_PARTS}
      backUrl="/programs/javascript"
    />
  )
}

