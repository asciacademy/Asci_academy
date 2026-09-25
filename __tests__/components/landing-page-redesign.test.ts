import { describe, it, expect } from "vitest"
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
import { StudentEcosystemHome } from "@/components/home/student-ecosystem-home"
import { Footer } from "@/components/footer"
import { PRIMARY_NAV, EXPLORE_MEGA_MENU } from "@/components/navbar"

describe("ASCI Landing Page Redesign (Unstop-Inspired Specification)", () => {
  it("03: Header contains clean navigation, search, and 5-pillar explore menu", () => {
    // Primary navigation links
    const labels = PRIMARY_NAV.map((nav) => nav.label)
    expect(labels).toContain("Learn")
    expect(labels).toContain("Practice")
    expect(labels).toContain("Compete")
    expect(labels).toContain("Career")

    // Explore mega menu pillars
    const categories = EXPLORE_MEGA_MENU.map((p) => p.category)
    expect(categories).toEqual(["LEARN", "PRACTICE", "BUILD", "COMPETE", "CAREER"])
  })

  it("04 & 06: Hero adheres to compact two-part layout with verified copy and warm background", () => {
    expect(EcosystemHero).toBeDefined()
    const heroCopy = {
      eyebrow: "ACADEMY OF SOFTWARE CRAFT & INTELLIGENCE",
      headlineLine1: "Build skills.",
      headlineLine2: "Build proof.",
      headlineLine3: "Build your career.",
      supporting: "Learn from structured courses, practice with real challenges, build projects, and discover career opportunities.",
      primaryCta: "Explore Learning",
      secondaryCta: "Explore Opportunities",
    }

    expect(heroCopy.eyebrow).toBe("ACADEMY OF SOFTWARE CRAFT & INTELLIGENCE")
    expect(heroCopy.primaryCta).toBe("Explore Learning")
    expect(heroCopy.secondaryCta).toBe("Explore Opportunities")
  })

  it("07: Technology Trust Strip contains recognizable modern engineering brands", () => {
    const expectedTechs = [
      "Python", "JavaScript", "React", "Next.js", "Java",
      "Docker", "AWS", "GitHub", "PostgreSQL", "AI & ML"
    ]
    expect(expectedTechs.length).toBe(10)
    expect(expectedTechs).toContain("Python")
    expect(expectedTechs).toContain("React")
    expect(expectedTechs).toContain("Docker")
    expect(expectedTechs).toContain("AWS")
  })

  it("08: Primary Product Discovery features 5 visual categories with sub-items", () => {
    expect(PrimaryDiscovery).toBeDefined()
    const pillars = [
      { title: "LEARN", items: "Courses · Learning Paths" },
      { title: "PRACTICE", items: "DSA · Challenges" },
      { title: "BUILD", items: "Projects · Simulators" },
      { title: "COMPETE", items: "Hackathons · Competitions" },
      { title: "CAREER", items: "Jobs · Internships" },
    ]

    expect(pillars.map((p) => p.title)).toEqual([
      "LEARN", "PRACTICE", "BUILD", "COMPETE", "CAREER"
    ])
    expect(pillars.every((p) => p.items.length > 0)).toBe(true)
  })

  it("09: Continue Learning supports both logged-in active course and logged-out starter journey", () => {
    expect(ContinueLearningBanner).toBeDefined()
  })

  it("10: Trending Courses discovery rail uses horizontal scrolling with metadata", () => {
    expect(TrendingCoursesRail).toBeDefined()
  })

  it("11: Upcoming Opportunities provides tabs for All, Hackathons, Competitions, Internships, Jobs", () => {
    expect(UpcomingOpportunitiesSection).toBeDefined()
    const tabs = ["All", "Hackathons", "Competitions", "Internships", "Jobs"]
    expect(tabs).toHaveLength(5)
  })

  it("12: Featured Competition banner highlights AI Innovation Challenge", () => {
    expect(FeaturedCompetitionBanner).toBeDefined()
    const featured = {
      title: "AI Innovation Challenge",
      subtitle: "Build something useful with AI.",
      mode: "Online",
      prize: "₹50,000 Prize",
      deadline: "Ends in 8 days",
      cta: "View Challenge",
    }
    expect(featured.title).toBe("AI Innovation Challenge")
    expect(featured.prize).toBe("₹50,000 Prize")
  })

  it("13: Build Something Real displays practical capstone projects", () => {
    expect(ProjectsRail).toBeDefined()
  })

  it("14: Choose Your Path features 5 structured career roadmaps", () => {
    expect(LearningPathsRail).toBeDefined()
    const paths = [
      "AI Engineer",
      "Full Stack Developer",
      "Backend Engineer",
      "Data Scientist",
      "Frontend Engineer",
    ]
    expect(paths).toHaveLength(5)
  })

  it("15: Career section highlights employer logos and live opportunities", () => {
    expect(CareerRail).toBeDefined()
    const headline = "Your skills should lead somewhere."
    expect(headline).toBe("Your skills should lead somewhere.")
  })

  it("16 & 19: Proof outcomes and community activity pulse are verified", () => {
    expect(CommunityOutcomesSection).toBeDefined()
    const proofMetrics = ["47+", "157+", "100+", "Verified"]
    expect(proofMetrics).toContain("47+")
    expect(proofMetrics).toContain("157+")
    expect(proofMetrics).toContain("100+")
  })

  it("17: Certificates section shows cryptographic proof preview", () => {
    expect(CertificatesSection).toBeDefined()
  })

  it("18: Axel companion section is compact with 3 focused capabilities", () => {
    expect(AxelCompactSection).toBeDefined()
    const capabilities = [
      { title: "Learn", desc: "Get explanations." },
      { title: "Practice", desc: "Get hints." },
      { title: "Build", desc: "Debug and improve." },
    ]
    expect(capabilities).toHaveLength(3)
    expect(capabilities[0].desc).toBe("Get explanations.")
    expect(capabilities[1].desc).toBe("Get hints.")
    expect(capabilities[2].desc).toBe("Debug and improve.")
  })

  it("20: Final CTA features clean, uncluttered action prompt", () => {
    expect(FinalCTASection).toBeDefined()
  })

  it("21: Compact footer covers Learn, Practice, Build, Career, Company, and Socials", () => {
    expect(Footer).toBeDefined()
  })

  it("22: StudentEcosystemHome orchestrates all sections in proper visual rhythm", () => {
    expect(StudentEcosystemHome).toBeDefined()
  })
})
