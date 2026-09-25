"use client"

import React from "react"
import { EcosystemHero } from "@/components/home/ecosystem-hero"
import { PrimaryDiscovery } from "@/components/home/primary-discovery"
import { ContinueLearningBanner } from "@/components/home/continue-learning-banner"
import { TrendingCoursesRail } from "@/components/home/trending-courses-rail"
import { UpcomingOpportunitiesSection } from "@/components/home/upcoming-opportunities-section"
import { FeaturedCompetitionBanner } from "@/components/home/featured-competition-banner"
import { ProjectsRail } from "@/components/home/projects-rail"
import { LearningPathsRail } from "@/components/home/learning-paths-rail"
import { CareerRail } from "@/components/home/career-rail"
import { AxelCompactSection } from "@/components/home/axel-compact-section"
import { CertificatesSection } from "@/components/home/certificates-section"
import { CommunityOutcomesSection } from "@/components/home/community-outcomes-section"
import { FinalCTASection } from "@/components/home/final-cta-section"
import type { CurriculumCourse } from "@/lib/curriculum-data"
import type { EcosystemData } from "@/app/actions/unstop"

interface StudentEcosystemHomeProps {
  courses?: CurriculumCourse[]
  ecosystem?: EcosystemData
}

/**
 * ASCI Academy Landing Page
 *
 * Implements the 30-Point Original ASCI Student Ecosystem Specification:
 * - Two-part compact hero with real UI composition (no 3D illustration)
 * - Technology trust strip
 * - Primary product discovery (5 pillars: Learn, Practice, Build, Compete, Career)
 * - Continue learning (personalized progress vs starter courses)
 * - Trending courses discovery rail (horizontal scrolling)
 * - Upcoming opportunities with interactive tabs (Hackathons, Competitions, Internships, Jobs)
 * - Featured competition banner (AI Innovation Challenge)
 * - "Build something real" project capstones
 * - "Choose your path" learning paths
 * - "Your skills should lead somewhere" career section with employer logos
 * - Meet Axel compact companion layer
 * - "Prove what you know" cryptographic certificates
 * - Capability outcomes + Community pulse
 * - Clean final CTA & compact footer
 */
export function StudentEcosystemHome({ courses = [] }: StudentEcosystemHomeProps) {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors selection:bg-primary/20 selection:text-primary">
      {/* 01. Two-Part Compact Hero & Technology Trust Strip */}
      <EcosystemHero />

      {/* Main Content Container with Intentional Rhythm & Spacing (48-64px) */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 space-y-12 sm:space-y-16">
        {/* 02. Primary Product Discovery (5 Visual Categories) */}
        <PrimaryDiscovery />

        {/* 03. Continue Learning / Starter Journey */}
        <ContinueLearningBanner />

        {/* 04. Trending Courses Rail (Horizontal Scroll) */}
        <TrendingCoursesRail courses={courses} />

        {/* 05. Upcoming Opportunities with Tabs */}
        <UpcomingOpportunitiesSection />

        {/* 06. Featured Competition Banner */}
        <FeaturedCompetitionBanner />

        {/* 07. Build Something Real (Capstones) */}
        <ProjectsRail />

        {/* 08. Choose Your Path (Career Roadmaps) */}
        <LearningPathsRail />

        {/* 09. Career Section (Employer Logos & Live Roles) */}
        <CareerRail />

        {/* 10. Axel Engineering Companion */}
        <AxelCompactSection />

        {/* 11. Certificates & Verifiable Proof */}
        <CertificatesSection />

        {/* 12. ASCI Capability Outcomes & Community Pulse */}
        <CommunityOutcomesSection />

        {/* 13. Final CTA */}
        <FinalCTASection />
      </div>
    </div>
  )
}
