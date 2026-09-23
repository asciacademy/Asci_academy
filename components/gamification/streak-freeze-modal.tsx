"use client"

import React, { useState, useEffect } from "react"
import { ShieldCheck, Flame, X, Sparkles, Check, Zap, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface StreakFreezeModalProps {
  isOpen: boolean
  onClose: () => void
  currentStreak: number
  totalXP: number
  onShieldPurchased?: (cost: number) => void
}

const SHIELD_COST_XP = 200

export function StreakFreezeModal({
  isOpen,
  onClose,
  currentStreak,
  totalXP,
  onShieldPurchased,
}: StreakFreezeModalProps) {
  const [hasShield, setHasShield] = useState(false)

  useEffect(() => {
    try {
      const active = localStorage.getItem("asci_streak_shield_active")
      if (active === "true") {
        setHasShield(true)
      }
    } catch {
      // ignore
    }
  }, [])

  if (!isOpen) return null

  const handleEquipShield = () => {
    if (totalXP < SHIELD_COST_XP && !hasShield) {
      toast.error(`Insufficient XP: You need ${SHIELD_COST_XP} XP to equip a Streak Shield. Solve more challenges!`)
      return
    }

    try {
      localStorage.setItem("asci_streak_shield_active", "true")
      setHasShield(true)
      if (onShieldPurchased) {
        onShieldPurchased(SHIELD_COST_XP)
      }
      toast.success("Streak Shield Activated! Your daily streak is protected for your next missed day.")
    } catch {
      toast.error("Failed to update streak shield status")
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl border border-primary/30 bg-[#0d0d12] p-6 shadow-2xl flex flex-col space-y-5 overflow-hidden font-sans">
        {/* Ambient Top Glow */}
        <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 h-32 w-48 rounded-full bg-gradient-to-r from-amber-500/20 to-emerald-500/20 blur-2xl" />

        {/* Modal Header */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Flame className="h-5 w-5 fill-amber-400 text-amber-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Streak Protection Economy</h3>
              <p className="text-xs text-muted-foreground">Keep your hard-earned velocity unbroken</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Current Streak & Status Badge */}
        <div className="rounded-2xl border border-border/80 bg-secondary/30 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-foreground font-mono flex items-center gap-1">
              {currentStreak}
              <Flame className="h-5 w-5 text-amber-500 fill-amber-500" />
            </span>
            <div>
              <div className="text-xs font-bold text-foreground">Current Streak</div>
              <div className="text-[10px] text-muted-foreground">
                {currentStreak > 0 ? "Daily consistency active" : "Start your streak today!"}
              </div>
            </div>
          </div>

          <div
            className={cn(
              "px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border",
              hasShield
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                : "bg-amber-500/10 text-amber-400 border-amber-500/30"
            )}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{hasShield ? "Protected" : "Unshielded"}</span>
          </div>
        </div>

        {/* Shield Perk Card */}
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-primary">
            <Sparkles className="h-4 w-4" />
            <span>What is a Streak Shield?</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Life happens! If you are busy and miss a day, an active Streak Shield automatically burns itself to preserve your streak count, preventing your velocity from resetting to 0.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {hasShield ? (
            <div className="w-full py-3 px-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2">
              <Check className="h-4 w-4 text-emerald-400" />
              <span>Shield Active — You are covered for 1 missed day!</span>
            </div>
          ) : (
            <button
              onClick={handleEquipShield}
              disabled={totalXP < SHIELD_COST_XP}
              className="w-full py-3 px-4 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none text-primary-foreground text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Equip Streak Shield ({SHIELD_COST_XP} XP)</span>
            </button>
          )}

          <div className="text-center pt-2 text-[11px] text-muted-foreground font-mono">
            Your XP Balance: <strong className="text-foreground">{totalXP} XP</strong>
          </div>
        </div>
      </div>
    </div>
  )
}
