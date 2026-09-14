"use client"

import React, { useState, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bookmark,
  X,
  Trash2,
  PlayCircle,
  ArrowRight,
  BookOpen,
  Search,
  Clock,
  ExternalLink,
  Layers,
  GraduationCap,
  Compass,
} from "lucide-react"
import { useWishlist, WishlistItem } from "@/lib/user-learning-store"

interface WishlistDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function WishlistDrawer({ isOpen, onClose }: WishlistDrawerProps) {
  const { wishlist, remove, clear, count } = useWishlist()
  const [searchQuery, setSearchQuery] = useState("")
  const [mounted, setMounted] = useState(false)
  const [confirmClear, setConfirmClear] = useState(false)

  // Portal mount check
  useEffect(() => {
    setMounted(true)
  }, [])

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (!isOpen) {
      setConfirmClear(false)
      return
    }
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen])

  // ESC key handler
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  const filtered = wishlist.filter((item) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return (
      item.title.toLowerCase().includes(q) ||
      (item.category && item.category.toLowerCase().includes(q)) ||
      (item.level && item.level.toLowerCase().includes(q))
    )
  })

  if (!mounted) return null

  const drawerContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] overflow-hidden">
          {/* 1. Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            aria-hidden="true"
          />

          {/* 2. Slide-over Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10 pointer-events-none">
            <motion.aside
              initial={{ x: "100%", opacity: 0.8 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 320 }}
              role="dialog"
              aria-label="My Saved Courses Wishlist"
              aria-modal="true"
              className="pointer-events-auto relative w-screen max-w-lg h-full max-h-screen bg-card border-l border-border shadow-2xl flex flex-col justify-between overflow-hidden text-foreground"
            >
              {/* ══════════════════════════════════════════════
                  DRAWER HEADER
              ══════════════════════════════════════════════ */}
              <header className="relative z-20 px-6 py-5 border-b border-border bg-card/98 shrink-0">
                <div className="flex items-center justify-between gap-4">
                  {/* Brand & Bookmark Emblem */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary border border-border">
                      <Bookmark className="h-5 w-5 fill-primary/20" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-foreground leading-none">
                          My Saved Courses
                        </h2>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-secondary text-foreground border border-border">
                          {count}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Curated study queue & bookmarked modules
                      </p>
                    </div>
                  </div>

                  {/* Close Drawer Button */}
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-2 rounded-xl text-muted-foreground hover:text-foreground bg-secondary hover:bg-secondary/80 border border-border transition-colors cursor-pointer"
                    title="Close Drawer (Esc)"
                    aria-label="Close Saved Courses Drawer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Sub-header Status Chips */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-foreground bg-secondary border border-border">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    <span>{count} {count === 1 ? "Course" : "Courses"} Bookmarked</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-secondary text-muted-foreground border border-border">
                    <BookOpen className="h-3 w-3 text-primary" />
                    <span>Ready to Study</span>
                  </span>
                </div>

                {/* Search Filter (Visible when items exist) */}
                {count > 2 && (
                  <div className="relative mt-3.5">
                    <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Filter saved courses by title or topic..."
                      className="w-full bg-background border border-border rounded-xl pl-9 pr-9 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors shadow-2xs"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer p-0.5"
                        title="Clear filter"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </header>

              {/* ══════════════════════════════════════════════
                  DRAWER BODY: COURSES OR CLEAN EMPTY STATE
              ══════════════════════════════════════════════ */}
              <div className="relative z-10 flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-4">
                {wishlist.length === 0 ? (
                  /* ── CLEAN EMPTY STATE ── */
                  <div className="min-h-full flex flex-col items-center justify-center py-2">
                    <div className="w-full my-auto rounded-2xl border border-border bg-background p-6 sm:p-7 text-center shadow-xs">
                      {/* Center Emblem */}
                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary border border-border text-primary">
                        <Bookmark className="h-6 w-6 fill-primary/20 stroke-[1.75]" />
                      </div>

                      {/* Empty State Title */}
                      <h3 className="font-serif text-xl sm:text-2xl font-semibold text-foreground tracking-tight mb-1.5">
                        Your Wishlist is Empty
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto mb-4">
                        Save courses you want to master by clicking the bookmark icon on any curriculum card.
                      </p>

                      {/* Instruction Callout Box */}
                      <div className="mb-5 px-3.5 py-2.5 rounded-xl bg-secondary border border-border text-xs text-muted-foreground text-left flex items-start gap-2.5">
                        <Bookmark className="h-4 w-4 text-primary shrink-0 mt-0.5 fill-primary/20" />
                        <span className="leading-snug text-[11.5px]">
                          Browse curriculum tracks and click the <strong className="text-foreground font-semibold">Bookmark</strong> icon to organize your learning path.
                        </span>
                      </div>

                      {/* Primary CTA Button */}
                      <Link
                        href="/programs"
                        onClick={onClose}
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-semibold tracking-wider uppercase transition-colors shadow-xs cursor-pointer"
                      >
                        <BookOpen className="h-4 w-4" />
                        <span>Explore Curriculum</span>
                        <ArrowRight className="h-3.5 w-3.5 ml-0.5" />
                      </Link>

                      {/* Quick Tracks Discovery Pills */}
                      <div className="mt-5 pt-4 border-t border-border">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
                          Featured Curriculum Paths
                        </p>
                        <div className="flex flex-wrap gap-1.5 justify-center">
                          {[
                            { name: "Full Stack Web", href: "/programs" },
                            { name: "DSA Mastery", href: "/dsa" },
                            { name: "AI & Agents", href: "/programs" },
                            { name: "Degree Programs", href: "/degrees" },
                          ].map((track) => (
                            <Link
                              key={track.name}
                              href={track.href}
                              onClick={onClose}
                              className="px-2.5 py-1 rounded-lg text-[11px] bg-secondary hover:bg-secondary/80 text-foreground/80 hover:text-foreground border border-border transition-colors"
                            >
                              {track.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : filtered.length === 0 ? (
                  /* ── NO SEARCH MATCHES ── */
                  <div className="text-center py-16 px-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-muted-foreground mb-3 border border-border">
                      <Search className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      No matching courses found
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
                      No bookmarks matching &ldquo;{searchQuery}&rdquo;. Try another keyword.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="mt-4 px-3.5 py-1.5 rounded-lg text-xs font-medium text-primary hover:text-primary-active transition-colors cursor-pointer"
                    >
                      Clear search filter
                    </button>
                  </div>
                ) : (
                  /* ── POPULATED COURSE CARDS ── */
                  filtered.map((item) => {
                    const playerLink = item.playerUrl || `/programs/${item.courseSlug}/course`

                    return (
                      <div
                        key={item.id || item.courseSlug}
                        className="group relative p-4 sm:p-5 rounded-2xl border border-border bg-background hover:bg-secondary/40 transition-colors flex flex-col justify-between gap-3.5"
                      >
                        {/* Top Badges & Delete */}
                        <div className="flex items-center justify-between text-[11px] font-mono gap-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {item.category && (
                              <span className="px-2.5 py-0.5 rounded-md bg-secondary text-foreground border border-border font-medium">
                                {item.category}
                              </span>
                            )}
                            {item.level && (
                              <span className="px-2.5 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border">
                                {item.level}
                              </span>
                            )}
                            {item.duration && (
                              <span className="inline-flex items-center gap-1 text-[10.5px] text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {item.duration}
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => remove(item.courseSlug)}
                            className="p-1.5 rounded-lg text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 border border-transparent hover:border-destructive/20 transition-all cursor-pointer"
                            title="Remove from saved courses"
                            aria-label={`Remove ${item.title} from wishlist`}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Title & Description */}
                        <div>
                          <h4 className="font-serif text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                            {item.title}
                          </h4>
                          {item.desc && (
                            <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                              {item.desc}
                            </p>
                          )}
                        </div>

                        {/* Actions Footer */}
                        <div className="pt-3 flex items-center justify-between border-t border-border">
                          <span className="text-[10px] text-muted-foreground font-mono">
                            Added {new Date(item.addedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                          </span>

                          <Link
                            href={playerLink}
                            onClick={onClose}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                          >
                            <PlayCircle className="h-3.5 w-3.5" />
                            <span>Start Course</span>
                          </Link>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>

              {/* ══════════════════════════════════════════════
                  DRAWER FOOTER
              ══════════════════════════════════════════════ */}
              <footer className="relative z-20 p-4 sm:p-5 border-t border-border bg-card/98 shrink-0">
                {wishlist.length > 0 ? (
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href="/programs"
                        onClick={onClose}
                        className="text-xs text-muted-foreground hover:text-foreground font-medium transition-colors cursor-pointer"
                      >
                        + Browse Courses
                      </Link>

                      {/* Clear All action with confirm */}
                      <span className="text-muted-foreground/40">•</span>
                      {confirmClear ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              clear()
                              setConfirmClear(false)
                            }}
                            className="text-[11px] text-destructive hover:underline font-semibold cursor-pointer"
                          >
                            Yes, Clear All
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmClear(false)}
                            className="text-[11px] text-muted-foreground hover:text-foreground cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmClear(true)}
                          className="text-[11px] text-muted-foreground/70 hover:text-destructive transition-colors cursor-pointer"
                        >
                          Clear All
                        </button>
                      )}
                    </div>

                    <Link
                      href="/dashboard"
                      onClick={onClose}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-secondary hover:bg-secondary/80 border border-border text-xs font-semibold text-foreground hover:text-primary transition-colors cursor-pointer"
                    >
                      <span>Dashboard</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>ASCI Academic Learning System</span>
                    <Link
                      href="/programs"
                      onClick={onClose}
                      className="text-primary hover:text-primary-active font-semibold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>All Programs</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                )}
              </footer>
            </motion.aside>
          </div>
        </div>
      )}
    </AnimatePresence>
  )

  return createPortal(drawerContent, document.body)
}
