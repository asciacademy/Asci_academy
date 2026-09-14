"use client"

import { UnifiedCoursePlayer } from "@/components/curriculum/unified-course-player"
import { SQL_COURSE_PARTS } from "@/lib/curriculum/sql-course-data"

export default function SQLCoursePage() {
  return (
    <UnifiedCoursePlayer
      courseTitle="SQL & Relational Databases Architecture Masterclass"
      courseSlug="sql"
      trackBadge="SQL Standard & RDBMS"
      parts={SQL_COURSE_PARTS}
      backUrl="/programs/sql"
    />
  )
}
