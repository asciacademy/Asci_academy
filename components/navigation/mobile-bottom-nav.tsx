"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Compass, BookOpen, Code2, User } from "lucide-react"

/**
 * Mobile Bottom Navigation (Phase 19)
 * 
 * Re-designed specifically for mobile ergonomics:
 * - Home
 * - Explore (large category shortcuts & discovery rails)
 * - Learn
 * - Practice
 * - Profile
 * 
 * - Generous 48px+ touch targets (no tiny buttons)
 * - Hides automatically on detail pages where sticky bottom CTAs take priority
 * - Supports safe area insets for modern mobile displays
 */
export function MobileBottomNav() {
  const pathname = usePathname()

  // Hide on detail pages so sticky bottom CTAs or full-screen IDEs have 100% priority
  const isDetailPageOrIde =
    (pathname?.startsWith("/competitions/") && pathname.split("/").length > 2) ||
    (pathname?.startsWith("/projects/") && pathname.split("/").length > 2) ||
    (pathname?.startsWith("/career/") && pathname.split("/").length > 2) ||
    (pathname?.startsWith("/courses/") && pathname.split("/").length > 2) ||
    (pathname?.startsWith("/dsa/") && pathname.split("/").length > 2)

  if (isDetailPageOrIde) {
    return null
  }

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
      active: pathname === "/",
    },
    {
      label: "Explore",
      href: "/explore",
      icon: Compass,
      active: pathname.startsWith("/explore") || pathname.startsWith("/search"),
    },
    {
      label: "Learn",
      href: "/courses",
      icon: BookOpen,
      active: pathname === "/courses" || pathname.startsWith("/learning"),
    },
    {
      label: "Practice",
      href: "/practice",
      icon: Code2,
      active: pathname === "/practice" || pathname.startsWith("/challenges"),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: User,
      active: pathname.startsWith("/profile") || pathname.startsWith("/u/"),
    },
  ]

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 border-t border-border backdrop-blur-xl px-2 py-1 pb-[calc(env(safe-area-inset-bottom)+0.25rem)] shadow-lg select-none"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center min-h-[48px] py-1 rounded-xl text-[10px] font-medium transition-colors ${
                item.active
                  ? "text-primary font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon
                className={`h-5 w-5 mb-0.5 transition-transform ${
                  item.active ? "text-primary stroke-[2.3] scale-105" : "text-muted-foreground"
                }`}
              />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
