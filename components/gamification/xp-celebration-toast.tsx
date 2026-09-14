"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, Award, X } from "lucide-react"

export interface XpCelebrationData {
  amount: number
  reason: string
  badgeTitle?: string
}

export function XpCelebrationToast() {
  const [toastData, setToastData] = useState<XpCelebrationData | null>(null)

  useEffect(() => {
    const handleEvent = (event: any) => {
      if (event.detail && typeof event.detail.amount === "number") {
        setToastData({
          amount: event.detail.amount,
          reason: event.detail.reason || "Progress Milestone Achieved",
          badgeTitle: event.detail.badgeTitle,
        })
      }
    }

    window.addEventListener("asci-award-xp", handleEvent)
    return () => window.removeEventListener("asci-award-xp", handleEvent)
  }, [])

  useEffect(() => {
    if (!toastData) return
    const timer = setTimeout(() => {
      setToastData(null)
    }, 4000)
    return () => clearTimeout(timer)
  }, [toastData])

  return (
    <AnimatePresence>
      {toastData && (
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-18 right-6 z-50 pointer-events-auto"
        >
          <div className="relative overflow-hidden rounded-2xl border border-[#D4B872]/40 bg-[#0e0e11]/98 dark:bg-[#070709]/98 p-4 text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl max-w-sm flex items-center gap-3.5">
            {/* Icon Medallion */}
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4B872]/15 text-[#D4B872] border border-[#D4B872]/30 shadow-inner">
              {toastData.badgeTitle ? (
                <Trophy className="h-5 w-5 text-[#D4B872]" />
              ) : (
                <Award className="h-5 w-5 text-[#ea580c]" />
              )}
            </div>

            {/* Message Body */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-xs font-bold text-[#D4B872]">
                  +{toastData.amount} XP AWARDED
                </span>
              </div>
              <p className="text-xs font-serif text-white/90 truncate mt-0.5">
                {toastData.badgeTitle
                  ? `Badge Unlocked: ${toastData.badgeTitle}`
                  : toastData.reason}
              </p>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setToastData(null)}
              className="p-1 text-white/50 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
