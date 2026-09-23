"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, Code2, Briefcase, User } from "lucide-react"

interface NavTab {
  label: string
  href: string
  icon: typeof Home
  matchPrefixes: string[]
}

const TABS: NavTab[] = [
  {
    label: "Home",
    href: "/",
    icon: Home,
    matchPrefixes: ["/"],
  },
  {
    label: "Learn",
    href: "/courses",
    icon: BookOpen,
    matchPrefixes: ["/courses", "/programs"],
  },
  {
    label: "Practice",
    href: "/dsa",
    icon: Code2,
    matchPrefixes: ["/dsa", "/sandbox"],
  },
  {
    label: "Career",
    href: "/career",
    icon: Briefcase,
    matchPrefixes: ["/career", "/jobs", "/hackathons", "/degrees"],
  },
  {
    label: "Profile",
    href: "/dashboard",
    icon: User,
    matchPrefixes: ["/dashboard", "/profile"],
  },
]

export function MobileBottomNav() {
  const pathname = usePathname()

  // Hide on full-screen editor / code runner environments
  const isExcluded =
    pathname?.includes("/learn/") ||
    pathname?.includes("/dsa/problems/")

  if (isExcluded) return null

  const isActive = (tab: NavTab) => {
    if (tab.href === "/") {
      return pathname === "/"
    }
    return tab.matchPrefixes.some((prefix) => pathname.startsWith(prefix))
  }

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border/80 px-2 py-1.5 shadow-lg select-none pb-[calc(0.375rem+env(safe-area-inset-bottom,0px))]"
    >
      <div className="grid grid-cols-5 items-center justify-items-center max-w-md mx-auto">
        {TABS.map((tab) => {
          const active = isActive(tab)
          const Icon = tab.icon

          return (
            <Link
              key={tab.label}
              href={tab.href}
              className={`flex flex-col items-center justify-center gap-0.5 py-1 px-2 rounded-xl transition-all cursor-pointer relative ${
                active
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${active ? "stroke-[2.25]" : "stroke-[1.75]"}`} />
                {active && (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </div>
              <span className="text-[10px] tracking-tight">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
