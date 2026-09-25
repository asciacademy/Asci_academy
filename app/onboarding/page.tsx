"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight, Check, Sparkles, Compass } from "lucide-react"
import { AsciLogo } from "@/components/asci-logo"
import { BrandIcon } from "@/components/ui/brand-icon"
import {
  ONBOARDING_GOALS,
  ONBOARDING_LEVELS,
  ONBOARDING_TOPICS,
  OnboardingGoal,
  OnboardingLevel,
  PERSONA_CONFIGS,
  mapGoalToPersona,
  saveOnboardingPreferences,
} from "@/lib/onboarding-persona"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [selectedTopic, setSelectedTopic] = useState<string>("dsa")
  const [selectedLevel, setSelectedLevel] = useState<OnboardingLevel>("Beginner")
  const [selectedGoal, setSelectedGoal] = useState<OnboardingGoal>("Learn")

  const previewPersona = mapGoalToPersona(selectedGoal, selectedLevel)
  const personaMeta = PERSONA_CONFIGS[previewPersona]

  const handleNext = () => {
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    } else {
      // Step 3 finished: Save preferences and navigate to personalized home
      saveOnboardingPreferences(selectedTopic, selectedLevel, selectedGoal)
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="max-w-2xl w-full mx-auto flex items-center justify-between">
        <Link href="/">
          <AsciLogo size={32} showText showBadge={false} />
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold text-primary">Question {step} of 3</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((s) => (
              <span
                key={s}
                className={`h-1.5 rounded-full transition-all ${
                  s === step ? "w-6 bg-primary" : s < step ? "w-3 bg-primary/40" : "w-2 bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Main Questionnaire Container */}
      <main className="max-w-xl w-full mx-auto py-8 sm:py-12 space-y-6">
        {/* ─────────────────────────────────────────────────────────────
            QUESTION 1: What do you want to learn?
        ───────────────────────────────────────────────────────────── */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary">
                Question 1
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight text-foreground">
                What do you want to learn?
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Select your primary technical domain to tailor your curriculum and starter tools.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ONBOARDING_TOPICS.map((t) => {
                const isSelected = selectedTopic === t.id
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTopic(t.id)}
                    className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? "border-primary bg-primary/10 shadow-2xs"
                        : "border-border bg-card hover:border-primary/40 hover:bg-secondary/30"
                    }`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center shrink-0 mt-0.5">
                      <BrandIcon name={t.brand} size={20} />
                    </div>
                    <div className="min-w-0">
                      <div className={`text-xs sm:text-sm font-semibold truncate ${isSelected ? "text-primary" : "text-foreground"}`}>
                        {t.label}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{t.desc}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            QUESTION 2: What is your current level?
        ───────────────────────────────────────────────────────────── */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary">
                Question 2
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight text-foreground">
                What is your current level?
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                This helps us recommend the optimal difficulty and calibrate your practice pace.
              </p>
            </div>

            <div className="space-y-3">
              {ONBOARDING_LEVELS.map((lvl) => {
                const isSelected = selectedLevel === lvl.id
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setSelectedLevel(lvl.id)}
                    className={`w-full p-4.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected
                        ? "border-primary bg-primary/10 shadow-2xs"
                        : "border-border bg-card hover:border-primary/40 hover:bg-secondary/30"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className={`text-sm font-semibold ${isSelected ? "text-primary" : "text-foreground"}`}>
                        {lvl.label}
                      </div>
                      <div className="text-xs text-muted-foreground">{lvl.desc}</div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-primary border-primary text-primary-foreground"
                          : "border-border text-transparent"
                      }`}
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            QUESTION 3: What is your goal? (Exact 7 Canonical Goals)
        ───────────────────────────────────────────────────────────── */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary">
                Question 3
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight text-foreground">
                What is your goal?
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Select your primary aspiration to configure your Personalized Home experience.
              </p>
            </div>

            <div className="space-y-2.5">
              {ONBOARDING_GOALS.map((g) => {
                const isSelected = selectedGoal === g.id
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setSelectedGoal(g.id)}
                    className={`w-full p-3.5 sm:p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected
                        ? "border-primary bg-primary/10 shadow-2xs"
                        : "border-border bg-card hover:border-primary/40 hover:bg-secondary/30"
                    }`}
                  >
                    <div className="space-y-0.5 min-w-0">
                      <div className={`text-xs sm:text-sm font-semibold truncate ${isSelected ? "text-primary" : "text-foreground"}`}>
                        {g.label}
                      </div>
                      <div className="text-[11px] text-muted-foreground">{g.desc}</div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-primary border-primary text-primary-foreground"
                          : "border-border text-transparent"
                      }`}
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Personalized Persona Preview Badge */}
            <div className="p-3.5 rounded-xl border border-primary/25 bg-secondary/30 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-primary shrink-0" />
                <span className="text-muted-foreground">Personalized Home focus:</span>
                <span className="font-bold text-foreground font-mono">{personaMeta.primaryFocus}</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/15 text-primary font-semibold">
                {personaMeta.name}
              </span>
            </div>
          </div>
        )}

        {/* Navigation & Action Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-border/60">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s - 1) as any)}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer px-2 py-1"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary-active text-xs sm:text-sm font-semibold transition-all shadow-2xs cursor-pointer"
          >
            <span>{step === 3 ? "Complete & Open Personalized Home" : "Continue"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-2xl w-full mx-auto text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ASCI Academy · Minimalist Developer Education
      </footer>
    </div>
  )
}
