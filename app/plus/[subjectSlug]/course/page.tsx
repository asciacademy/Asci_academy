import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PLUS_SUBJECTS, getSubjectBySlug } from "@/lib/curriculum/plus-curriculum-data"
import { PlusCourseDocsLayout } from "@/components/curriculum/plus-course-docs-layout"

interface CoursePageProps {
  params: Promise<{ subjectSlug: string }>
}

export async function generateStaticParams() {
  const slugs: { subjectSlug: string }[] = []
  PLUS_SUBJECTS.forEach(s => {
    slugs.push({ subjectSlug: s.slug })
    if (s.legacySlug && s.legacySlug !== s.slug) {
      slugs.push({ subjectSlug: s.legacySlug })
    }
  })
  return slugs
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { subjectSlug } = await params
  const subject = getSubjectBySlug(subjectSlug)
  if (!subject) return { title: "Course Not Found | ASCI LMS" }

  return {
    title: `${subject.title} - Interactive Systems Docs & Course | ASCI LMS`,
    description: subject.description,
  }
}

export default async function PlusCoursePage({ params }: CoursePageProps) {
  const { subjectSlug } = await params
  const subject = getSubjectBySlug(subjectSlug)

  if (!subject) {
    notFound()
  }

  return <PlusCourseDocsLayout subject={subject} />
}
