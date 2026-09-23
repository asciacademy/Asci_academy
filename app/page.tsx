import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { ContinueLearningCard } from "@/components/home/continue-learning-card"
import { ExploreByGoal } from "@/components/home/explore-by-goal"
import { CourseCatalogPreview } from "@/components/home/course-catalog-preview"
import { LearningPathsSection } from "@/components/home/learning-paths-section"
import { PracticeSection } from "@/components/home/practice-section"
import { ProjectsPreviewSection } from "@/components/home/projects-preview-section"
import { CareerPreviewSection } from "@/components/home/career-preview-section"
import { ProductCTA } from "@/components/home/product-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary pb-16 md:pb-0">
      {/* 1. Global Product Navigation */}
      <Navbar />

      {/* 2. Hero Section with Live Student Cockpit Preview */}
      <Hero />

      {/* 3. Continue Learning Quick Resume Card */}
      <ContinueLearningCard />

      {/* 4. Explore by Goal (Intent-Driven Paths) */}
      <ExploreByGoal />

      {/* 5. Course Catalog Preview */}
      <CourseCatalogPreview />

      {/* 6. Structured Learning Paths (AI, Web, Systems) */}
      <LearningPathsSection />

      {/* 7. Practice & Daily Coding Challenges */}
      <PracticeSection />

      {/* 8. Portfolio Projects & Systems */}
      <ProjectsPreviewSection />

      {/* 9. Career & Opportunity Discovery (Unstop-style) */}
      <CareerPreviewSection />

      {/* 10. Product Call to Action & Compact Footer */}
      <ProductCTA />
      <Footer showCTA={false} />
    </main>
  )
}
