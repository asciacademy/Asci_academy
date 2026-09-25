"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Bookmark, ArrowRight, Trash2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BrandIcon } from "@/components/ui/brand-icon"
import { useWishlist, type WishlistItem } from "@/lib/user-learning-store"

type SavedFilter = "all" | "courses" | "projects" | "competitions" | "jobs"

interface SavedEntry {
  id: string
  title: string
  type: string
  category: string
  slug: string
  brand: string
  href: string
  metadata: string
}

export default function SavedItemsPage() {
  const [activeFilter, setActiveFilter] = useState<SavedFilter>("all")
  const { wishlist, remove } = useWishlist()

  // Sample items to ensure users always see how clean saved rows look
  const initialSavedItems: SavedEntry[] = wishlist.length > 0 ? wishlist.map((i: WishlistItem) => {
    const courseSlug = i.courseSlug || i.id
    return {
      id: i.id,
      title: i.title,
      type: "courses",
      category: i.category || "Course",
      slug: courseSlug,
      brand: courseSlug.includes("python") ? "python" : courseSlug.includes("react") ? "react" : "algorithm",
      href: `/courses/${courseSlug}`,
      metadata: "Beginner · 24 lessons · Certificate",
    }
  }) : [
    {
      id: "saved-1",
      title: "Python Programming",
      type: "courses",
      category: "Course",
      slug: "python",
      brand: "python",
      href: "/courses/python",
      metadata: "Beginner · 24 lessons · Certificate",
    },
    {
      id: "saved-2",
      title: "Distributed Key-Value Store with Raft",
      type: "projects",
      category: "Project",
      slug: "distributed-key-value-store",
      brand: "go",
      href: "/projects/distributed-key-value-store",
      metadata: "Advanced · Go, Docker, Raft · 20 hours",
    },
    {
      id: "saved-3",
      title: "Google National Algorithm Sprint",
      type: "competitions",
      category: "Competition",
      slug: "google-sprint-2026",
      brand: "google",
      href: "/competitions",
      metadata: "Google · Ends in 4 days · Prize ₹50,000",
    },
    {
      id: "saved-4",
      title: "Software Engineer Intern",
      type: "jobs",
      category: "Job",
      slug: "se-intern-google",
      brand: "google",
      href: "/career",
      metadata: "Google · Bangalore / Remote · ₹45,000/mo",
    },
  ]

  const [savedList, setSavedList] = useState<SavedEntry[]>(initialSavedItems)

  const handleRemove = (id: string) => {
    setSavedList((prev: SavedEntry[]) => prev.filter((item: SavedEntry) => item.id !== id))
    remove(id)
  }

  const filteredItems = savedList.filter((item: SavedEntry) => {
    if (activeFilter === "all") return true
    return item.type === activeFilter || item.category.toLowerCase().includes(activeFilter)
  })

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 max-w-[1000px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-serif font-normal text-foreground tracking-tight">
            Saved Items
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            All your bookmarked courses, guided projects, competitions, and career opportunities in one place.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-secondary border border-border/80 w-fit text-xs font-semibold overflow-x-auto">
          {(["all", "courses", "projects", "competitions", "jobs"] as SavedFilter[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3.5 py-1.5 rounded-lg capitalize transition-all cursor-pointer ${
                activeFilter === filter
                  ? "bg-card text-foreground shadow-2xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Items List */}
        <div className="space-y-2.5">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-border rounded-xl p-6">
              <Bookmark className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <h3 className="font-semibold text-sm text-foreground">No saved items found</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Save courses, projects, and hackathons with the bookmark button to view them here.
              </p>
              <Link
                href="/courses"
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            filteredItems.map((item: SavedEntry) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-all"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-secondary border border-border/80 flex items-center justify-center shrink-0">
                    <BrandIcon name={item.brand} size={24} />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-bold">
                        {item.category}
                      </span>
                    </div>
                    <Link
                      href={item.href}
                      className="font-semibold text-sm sm:text-base text-foreground hover:text-primary transition-colors block truncate"
                    >
                      {item.title}
                    </Link>
                    <p className="text-xs text-muted-foreground truncate">
                      {item.metadata}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                  <Link
                    href={item.href}
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary-active text-xs font-semibold transition-all shadow-2xs"
                  >
                    Open
                  </Link>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="p-2 rounded-lg border border-border text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-colors cursor-pointer"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
