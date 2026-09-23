"use client"

import Link from "next/link"
import { ArrowRight, Compass, CheckCircle2 } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export function ProductCTA() {
  const { user } = useAuth()

  return (
    <section className="py-16 sm:py-24 border-b border-border/60 bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border/80 bg-secondary/40 p-8 sm:p-12 lg:p-16 text-center max-w-4xl mx-auto shadow-xs">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-mono font-medium text-primary mb-6">
            <span>START YOUR ENGINEERING JOURNEY</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground tracking-tight leading-[1.12]">
            Build the skills. <br />
            <span className="italic text-primary font-normal">Build the proof</span>.
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground mt-4 max-w-xl mx-auto leading-relaxed">
            Learn software engineering through structured courses, coding practice, real projects and career opportunities in one place.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href={user ? "/dashboard" : "/signup"}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary-active text-white px-7 py-3.5 text-sm font-semibold tracking-tight transition-all active:scale-[0.99] cursor-pointer shadow-xs w-full sm:w-auto text-center"
            >
              <span>{user ? "Go to Dashboard" : "Start Learning"}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border hover:border-foreground/30 bg-card hover:bg-secondary px-6 py-3.5 text-sm font-medium text-foreground transition-all cursor-pointer w-full sm:w-auto text-center"
            >
              <Compass className="h-4 w-4 text-muted-foreground" />
              <span>Explore Courses</span>
            </Link>
          </div>

          <div className="pt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-muted-foreground font-mono">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
              <span>Free tier available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
              <span>Instant browser compilers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
              <span>No credit card required</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
