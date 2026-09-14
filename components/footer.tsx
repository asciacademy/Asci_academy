"use client"

import { ArrowRight, Github, Twitter, Linkedin, Youtube } from "lucide-react"
import { useState } from "react"
import { AsciLogo } from "@/components/asci-logo"

const footerColumns = [
  {
    heading: "Courses",
    links: [
      { label: "Complete DSA Sheet", href: "/dsa" },
      { label: "Java Complete Guide", href: "/programs/java" },
      { label: "Python for Developers", href: "/programs/python" },
      { label: "React & Next.js", href: "/programs/react" },
      { label: "Backend Development", href: "/programs/backend" },
      { label: "System Design Basics", href: "/programs/system-design" },
    ],
  },
  {
    heading: "Practice & Pricing",
    links: [
      { label: "All 29 Courses", href: "/programs" },
      { label: "Coding Practice", href: "/dsa" },
      { label: "Pricing Plans", href: "/pricing" },
      { label: "Career Paths", href: "/degrees" },
      { label: "Student Results", href: "/results" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "Discord Community", href: "https://discord.com", external: true },
      { label: "GitHub Projects", href: "https://github.com", external: true },
      { label: "Student Network", href: "/community" },
      { label: "Study Groups", href: "/community" },
      { label: "1-on-1 Mentoring", href: "/community" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/results" },
      { label: "Careers", href: "mailto:careers@asci.dev" },
      { label: "Contact Us", href: "mailto:hello@asci.dev" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
]

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
]

export function Footer({ showCTA = false }: { showCTA?: boolean }) {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <footer id="footer" className="relative">
      {/* Pre-footer coral CTA band */}
      {showCTA && (
        <div className="section-spacing">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-primary px-8 py-16 text-center sm:px-16 sm:py-20 shadow-xs">
              <h2 className="font-serif text-3xl sm:text-4xl text-primary-foreground tracking-tight" style={{ letterSpacing: '-0.5px' }}>
                Start learning to code today
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-primary-foreground/90 leading-relaxed">
                Join thousands of students learning to code, practicing data structures, and building real-world projects with mentor guidance.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <a
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-all hover:scale-[1.02] shadow-xs"
                >
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/programs"
                  className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary-foreground/10"
                >
                  Explore All Courses
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Creamy white editorial footer */}
      <div className="bg-secondary/60 border-t border-hairline text-foreground">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-16 sm:py-20">
          {/* Top — wordmark + newsletter */}
          <div className="flex flex-col gap-8 pb-12 border-b border-hairline md:flex-row md:items-start md:justify-between">
            <div>
              <div className="mb-3">
                <AsciLogo size={36} showText showBadge badgeText="ACADEMY" />
              </div>
              <p className="mt-2 max-w-xs text-sm text-body leading-relaxed">
                A comprehensive learning platform for mastering software engineering, from fundamentals to production-grade systems.
              </p>
            </div>

            {/* Newsletter */}
            <div className="max-w-sm w-full">
              <p className="text-caption-uppercase text-muted-foreground mb-3">Stay Updated</p>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="flex-1 rounded-lg bg-card border border-hairline px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-2 rounded-lg bg-card border border-primary/30 px-4 py-3 text-sm text-primary">
                  <span>✓</span> Thanks! We&apos;ll keep you posted.
                </div>
              )}
            </div>
          </div>

          {/* 4-column link grid */}
          <div className="grid grid-cols-2 gap-8 pt-12 sm:grid-cols-4">
            {footerColumns.map((col) => (
              <div key={col.heading}>
                <h3 className="text-caption-uppercase text-foreground font-semibold mb-4">{col.heading}</h3>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={(link as any).external ? "_blank" : undefined}
                        rel={(link as any).external ? "noopener noreferrer" : undefined}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-16 flex flex-col items-center gap-4 border-t border-hairline pt-8 sm:flex-row sm:justify-between">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} ASCI. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

    </footer>
  )
}
