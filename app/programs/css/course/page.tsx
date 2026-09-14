"use client"

import { UnifiedCoursePlayer } from "@/components/curriculum/unified-course-player"
import { CSS_COURSE_PARTS } from "@/lib/curriculum/css-course-data"

export default function CSSCoursePage() {
  return (
    <UnifiedCoursePlayer
      courseTitle="CSS3 Modern Styling, Flexbox & Grid Masterclass"
      courseSlug="css"
      trackBadge="CSS3 & Layout Engine"
      parts={CSS_COURSE_PARTS}
      backUrl="/programs/css"
    />
  )
}

