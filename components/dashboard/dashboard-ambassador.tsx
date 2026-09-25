"use client"

import React, { useState } from "react"
import {
  Users, Copy, Check, Share2, Award, Gift,
  ExternalLink, Trophy, ShieldCheck, ChevronRight, ArrowRight,
  School, Flame, Globe
} from "lucide-react"
import { useUnstopEcosystem } from "@/lib/unstop-store"
import { AxelStage } from "@/components/axel/axel-stage"

export function DashboardAmbassador() {
  const { ambassador, claimAmbassadorPerk } = useUnstopEcosystem()
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(ambassador.referralUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const campusLeaderboard = [
    { rank: 1, college: "IIT Bombay", chapterLead: "Rohan Kulkarni", points: 4850, members: 42 },
    { rank: 2, college: "BITS Pilani", chapterLead: "Sneha Iyer", points: 3920, members: 31 },
    { rank: 3, college: "IIT Delhi", chapterLead: "You (Arjun Sharma)", points: ambassador.pointsEarned, members: ambassador.joinedPeers, isCurrent: true },
    { rank: 4, college: "NIT Trichy", chapterLead: "Vikramaditya P.", points: 2600, members: 24 },
    { rank: 5, college: "IIIT Hyderabad", chapterLead: "Aditya V.", points: 2150, members: 19 },
  ]

  const tierProgression = [
    {
      level: 1,
      title: "Campus Partner",
      minPeers: 0,
      reward: "Verified Campus Ambassador Profile Badge + Certificate",
      status: "unlocked",
    },
    {
      level: 2,
      title: "Lead Igniter",
      minPeers: 10,
      reward: "ASCI Swag Kit + Priority Grand Prix Hackathon Slot",
      status: ambassador.joinedPeers >= 10 ? "unlocked" : "in_progress",
    },
    {
      level: 3,
      title: "Chapter President",
      minPeers: 25,
      reward: "1-on-1 Mentorship & Mock Interview with Google/Razorpay Lead",
      status: ambassador.joinedPeers >= 25 ? "unlocked" : "locked",
    },
    {
      level: 4,
      title: "Diamond Fellow",
      minPeers: 50,
      reward: "Direct Fast-track Hiring Shortlist with Zerodha & Tech Partners",
      status: ambassador.joinedPeers >= 50 ? "unlocked" : "locked",
    },
  ]

  return (
    <div className="space-y-8 animate-fadeIn" id="dashboard-ambassador-section">
      {/* Header Banner */}
      <div
        className="rounded-2xl border border-hairline bg-card p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden"
        id="dashboard-ambassador-header"
      >
        <div className="space-y-2.5 max-w-2xl min-w-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 shrink-0 leading-none font-semibold">
              Unstop Igniters Network
            </span>
            <span className="text-xs font-mono text-muted-foreground shrink-0 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-700 hidden sm:inline-block" />
              <span>{ambassador.campusName}</span>
            </span>
          </div>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold text-foreground flex items-start sm:items-center gap-2.5 leading-tight">
            <Users className="w-6 h-6 text-primary shrink-0 mt-0.5 sm:mt-0" />
            <span className="break-words">Campus Ambassador Program</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
            Lead your campus club, invite friends to coding contests, and unlock tech rewards and certificates.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0 self-start sm:self-auto">
          <AxelStage
            id="dashboard-ambassador-robot-anchor"
            sectionId="dashboard-ambassador-header"
            label="Campus Partner"
            emotion="excited"
            scale={0.44}
            size="sm"
          />
        </div>
      </div>

      {/* Referral Link & Quick Sharing Ribbon */}
      <div className="rounded-xl border border-hairline bg-card p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="text-xs font-semibold text-foreground flex items-center gap-2">
            <span>Your Exclusive Chapter Invitation URL</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-primary/10 text-primary border border-primary/20">
              {ambassador.referralCode}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Peers signing up through your link earn 200 welcome XP and auto-join your campus chapter roster.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-secondary border border-hairline rounded-lg px-3 py-1.5 font-mono text-xs text-foreground max-w-xs truncate">
            {ambassador.referralUrl}
          </div>
          <button
            onClick={handleCopyLink}
            className="btn-primary text-xs px-3.5 py-1.5 cursor-pointer inline-flex items-center gap-1.5 shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied!" : "Copy Link"}</span>
          </button>
        </div>
      </div>

      {/* 4 Ambassador Performance Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Link Clicks",
            value: ambassador.totalClicks.toString(),
            unit: "Visits",
            sub: "Tracked across peer shares",
            icon: Globe,
            color: "text-primary",
          },
          {
            label: "Enrolled Peers",
            value: ambassador.joinedPeers.toString(),
            unit: "Students",
            sub: `${50 - ambassador.joinedPeers} to Diamond Fellow`,
            icon: Users,
            color: "text-[#D4B872]",
          },
          {
            label: "Ambassador XP",
            value: ambassador.pointsEarned.toLocaleString(),
            unit: "Points",
            sub: "100 XP per active peer",
            icon: Flame,
            color: "text-primary",
          },
          {
            label: "National Rank",
            value: `#${ambassador.campusRank}`,
            unit: "In India",
            sub: "Top 2% among 120+ colleges",
            icon: Trophy,
            color: "text-primary",
          },
        ].map((metric, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-hairline bg-card p-5 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                  {metric.label}
                </span>
                <div className={`p-1.5 rounded-md bg-secondary ${metric.color}`}>
                  <metric.icon className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-sans text-3xl font-bold text-foreground">
                  {metric.value}
                </span>
                {metric.unit && <span className="text-xs text-muted-foreground">{metric.unit}</span>}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{metric.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Tier Progression + College Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Tier Progression (7 Cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-hairline bg-card p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-hairline pb-4">
            <div>
              <h2 className="font-sans text-xl font-bold text-foreground flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span>Tier Progression</span>
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Milestones unlocked based on campus engagement and verified registrations.
              </p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-[#D4B872]/20 text-[#D4B872] border border-[#D4B872]/30">
              Current: {ambassador.tier}
            </span>
          </div>

          <div className="space-y-4">
            {tierProgression.map((tier) => (
              <div
                key={tier.level}
                className={`p-4 rounded-xl border transition-all ${
                  tier.status === "unlocked"
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : tier.status === "in_progress"
                    ? "border-primary/40 bg-secondary/50"
                    : "border-hairline bg-secondary/20 opacity-65"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-card border border-hairline">
                      Tier {tier.level}
                    </span>
                    <span className="font-sans text-base font-semibold text-foreground">
                      {tier.title}
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                    tier.status === "unlocked"
                      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10"
                      : tier.status === "in_progress"
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground bg-secondary"
                  }`}>
                    {tier.status === "unlocked" ? "Unlocked" : tier.status === "in_progress" ? "Active Goal" : "Locked"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {tier.reward}
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span>Requirement: {tier.minPeers} peers</span>
                  {tier.status === "unlocked" && (
                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                      <Check className="w-3.5 h-3.5" />
                      <span>Benefit Active</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* National College Leaderboard (5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-hairline bg-card p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-hairline pb-4">
            <div>
              <h2 className="font-sans text-xl font-bold text-foreground flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#D4B872]" />
                <span>Campus Leaderboard</span>
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Top participating tech universities in the 2026 Season.
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {campusLeaderboard.map((item) => (
              <div
                key={item.rank}
                className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
                  item.isCurrent
                    ? "border-primary/50 bg-primary/5 shadow-2xs"
                    : "border-hairline bg-secondary/50"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-semibold shrink-0 ${
                    item.rank === 1
                      ? "bg-[#D4B872]/20 text-[#D4B872]"
                      : item.rank === 2
                      ? "bg-slate-300/30 text-foreground"
                      : item.rank === 3
                      ? "bg-primary/20 text-primary"
                      : "bg-secondary text-muted-foreground"
                  }`}>
                    {item.rank}
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-foreground truncate flex items-center gap-1.5">
                      <span>{item.college}</span>
                      {item.isCurrent && (
                        <span className="text-[9px] font-mono text-primary bg-primary/10 px-1.5 rounded">You</span>
                      )}
                    </div>
                    <div className="text-[11px] text-muted-foreground truncate">
                      Lead: {item.chapterLead}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-mono font-medium text-foreground">{item.points} XP</div>
                  <div className="text-[10px] font-mono text-muted-foreground">{item.members} members</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
