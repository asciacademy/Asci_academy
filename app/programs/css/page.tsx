import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  Palette,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Code2,
  Play,
  Globe,
} from "lucide-react"
import { WEBDEV_COURSE_PARTS } from "@/lib/curriculum/webdev-course-data"

export const metadata = {
  title: "CSS Course - Learn CSS3 Styling & Flexbox Simply | ASCI",
  description: "Learn CSS3 styling, the Box Model, and Flexbox layouts with simple explanations, live interactive code previews, and zero confusion.",
}

export default function CSSLandingPage() {
  const cssParts = WEBDEV_COURSE_PARTS.filter((p) => p.id === "web-part-2")
  const totalLessons = cssParts.reduce(
    (acc, part) => acc + part.chapters.reduce((cAcc, ch) => cAcc + ch.lessons.length, 0),
    0
  )

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="h-[72px]" />

      <section className="relative overflow-hidden py-16 lg:py-24 border-b border-border/80 bg-card">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-6 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono font-medium shadow-2xs">
            <Palette className="h-3.5 w-3.5" />
            <span>Web Styling Track • {totalLessons} Lessons</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground leading-[1.15]">
            Learn CSS3 &amp; Design,{" "}
            <span className="italic font-serif text-primary">the simple way</span>.
          </h1>

          <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
            Turn plain HTML into stunning, modern user interfaces. Master colors, typography, the Box Model, and responsive Flexbox layouts.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/programs/css/course"
              className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-active text-primary-foreground px-7 py-3 text-sm font-semibold transition-all shadow-sm cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Learning Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/programs/webdev"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 hover:bg-secondary px-6 py-3 text-sm font-medium text-foreground transition-all cursor-pointer"
            >
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span>Full WebDev Track</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Syllabus */}
      <section className="py-16 max-w-5xl mx-auto px-6 lg:px-8">
        <div className="space-y-6">
          {cssParts.map((part) => (
            <div
              key={part.id}
              className="rounded-2xl border border-border/80 bg-card/70 dark:bg-[#181715] p-6 shadow-xs"
            >
              <h3 className="font-serif text-xl font-normal text-foreground mb-2">
                {part.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                {part.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-border/60">
                {part.chapters.flatMap((ch) => ch.lessons).map((lesson) => (
                  <Link
                    key={lesson.id}
                    href="/programs/css/course"
                    className="group flex items-center justify-between p-2.5 rounded-xl border border-border/60 bg-background hover:border-primary/40 hover:bg-secondary/60 transition-all text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <Code2 className="h-3.5 w-3.5 text-primary" />
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {lesson.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground/60 group-hover:text-primary transition-colors">
                      Learn &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
