"use client"

import Link from "next/link"
import { Github, Twitter, Linkedin, MessageSquare } from "lucide-react"
import { AsciLogo } from "@/components/asci-logo"

const footerSections = [
  {
    title: "Learn",
    links: [
      { label: "Courses", href: "/courses" },
      { label: "Learning Paths", href: "/paths" },
    ],
  },
  {
    title: "Practice",
    links: [
      { label: "DSA", href: "/practice" },
      { label: "Challenges", href: "/practice" },
    ],
  },
  {
    title: "Build",
    links: [
      { label: "Projects", href: "/projects" },
      { label: "Simulators", href: "/practice" },
    ],
  },
  {
    title: "Career",
    links: [
      { label: "Jobs", href: "/jobs" },
      { label: "Internships", href: "/internships" },
      { label: "Competitions", href: "/competitions" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
]

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: MessageSquare, label: "Discord", href: "https://discord.com" },
]

export function Footer({ showCTA = false }: { showCTA?: boolean }) {
  return (
    <footer className="border-t border-border/60 bg-card text-foreground">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 pb-10 border-b border-border/60">
          {/* Brand info */}
          <div className="col-span-2 space-y-3">
            <Link href="/" className="inline-block">
              <AsciLogo size={32} showText showBadge={false} />
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              The developer learning, practice, and career platform.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-secondary border border-border/80 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {footerSections.map((sec) => (
            <div key={sec.title} className="space-y-3">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground">
                {sec.title}
              </h4>
              <ul className="space-y-2">
                {sec.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground font-mono">
          <p>© {new Date().getFullYear()} ASCI Academy. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            <span>•</span>
            <Link href="/verify" className="hover:text-foreground transition-colors">Verify Certificate</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
