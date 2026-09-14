"use client"

import { UnifiedCoursePlayer } from "@/components/curriculum/unified-course-player"
import { CPP_COURSE_PARTS } from "@/lib/curriculum/cpp-course-data"

export default function CPPCoursePage() {
  return (
    <UnifiedCoursePlayer
      courseTitle="C++ Systems & OOP Masterclass"
      courseSlug="cpp"
      trackBadge="High Performance"
      parts={CPP_COURSE_PARTS}
      backUrl="/programs/cpp"
    />
  )
}
