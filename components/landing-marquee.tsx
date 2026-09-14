"use client"

const items = [
  "Data Structures", "Algorithms", "Web Development", "Python",
  "Java", "React & Next.js", "System Design", "Databases",
  "1-on-1 Mentoring", "Interview Prep",
]

export function LandingMarquee() {
  return (
    <section className="relative overflow-hidden border-y border-hairline bg-secondary py-5 w-full marquee-wrapper">
      {/* Marquee row */}
      <div className="animate-marquee flex whitespace-nowrap items-center w-max py-1" style={{ animationDuration: '65s' }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <span key={i} className="mx-8 flex items-center gap-8">
            {items.map((t, idx) => (
              <span key={t + idx} className="flex items-center gap-8">
                <span
                  className={`text-xl sm:text-2xl lg:text-3xl font-serif tracking-tight transition-colors duration-300 hover:text-primary cursor-default ${
                    idx % 3 === 0
                      ? "text-foreground"
                      : idx % 3 === 1
                      ? "text-body"
                      : "text-muted-foreground"
                  }`}
                  style={{ letterSpacing: '-0.5px' }}
                >
                  {t}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              </span>
            ))}
          </span>
        ))}
      </div>
    </section>
  )
}
