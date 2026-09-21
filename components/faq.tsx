"use client"

import { useState } from "react"
import { ChevronDown, MessageSquare, Search } from "lucide-react"
import { cn } from "@/lib/utils"

const FAQS = [
  {
    question: "Do I need prior coding experience to join?",
    answer: "Not at all! We offer courses for complete beginners that start from scratch, as well as intermediate and advanced tracks for learners looking to sharpen their skills."
  },
  {
    question: "How much time do I need to spend each week?",
    answer: "Most students spend about 8 to 12 hours each week. You can study at your own pace whenever it fits your schedule, including evenings and weekends."
  },
  {
    question: "How does 1-on-1 mentorship work?",
    answer: "You get weekly video calls with an experienced software engineer who reviews your code, answers questions, and gives you clear guidance whenever you get stuck."
  },
  {
    question: "What happens if I fall behind or get busy?",
    answer: "No problem. You have lifetime access to all lessons, exercises, and recordings. You can take a break and resume whenever you are ready."
  },
  {
    question: "Can I switch courses or try different topics?",
    answer: "Yes. Your membership gives you full access to all courses, so you can explore web development, Python, Java, and algorithms at your own pace."
  },
  {
    question: "Are live coding sessions recorded?",
    answer: "Yes! Every live coding session is recorded and added to your student dashboard so you can rewatch it whenever you like."
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [search, setSearch] = useState("")

  const filtered = search.trim()
    ? FAQS.filter(f => f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase()))
    : FAQS

  return (
    <section id="faq" className="relative py-20 lg:py-28 bg-background border-t border-hairline">
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-8">
        {/* Header with Dedicated Axel Stage */}
        <div className="relative mb-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-primary font-medium mb-3">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Common Questions</span>
            </div>
            <h2 className="font-serif text-3xl font-normal tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 max-w-xl text-sm sm:text-base text-body leading-relaxed">
              Clear, straightforward answers to common questions about our courses, mentorship, and learning schedule.
            </p>

            {/* Search bar */}
            <div className="relative mt-6 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search curriculum, mentorship, schedules..."
                suppressHydrationWarning
                className="w-full rounded-xl border border-border/80 bg-card/70 pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 transition-colors"
              />
            </div>
          </div>

          {/* Dedicated Axel Stage: Reserved layout space so nothing overlays */}
          <div className="hidden lg:flex relative shrink-0 w-64 h-56 items-center justify-center self-center lg:self-auto">
            <div
              id="faq-robot-anchor"
              className="w-full h-full relative flex items-center justify-center pointer-events-none select-none"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="max-w-5xl mx-auto space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm font-mono">
              No questions matched your search term.{" "}
              <button
                onClick={() => setSearch("")}
                className="text-primary hover:underline font-medium cursor-pointer"
              >
                Clear filter
              </button>
            </div>
          )}

          {filtered.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className={cn(
                  "rounded-2xl border border-border/80 transition-all duration-200 overflow-hidden",
                  isOpen ? "bg-secondary/60 shadow-xs border-primary/40" : "bg-card/70 hover:border-primary/30"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  suppressHydrationWarning
                  className="flex w-full items-center justify-between px-6 py-4.5 text-left gap-4 cursor-pointer"
                >
                  <span className="font-medium text-foreground text-sm sm:text-base">
                    {faq.question}
                  </span>
                  <div
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border/80 bg-background/80 text-muted-foreground transition-transform duration-200",
                      isOpen && "rotate-180 text-primary border-primary/40"
                    )}
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </div>
                </button>

                <div
                  className={cn(
                    "grid transition-all duration-200 ease-in-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-5 pt-1 text-sm leading-relaxed text-muted-foreground border-t border-border/60">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
