"use client"

import { UnifiedCoursePlayer } from "@/components/curriculum/unified-course-player"
import { REACT_COURSE_PARTS } from "@/lib/curriculum/react-course-data"

export default function ReactCoursePage() {
  return (
    <UnifiedCoursePlayer
      courseTitle="React 19 & Next.js Architecture Masterclass"
      courseSlug="react"
      trackBadge="React 19 & Next.js Standard"
      parts={REACT_COURSE_PARTS}
      backUrl="/programs/react"
    />
  )
}
