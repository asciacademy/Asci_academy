"use client"

import { DiscoveryRail } from "@/components/discovery/discovery-rail"
import { CourseCard } from "@/components/cards/course-card"
import type { CurriculumCourse } from "@/lib/curriculum-data"

interface TrendingCoursesRailProps {
  courses?: CurriculumCourse[]
}

export function TrendingCoursesRail({ courses = [] }: TrendingCoursesRailProps) {
  const displayCourses = courses.length > 0 ? courses.slice(0, 6) : [
    {
      id: "course-python",
      slug: "python",
      title: "Python Programming",
      description: "Foundational Python syntax, data structures, and async programming.",
      category: "Programming",
      level: "Beginner",
      weeks: "4 Weeks",
      duration_hours: 24,
      lessons: 24,
      projects: 3,
      certificate: "yes",
    },
    {
      id: "course-react",
      slug: "react",
      title: "React 19 & Architecture",
      description: "Modern component architecture, server components, and state management.",
      category: "Web Development",
      level: "Intermediate",
      weeks: "6 Weeks",
      duration_hours: 28,
      lessons: 28,
      projects: 4,
      certificate: "yes",
    },
    {
      id: "course-golang",
      slug: "golang",
      title: "Go Distributed Systems",
      description: "Build concurrent microservices, gRPC backends, and Raft consensus.",
      category: "Backend",
      level: "Advanced",
      weeks: "6 Weeks",
      duration_hours: 20,
      lessons: 20,
      projects: 3,
      certificate: "yes",
    },
    {
      id: "course-dsa",
      slug: "dsa",
      title: "Data Structures & Algorithms",
      description: "Comprehensive 470+ coding problems following the Striver A2Z roadmap.",
      category: "DSA",
      level: "All Levels",
      weeks: "8 Weeks",
      duration_hours: 48,
      lessons: 48,
      projects: 6,
      certificate: "yes",
    },
  ]

  return (
    <DiscoveryRail
      title="Trending Courses"
      subtitle="Popular with ASCI learners"
      actionHref="/courses"
      actionLabel="View All"
      count={courses.length || 47}
    >
      {displayCourses.map((c) => (
        <div key={c.id} className="min-w-[270px] sm:min-w-[290px] flex-1 snap-start">
          <CourseCard
            id={c.id}
            slug={c.slug}
            title={c.title}
            description={c.description}
            category={c.category}
            level={c.level}
            duration={c.weeks}
            lessonsCount={c.lessons}
            projectsCount={c.projects}
            hasCertificate={!!c.certificate}
          />
        </div>
      ))}
    </DiscoveryRail>
  )
}
