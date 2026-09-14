"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Award,
  Lock,
  Check,
  X,
  ExternalLink,
  ShieldCheck,
  Flame,
  Zap,
} from "lucide-react"
import {
  BADGES_REGISTRY,
  Badge,
  BadgeCategory,
  BADGE_TIER_STYLES,
} from "@/lib/gamification"
import { OfficialBadgeEmblem } from "@/components/gamification/official-badge-emblem"

interface BadgesShowcaseProps {
  unlockedBadgeIds: string[]
  className?: string
  compact?: boolean
}

export function BadgesShowcase({
  unlockedBadgeIds = [],
  className = "",
  compact = false,
}: BadgesShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<BadgeCategory | "all">("all")
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null)

  const unlockedSet = new Set(unlockedBadgeIds)
  const totalUnlocked = BADGES_REGISTRY.filter((b) => unlockedSet.has(b.id)).length

  const categories: { id: BadgeCategory | "all"; label: string }[] = [
    { id: "all", label: `All Honors (${BADGES_REGISTRY.length})` },
    { id: "curriculum", label: "Curriculum" },
    { id: "mastery", label: "Code Mastery" },
    { id: "streak", label: "Streaks & Momentum" },
    { id: "quests", label: "Quests" },
  ]

  const filteredBadges = BADGES_REGISTRY.filter((badge) => {
    if (selectedCategory === "all") return true
    return badge.category === selectedCategory
  })

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header bar with summary & category pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-hairline">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4B872] bg-[#D4B872]/10 px-2.5 py-0.5 rounded-full border border-[#D4B872]/30 font-semibold flex items-center gap-1">
              <Award className="w-3 h-3" /> Official Tech Achievements
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              {totalUnlocked} of {BADGES_REGISTRY.length} Claimed
            </span>
          </div>
          <h3 className="font-serif text-2xl font-normal text-foreground tracking-tight">
            Accredited Achievement Badges
          </h3>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-secondary border border-hairline">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-card text-foreground shadow-2xs font-semibold border border-hairline"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid of Authentic Achievement Badges */}
      <div
        className={`grid gap-4 ${
          compact
            ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4"
            : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4"
        }`}
      >
        {filteredBadges.map((badge, idx) => {
          const isUnlocked = unlockedSet.has(badge.id)
          const tierMeta = BADGE_TIER_STYLES[badge.tier]

          return (
            <motion.div
              key={badge.id}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedBadge(badge)}
              className={`group relative rounded-2xl border p-4 sm:p-5 flex flex-col items-center text-center justify-between cursor-pointer transition-all overflow-hidden ${
                isUnlocked
                  ? "bg-card/90 dark:bg-[#0c0d12]/90 border-border/80 dark:border-white/10 hover:border-[#D4B872]/50 shadow-sm hover:shadow-md"
                  : "bg-secondary/30 border-hairline/60 opacity-60 hover:opacity-85"
              }`}
            >
              {/* Top Status & Tier Marker */}
              <div className="w-full flex items-center justify-between text-[10px] font-mono mb-2 z-10">
                <span
                  className={`px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold border ${
                    isUnlocked ? tierMeta.badge : "bg-zinc-800 text-zinc-500 border-zinc-700/50"
                  }`}
                >
                  {tierMeta.label}
                </span>

                <span className="text-muted-foreground font-semibold flex items-center gap-1">
                  {isUnlocked ? (
                    <span className="text-emerald-500 flex items-center gap-0.5">
                      <Check className="w-3 h-3 stroke-[3]" /> Unlocked
                    </span>
                  ) : (
                    <span className="flex items-center gap-0.5">
                      <Lock className="w-2.5 h-2.5" /> Locked
                    </span>
                  )}
                </span>
              </div>

              {/* 3D Official Badge Emblem (The Hero Element) */}
              <div className="my-2 py-1 flex items-center justify-center relative z-10 group-hover:scale-105 transition-transform duration-300">
                <OfficialBadgeEmblem
                  badgeId={badge.id}
                  title={badge.title}
                  category={badge.category}
                  tier={badge.tier}
                  isUnlocked={isUnlocked}
                  size={compact ? "sm" : "md"}
                />
              </div>

              {/* Badge Identification & Details */}
              <div className="w-full mt-2 space-y-1 z-10">
                <h4 className="font-serif text-sm sm:text-base font-medium text-foreground tracking-tight line-clamp-1 group-hover:text-[#D4B872] transition-colors">
                  {badge.title}
                </h4>
                <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed h-8">
                  {badge.description}
                </p>
              </div>

              {/* XP Bounty Footer Pill */}
              <div className="w-full mt-3 pt-2.5 border-t border-hairline/60 flex items-center justify-between text-[11px] font-mono z-10">
                <span className="text-muted-foreground/70 uppercase tracking-wider text-[10px]">
                  Bounty
                </span>
                <span className="text-[#ea580c] dark:text-[#f97316] font-bold bg-[#ea580c]/10 px-2 py-0.5 rounded border border-[#ea580c]/20">
                  +{badge.xpReward} XP
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Official Badge Inspection Modal Dialog */}
      <AnimatePresence>
        {selectedBadge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              className="relative w-full max-w-lg rounded-3xl border border-border/80 dark:border-white/15 bg-card dark:bg-[#0c0d12] p-6 sm:p-8 shadow-2xl overflow-hidden"
            >
              {/* Modal Close Button */}
              <button
                type="button"
                onClick={() => setSelectedBadge(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Stamped Credential Header */}
              <div className="flex items-center gap-2 mb-6 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4B872]" />
                <span>ASCI Official Achievement · #{selectedBadge.id.toUpperCase()}</span>
              </div>

              {/* Large 3D Badge Showcase Hero */}
              <div className="flex flex-col items-center justify-center my-4 py-3 relative z-10">
                <OfficialBadgeEmblem
                  badgeId={selectedBadge.id}
                  title={selectedBadge.title}
                  category={selectedBadge.category}
                  tier={selectedBadge.tier}
                  isUnlocked={unlockedSet.has(selectedBadge.id)}
                  size="xl"
                />

                <div className="mt-5 flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${
                      unlockedSet.has(selectedBadge.id)
                        ? BADGE_TIER_STYLES[selectedBadge.tier].badge
                        : "bg-zinc-800 text-zinc-500 border-zinc-700"
                    }`}
                  >
                    {BADGE_TIER_STYLES[selectedBadge.tier].label} Tier
                  </span>

                  <span className="badge-coral text-xs font-mono px-3 py-1">
                    +{selectedBadge.xpReward} XP Bounty
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="text-center space-y-2 relative z-10">
                <h3 className="font-serif text-2xl font-normal text-foreground">
                  {selectedBadge.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  {selectedBadge.description}
                </p>
              </div>

              {/* Verification & Criteria Box */}
              <div className="mt-6 p-4 rounded-2xl bg-secondary/80 border border-hairline space-y-2 relative z-10 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground uppercase text-[10px] tracking-wider">
                    Requirement
                  </span>
                  <span
                    className={`font-semibold ${
                      unlockedSet.has(selectedBadge.id)
                        ? "text-emerald-500"
                        : "text-amber-500"
                    }`}
                  >
                    {unlockedSet.has(selectedBadge.id) ? "✓ Achieved" : "Pending Requirement"}
                  </span>
                </div>
                <div className="font-sans text-xs text-foreground font-medium">
                  {selectedBadge.criteriaDescription}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between gap-3 relative z-10">
                <span className="text-[11px] font-mono text-muted-foreground">
                  Category: <span className="capitalize text-foreground font-medium">{selectedBadge.category}</span>
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedBadge(null)}
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-medium cursor-pointer transition-colors shadow-2xs"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
