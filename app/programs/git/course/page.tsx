"use client"

import { UnifiedCoursePlayer } from "@/components/curriculum/unified-course-player"
import { GIT_DEVOPS_COURSE_PARTS } from "@/lib/curriculum/git-devops-course-data"

export default function GitCoursePage() {
  return (
    <UnifiedCoursePlayer
      courseTitle="Git, Docker & Modern DevOps Engineering Masterclass"
      courseSlug="git"
      trackBadge="Git & Container Standard"
      parts={GIT_DEVOPS_COURSE_PARTS}
      backUrl="/programs/git"
    />
  )
}
