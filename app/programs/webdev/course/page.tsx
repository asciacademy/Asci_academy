"use client"

import { UnifiedCoursePlayer } from "@/components/curriculum/unified-course-player"
import { WEBDEV_COURSE_PARTS } from "@/lib/curriculum/webdev-course-data"

export default function WebDevCoursePage() {
  return (
    <UnifiedCoursePlayer
      courseTitle="Web Development Master Track (HTML, CSS, JS)"
      courseSlug="webdev"
      trackBadge="Full Stack Frontend"
      parts={WEBDEV_COURSE_PARTS}
      backUrl="/programs/webdev"
    />
  )
}
