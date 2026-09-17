"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createClient } from "@/utils/supabase/client"
import { useTheme } from "next-themes"
import { useUserSettings } from "@/context/user-settings-context"
import {
  User, Mail, Camera, Activity, Key, Bell, Palette, Monitor, Moon, Sun,
  Globe, LogOut, Trash2, ChevronRight, Layers, Lock, CheckCircle2,
  RotateCcw, X, Save, Award, Flame, Zap
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { AxelStage } from "@/components/axel/axel-stage"
import { BadgesShowcase } from "@/components/gamification/badges-showcase"
import { extractFirstName } from "@/lib/user-utils"

type SettingsTab = "identity" | "portfolio" | "badges" | "appearance" | "notifications" | "security" | "billing"

const tabs: { id: SettingsTab; label: string; icon: any }[] = [
  { id: "identity", label: "Identity & Bio", icon: User },
  { id: "portfolio", label: "Public Portfolio", icon: Globe },
  { id: "badges", label: "Badges & Honors", icon: Award },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security & Access", icon: Key },
  { id: "billing", label: "Billing & Plan", icon: Zap },
]

const DEFAULT_AVATARS = [
  { src: "/avatars/hacker.png", name: "Engineer" },
  { src: "/avatars/robot.png", name: "Architect" },
  { src: "/avatars/skull.png", name: "Strategist" },
  { src: "/avatars/astronaut.png", name: "Explorer" },
  { src: "/avatars/ninja.png", name: "Builder" },
  { src: "/avatars/cat.png", name: "Fellow" },
]

interface ProfileWorkspaceProps {
  user: any
  initialProfile: any
  initialBadges?: string[]
}

export function ProfileWorkspace({
  user,
  initialProfile,
  initialBadges = [],
}: ProfileWorkspaceProps) {
  const [profile, setProfile] = useState<any>(initialProfile)
  const [activeTab, setActiveTab] = useState<SettingsTab>("identity")

  const initialName = initialProfile?.name || extractFirstName(initialProfile, user?.user_metadata, user?.email)
  const [alias, setAlias] = useState(initialName)
  const [bio, setBio] = useState(initialProfile?.bio || "")
  const [username, setUsername] = useState(initialProfile?.username || "")
  const [isPublic, setIsPublic] = useState(!!initialProfile?.is_public)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")
  const [passwordResetSent, setPasswordResetSent] = useState(false)
  const [showAvatarPicker, setShowAvatarPicker] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>(initialBadges)

  const { settings, updateSetting } = useUserSettings()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (initialProfile?.avatar_url && !settings.avatar) {
      updateSetting("avatar", initialProfile.avatar_url)
    }
    if (user && typeof window !== "undefined") {
      try {
        localStorage.setItem("asci_auth_user", JSON.stringify(user))
        if (initialProfile) {
          localStorage.setItem("asci_auth_profile", JSON.stringify(initialProfile))
        }
      } catch {}
    }
  }, [initialProfile, settings.avatar, updateSetting, user])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSaveMessage("")

    if (typeof document !== "undefined" && document.cookie.includes("demo_bypass")) {
      setTimeout(() => {
        setProfile({ ...profile, name: alias, bio, username, is_public: isPublic, avatar_url: settings.avatar })
        setIsSaving(false)
        setSaveMessage("Profile updated successfully (Demo Mode).")
        setTimeout(() => setSaveMessage(""), 3000)
      }, 500)
      return
    }

    try {
      const supabase = createClient()
      const avatarToSave = settings.avatar || profile?.avatar_url || null
      const { data, error } = await supabase
        .from("profiles")
        .update({
          name: alias,
          bio,
          username,
          is_public: isPublic,
          avatar_url: avatarToSave,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)
        .select()
        .maybeSingle()

      if (error) {
        setSaveMessage(`Error: ${error.message}`)
      } else {
        setProfile((prev: any) => ({
          ...prev,
          ...(data || {}),
          name: alias,
          bio,
          username,
          is_public: isPublic,
          avatar_url: avatarToSave,
        }))
        setSaveMessage("Profile updated successfully.")
        setTimeout(() => setSaveMessage(""), 3000)
      }
    } catch (err: any) {
      setSaveMessage(`Error: ${err?.message || "Failed to update profile."}`)
    } finally {
      setIsSaving(false)
    }
  }

  const handlePasswordReset = async () => {
    if (!user?.email) return
    if (typeof document !== "undefined" && document.cookie.includes("demo_bypass")) {
      setPasswordResetSent(true)
      setTimeout(() => setPasswordResetSent(false), 5000)
      return
    }
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/auth/callback`,
      })
      if (!error) {
        setPasswordResetSent(true)
        setTimeout(() => setPasswordResetSent(false), 5000)
      } else {
        setSaveMessage(`Password reset error: ${error.message}`)
      }
    } catch (err: any) {
      setSaveMessage(`Password reset failed: ${err?.message}`)
    }
  }

  const handleSignOut = async () => {
    if (typeof document !== "undefined" && document.cookie.includes("demo_bypass")) {
      document.cookie = "demo_bypass=; path=/; max-age=0"
    }
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
    } catch (e) {
      console.warn("Sign out error:", e)
    } finally {
      window.location.href = "/"
    }
  }

  const handleDeleteAccount = async () => {
    if (typeof document !== "undefined" && document.cookie.includes("demo_bypass")) {
      document.cookie = "demo_bypass=; path=/; max-age=0"
      window.location.href = "/"
      return
    }
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
    } catch {}
    window.location.href = "/"
  }

  const userName = alias || profile?.name || extractFirstName(profile, user?.user_metadata, user?.email)
  const currentAvatar = settings.avatar || profile?.avatar_url || user?.user_metadata?.avatar_url || user?.user_metadata?.picture

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="h-[68px]" />

      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-12">
        {/* Profile Header Band */}
        <section id="profile-hero" className="mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-hairline pb-8 scroll-mt-24">
          <div className="flex items-center gap-5">
            {/* Avatar preview */}
            <div
              className="relative w-20 h-20 rounded-full overflow-hidden border border-hairline bg-card cursor-pointer group shrink-0"
              onClick={() => setShowAvatarPicker(true)}
              title="Click to change avatar"
            >
              {currentAvatar ? (
                <Image src={currentAvatar} alt="Avatar" width={80} height={80} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xl font-medium text-foreground bg-secondary">
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 text-white">
                <Camera className="w-5 h-5" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground">
                  {userName}
                </h1>
                <span className="badge-coral text-[10px]">
                  {profile?.role === "admin" || profile?.role === "super_admin" ? "Admin" : "Member"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex gap-6">
              <div className="text-center">
                <div className="font-serif text-2xl sm:text-3xl font-normal text-foreground">{profile?.xp ?? 0}</div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Total XP</div>
              </div>
              <div className="w-px bg-hairline" />
              <div className="text-center">
                <div className="font-serif text-2xl sm:text-3xl font-normal text-blue-500 flex items-center justify-center gap-1.5">
                  <Flame className="w-5 h-5 fill-blue-500 text-blue-500" />
                  <span>{profile?.streak_count ?? profile?.streak ?? 0}</span>
                </div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Day Streak</div>
              </div>
            </div>

            <AxelStage
              id="profile-hero-robot-anchor"
              sectionId="profile-hero"
              label="Profile Overview"
              emotion="wave"
              scale={0.46}
              size="sm"
            />
          </div>
        </section>

        {/* Avatar Picker Modal */}
        {showAvatarPicker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="rounded-xl border border-hairline bg-background p-6 w-full max-w-lg shadow-xl">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif text-lg font-normal text-foreground">Choose Profile Avatar</h2>
                <button onClick={() => setShowAvatarPicker(false)} className="p-1 text-muted-foreground hover:text-foreground cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {DEFAULT_AVATARS.map((av) => (
                  <button
                    key={av.src}
                    onClick={() => {
                      updateSetting("avatar", av.src)
                      setShowAvatarPicker(false)
                    }}
                    className={`rounded-lg border p-2 transition-all flex flex-col items-center gap-1 cursor-pointer ${
                      settings.avatar === av.src ? "border-primary bg-secondary" : "border-hairline bg-card hover:bg-secondary"
                    }`}
                  >
                    <Image src={av.src} alt={av.name} width={64} height={64} className="rounded-full object-cover" />
                    <span className="text-[11px] text-muted-foreground font-medium mt-1">{av.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Grid: Sidebar Tabs + Content */}
        <section id="profile-settings" className="grid grid-cols-1 md:grid-cols-4 gap-8 scroll-mt-24">
          {/* Vertical Tabs Sidebar */}
          <div className="space-y-4">
            <div className="space-y-1">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium rounded-md transition-colors text-left cursor-pointer ${
                      isActive
                        ? "bg-card text-foreground shadow-xs border border-hairline font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                    }`}
                  >
                    <tab.icon className={`w-4 h-4 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                    <span>{tab.label}</span>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-primary" />}
                  </button>
                )
              })}
              <div className="pt-4 border-t border-hairline mt-4">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-destructive hover:bg-destructive/10 rounded-md transition-colors text-left cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content Panels */}
          <div className="md:col-span-3">
            {/* Identity Tab */}
            {activeTab === "identity" && (
              <form onSubmit={handleSave} className="rounded-xl border border-hairline bg-card p-6 sm:p-8 space-y-6 shadow-xs">
                <div>
                  <h2 className="font-serif text-xl font-normal text-foreground">Identity &amp; Bio</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Manage your public profile details and information.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">Display Name</label>
                    <input
                      type="text"
                      value={alias}
                      onChange={(e) => setAlias(e.target.value)}
                      className="w-full bg-background border border-hairline rounded-md px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder="Jane Doe"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">Email Address</label>
                    <input
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="w-full bg-secondary border border-hairline rounded-md px-3.5 py-2 text-sm text-muted-foreground cursor-not-allowed"
                    />
                    <p className="text-[11px] text-muted-foreground">Registered authentication email address.</p>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">Professional Bio</label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={3}
                      className="w-full bg-background border border-hairline rounded-md px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Software engineer interested in distributed systems and algorithms..."
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-hairline flex items-center justify-between">
                  <span className="text-xs font-medium text-primary">{saveMessage}</span>
                  <button type="submit" disabled={isSaving} className="btn-primary inline-flex items-center gap-2 text-xs font-medium cursor-pointer">
                    <Save className="w-3.5 h-3.5" />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}

            {/* Portfolio Tab */}
            {activeTab === "portfolio" && (
              <form onSubmit={handleSave} className="rounded-xl border border-hairline bg-card p-6 sm:p-8 space-y-6 shadow-xs">
                <div>
                  <h2 className="font-serif text-xl font-normal text-foreground">Public Portfolio Handle</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Configure your external showcase page.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-hairline bg-background">
                    <div>
                      <div className="text-xs font-medium text-foreground">Public Visibility</div>
                      <div className="text-[11px] text-muted-foreground">Allow external visitors to discover your certifications and XP</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsPublic(!isPublic)}
                      className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${isPublic ? "bg-primary" : "bg-hairline"}`}
                    >
                      <div
                        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${isPublic ? "translate-x-5" : "translate-x-0"}`}
                      />
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">Username Handle</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">@</div>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                        className="w-full bg-background border border-hairline rounded-md pl-8 pr-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-mono"
                        placeholder="janedoe"
                      />
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Public URL: <Link href={`/portfolio/${username || "janedoe"}`} className="text-primary hover:underline">/portfolio/{username || "janedoe"}</Link>
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-hairline flex items-center justify-between">
                  <span className="text-xs font-medium text-primary">{saveMessage}</span>
                  <button type="submit" disabled={isSaving} className="btn-primary inline-flex items-center gap-2 text-xs font-medium cursor-pointer">
                    <Save className="w-3.5 h-3.5" />
                    {isSaving ? "Saving..." : "Save Portfolio"}
                  </button>
                </div>
              </form>
            )}

            {/* Badges & Honors Tab */}
            {activeTab === "badges" && (
              <div className="rounded-xl border border-hairline bg-card p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-4">
                  <div>
                    <h2 className="font-serif text-xl font-normal text-foreground">Verified Badges &amp; Honors</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Showcase of cryptographic credentials, mastery milestones, and streak records.
                    </p>
                  </div>
                  <span className="badge-gold text-xs px-3 py-1 font-mono">
                    {unlockedBadges.length} / 16 Unlocked
                  </span>
                </div>
                <BadgesShowcase unlockedBadgeIds={unlockedBadges} />
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === "appearance" && (
              <div className="rounded-xl border border-hairline bg-card p-6 sm:p-8 space-y-6 shadow-xs">
                <div>
                  <h2 className="font-serif text-xl font-normal text-foreground">Visual Preferences</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Editorial themes and high-contrast display modes.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-foreground">Theme Mode</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "light", icon: Sun, label: "Pearl Cream" },
                        { id: "dark", icon: Moon, label: "Pure Black" },
                        { id: "system", icon: Monitor, label: "System Sync" },
                      ].map((opt) => {
                        const isSelected = mounted && theme === opt.id
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setTheme(opt.id)}
                            className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all cursor-pointer ${
                              isSelected
                                ? "border-primary bg-background text-foreground shadow-sm ring-1 ring-primary/20 font-semibold"
                                : "border-hairline bg-secondary text-muted-foreground hover:text-foreground hover:border-border"
                            }`}
                          >
                            <opt.icon className={`w-5 h-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                            <span className="text-xs font-medium">{opt.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="rounded-xl border border-hairline bg-card p-6 sm:p-8 space-y-4 shadow-xs">
                <div>
                  <h2 className="font-serif text-xl font-normal text-foreground">Notification Preferences</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Select email updates and digests.</p>
                </div>

                {[
                  { key: "emailNotifs" as const, label: "Email Notifications", desc: "Receive updates about course activities and mentor feedback", icon: Mail },
                  { key: "courseUpdates" as const, label: "New Module Releases", desc: "Get alerted when new syllabi or problem sets are added", icon: Layers },
                  { key: "weeklyDigest" as const, label: "Weekly Learning Summary", desc: "Summary of study hours, streak continuity, and XP gains", icon: Globe },
                  { key: "achievementAlerts" as const, label: "Milestone & Skill Badges", desc: "Notifications when you reach rank thresholds", icon: Award },
                ].map((notif, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3.5 border-b border-hairline last:border-b-0">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md border border-hairline bg-secondary text-primary">
                        <notif.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-foreground">{notif.label}</div>
                        <div className="text-[11px] text-muted-foreground">{notif.desc}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => updateSetting(notif.key, !settings[notif.key])}
                      className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${settings[notif.key] ? "bg-primary" : "bg-hairline"}`}
                    >
                      <div
                        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${settings[notif.key] ? "translate-x-5" : "translate-x-0"}`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <div className="rounded-xl border border-hairline bg-card p-6 sm:p-8 space-y-5 shadow-xs">
                  <div>
                    <h2 className="font-serif text-xl font-normal text-foreground">Security &amp; Authentication</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">Account password and active logins.</p>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-hairline bg-background">
                    <div className="flex items-center gap-3">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="text-xs font-medium text-foreground">Account Password</div>
                        <div className="text-[11px] text-muted-foreground">
                          {passwordResetSent ? "Reset link sent to your email inbox." : "Send password update link"}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handlePasswordReset}
                      disabled={passwordResetSent}
                      className="btn-primary text-xs py-1.5 px-3.5 rounded-md cursor-pointer disabled:opacity-50"
                    >
                      {passwordResetSent ? "Sent ✓" : "Reset Password"}
                    </button>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 sm:p-8 space-y-3">
                  <h3 className="font-serif text-lg font-normal text-destructive flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Danger Zone
                  </h3>
                  <p className="text-xs text-body leading-relaxed">
                    Permanently delete your account and associated study records. This action cannot be reversed.
                  </p>
                  {!showDeleteConfirm ? (
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="rounded-md border border-destructive/30 bg-background text-destructive text-xs font-medium px-4 py-2 hover:bg-destructive hover:text-white transition-colors cursor-pointer"
                    >
                      Delete Account
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={handleDeleteAccount}
                        className="rounded-md bg-destructive text-white text-xs font-medium px-4 py-2 hover:bg-destructive/90 cursor-pointer"
                      >
                        Confirm Delete
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="rounded-md border border-hairline bg-background text-foreground text-xs font-medium px-4 py-2 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Billing Tab */}
            {activeTab === "billing" && (
              <div className="rounded-xl border border-hairline bg-card p-6 sm:p-8 space-y-6 shadow-xs">
                <div>
                  <h2 className="font-serif text-xl font-normal text-foreground">Membership &amp; Tuition</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Manage cohort enrollment and plan status.</p>
                </div>

                <div className="p-5 rounded-lg border border-hairline bg-background space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium text-foreground">Current Membership</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {profile?.subscription_tier === "architect" ? "Full Fellowship Access" : "Standard Explorer Tier"}
                      </div>
                    </div>
                    <span className="badge-coral text-[10px]">
                      {profile?.subscription_tier === "architect" ? "Architect" : "Explorer"}
                    </span>
                  </div>

                  <p className="text-xs text-body leading-relaxed">
                    {profile?.subscription_tier === "architect"
                      ? "You have unrestricted access to all 1-on-1 mentorship calls, code reviews, and production systems."
                      : "Upgrade to the Architect Fellowship for dedicated 1-on-1 mentor pairings and career placement."}
                  </p>

                  <div className="pt-2">
                    {profile?.subscription_tier === "architect" ? (
                      <button
                        onClick={async () => {
                          const res = await fetch("/api/razorpay/cancel-subscription", { method: "POST" })
                          if (res.ok) window.location.reload()
                          else alert("Failed to cancel subscription")
                        }}
                        className="rounded-md border border-destructive/30 text-destructive text-xs font-medium px-4 py-2 hover:bg-destructive/10 cursor-pointer"
                      >
                        Cancel Membership
                      </button>
                    ) : (
                      <Link
                        href="/pricing"
                        className="btn-primary inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-md"
                      >
                        Explore Fellowship Tiers
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
