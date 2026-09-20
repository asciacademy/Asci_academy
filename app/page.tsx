import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { LandingMarquee } from "@/components/landing-marquee"
import { StatsCounter } from "@/components/stats-counter"
import { Courses } from "@/components/courses"
import { FeaturedMasterTracks } from "@/components/featured-master-tracks"
import { Features } from "@/components/features"
import { DSAVisualizerWrapper } from "@/components/dsa-visualizer-wrapper"
import { Testimonials } from "@/components/testimonials"
import { Pricing } from "@/components/pricing"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"

import { getPlatformStats } from "@/app/actions/stats"

export default async function Home() {
  const stats = await getPlatformStats()

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <Hero />
      <LandingMarquee />
      <StatsCounter />
      <Courses />
      <FeaturedMasterTracks />
      <Features stats={stats} />
      <DSAVisualizerWrapper />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer showCTA />
    </main>
  )
}
