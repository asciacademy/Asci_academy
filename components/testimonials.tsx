"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useScrollReveal } from "@/hooks/use-gsap"
import { Star, ChevronLeft, ChevronRight, Award, Plus, X, Loader2 } from "lucide-react"
import { getTestimonials, createTestimonial } from "@/app/actions/testimonials"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const verifiedAlumniTestimonials = [
  {
    id: "9b3691d0-efff-9785-0623-0299f7216f61",
    name: "Theja",
    role: "Google L4",
    cohort: "Alumni 2025 · Google L4",
    avatar: "TH",
    content: "The algorithmic optimization visualizers and the system design tracks made my interview prep seamless. I transitioned from struggling with dynamic programming invariants to securing offers at top tier tech firms within 4 months.",
    rating: 5,
  },
  {
    id: "b65dfa37-dfde-f692-e517-a2a0ad0a2d9d",
    name: "Yamuna.T",
    role: "Vercel Platform",
    cohort: "Batch 2025 · Vercel Platform",
    avatar: "YT",
    content: "The full-stack curriculum with Next.js and high-concurrency systems taught me design patterns that I implement daily in production. Having mentor code reviews completely elevated my standard for code quality.",
    rating: 5,
  },
  {
    id: "6836fbbe-c330-374e-7e9c-caa96017895e",
    name: "BATTINA RAVIMANOHAR",
    role: "Razorpay Core",
    cohort: "Batch 2025 · Razorpay Core",
    avatar: "BR",
    content: "I started with basic data structure syntax and graduated to engineering distributed idempotency engines. The hackathons and live speed challenges gave me the real portfolio that recruiters cared about.",
    rating: 5,
  },
  {
    id: "8611efb9-c95b-c367-f1bb-57821f48e6e5",
    name: "Yamuna Reddy Thangasani",
    role: "Microsoft Fellow",
    cohort: "Batch 2026 · Microsoft Fellow",
    avatar: "YR",
    content: "The Agentic AI curriculum is unlike anything else on the internet. Working with LangGraph, stateful PRAL loops, and MCP tools directly prepared me for cutting-edge autonomous engineering roles.",
    rating: 5,
  },
  {
    id: "cf58f520-0a67-cdea-4091-aec9b89c340b",
    name: "Shadows Elite",
    role: "Zerodha Systems",
    cohort: "Batch 2025 · Zerodha Systems",
    avatar: "SE",
    content: "The low-latency Go and distributed database modules pushed me to understand lock contention and cache stampedes. ASCI was the highest ROI decision of my college journey.",
    rating: 5,
  },
]

export function Testimonials() {
  const headerRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.7 })
  const [activeIndex, setActiveIndex] = useState(0)
  const cardsRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [liveTestimonials, setLiveTestimonials] = useState<any[]>(verifiedAlumniTestimonials)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userHoverRating, setUserHoverRating] = useState(0)
  const [userRating, setUserRating] = useState(5)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % liveTestimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [liveTestimonials.length])

  useEffect(() => {
    async function loadTestimonials() {
      const data = await getTestimonials()
      if (data && data.length > 0) setLiveTestimonials(data)
    }
    loadTestimonials()
  }, [])

  const prev = () => setActiveIndex((i) => (i - 1 + liveTestimonials.length) % liveTestimonials.length)
  const next = () => setActiveIndex((i) => (i + 1) % liveTestimonials.length)

  const getVisible = () => {
    if (liveTestimonials.length === 0) return []
    const result = []
    for (let i = 0; i < Math.min(3, liveTestimonials.length); i++) {
      result.push(liveTestimonials[(activeIndex + i) % liveTestimonials.length])
    }
    return result
  }

  useEffect(() => {
    if (!cardsRef.current) return
    const cards = cardsRef.current.querySelectorAll(".testimonial-card")
    gsap.killTweensOf(cards)
    gsap.fromTo(cards, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: "power2.out" })
    return () => {
      gsap.killTweensOf(cards)
    }
  }, [activeIndex, liveTestimonials])

  const handleWriteReviewClick = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push("/login")
      return
    }
    setIsModalOpen(true)
  }

  const handleSubmitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    formData.append("rating", userRating.toString())
    const res = await createTestimonial(formData)
    setIsSubmitting(false)
    if (res.success) {
      setIsModalOpen(false)
      const data = await getTestimonials()
      if (data && data.length > 0) setLiveTestimonials(data)
    } else {
      alert(res.error || "Failed to submit review.")
    }
  }

  return (
    <section id="testimonials" className="relative py-20 lg:py-28 bg-secondary/40 border-y border-hairline">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header with Dedicated Axel Stage */}
        <div ref={headerRef} className="relative mb-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-primary font-medium mb-3">
              <Award className="h-3.5 w-3.5" />
              <span>Student Stories</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground" style={{ letterSpacing: "-1px" }}>
              Loved by Thousands of Learners
            </h2>
            <p className="mt-3 max-w-xl text-sm sm:text-base text-body leading-relaxed">
              Read honest stories from students who learned coding, built real projects, and landed great developer jobs.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={handleWriteReviewClick}
                suppressHydrationWarning
                className="inline-flex items-center gap-1.5 rounded-md border border-hairline bg-card hover:bg-secondary text-foreground px-4 py-2 text-xs font-medium transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5 text-primary" />
                Add Review
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  suppressHydrationWarning
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-card text-foreground transition-colors hover:bg-secondary cursor-pointer"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={next}
                  suppressHydrationWarning
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-card text-foreground transition-colors hover:bg-secondary cursor-pointer"
                  aria-label="Next"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Dedicated Axel Stage: Reserved layout space so nothing overlays */}
          <div className="hidden lg:flex relative shrink-0 w-64 h-52 items-center justify-center self-center lg:self-auto">
            <div
              id="testimonials-robot-anchor"
              className="w-full h-full relative flex items-center justify-center pointer-events-none select-none"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Cards Grid */}
        <div ref={cardsRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {getVisible().map((t, i) => (
            <div
              key={`${t.name}-${activeIndex}`}
              className={`testimonial-card group relative flex flex-col rounded-2xl border border-hairline dark:border-white/[0.08] bg-card/85 dark:bg-[#181715]/85 p-6 sm:p-8 transition-all duration-200 hover:border-foreground/30 dark:hover:border-white/25 hover:-translate-y-0.5 shadow-2xs ${
                i === 0 ? "" : i === 1 ? "hidden sm:flex" : "hidden lg:flex"
              }`}
            >
              {/* Warm amber stars */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-[#e8a55a] text-[#e8a55a]" />
                ))}
              </div>

              {/* Review quote */}
              <p className="flex-1 text-sm leading-relaxed text-body italic">
                {`"${t.content}"`}
              </p>

              {/* Author footer */}
              <div className="mt-6 flex items-center gap-3 border-t border-hairline/60 pt-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hairline bg-secondary text-xs font-semibold text-foreground">
                  {t.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">{t.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{t.role}</p>
                </div>
                <span className="badge-pill text-[10px]">
                  {t.cohort}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination indicator */}
        <div className="mt-8 flex justify-center gap-1.5">
          {liveTestimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              suppressHydrationWarning
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex ? "w-6 bg-primary" : "w-1.5 bg-hairline hover:bg-muted-foreground/40"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-xl border border-hairline bg-background p-6 shadow-xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 rounded-md p-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="mb-5">
              <h3 className="font-serif text-xl font-normal text-foreground">Submit an Alumni Review</h3>
              <p className="text-xs text-muted-foreground mt-1">Share your experience with the engineering cohort.</p>
            </div>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Rating</label>
                <div className="flex gap-1" onMouseLeave={() => setUserHoverRating(0)}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setUserHoverRating(star)}
                      onClick={() => setUserRating(star)}
                      className="transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        className={`h-5 w-5 ${
                          (userHoverRating || userRating) >= star ? "fill-[#e8a55a] text-[#e8a55a]" : "text-hairline"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="cohort" className="mb-1.5 block text-xs font-medium text-foreground">Cohort / Current Role</label>
                <input
                  id="cohort"
                  name="cohort"
                  type="text"
                  placeholder="e.g. Cohort 04 · SWE at Stripe"
                  defaultValue="Community Member"
                  required
                  className="w-full rounded-md border border-hairline bg-card px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="content" className="mb-1.5 block text-xs font-medium text-foreground">Your Review</label>
                <textarea
                  id="content"
                  name="content"
                  rows={4}
                  placeholder="Detail your learning outcomes and career transition..."
                  required
                  minLength={10}
                  className="w-full resize-none rounded-md border border-hairline bg-card px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary"
                />
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-hairline">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-md border border-hairline bg-transparent px-4 py-2 text-xs font-medium hover:bg-secondary transition-colors text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary inline-flex items-center justify-center text-xs font-medium cursor-pointer"
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
