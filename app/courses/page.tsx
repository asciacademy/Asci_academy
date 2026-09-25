import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { CourseMarketplace } from "@/components/courses/course-marketplace"
import { Footer } from "@/components/footer"
import { CURRICULUM_COURSES } from "@/lib/curriculum-data"

export const metadata: Metadata = {
  title: "Engineering Courses & Marketplace | ASCI Academy",
  description:
    "Explore 29 accredited engineering tracks in Systems, C++, Java, React, Python, Cloud, and DSA. Step-through visualizers, sandboxes, and verified certificates.",
}

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />
      <div className="pt-16 sm:pt-20">
        <CourseMarketplace initialCourses={CURRICULUM_COURSES} />
      </div>
      <Footer />
    </main>
  )
}
