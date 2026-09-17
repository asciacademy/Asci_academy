"use client"

import { useState } from "react"
import {
    Settings, Shield, Mail, Globe, Bell, Database,
    Key, Users, Palette, Save, CheckCircle2, AlertCircle,
    ExternalLink, Lock, Eye, EyeOff, Loader2
} from "lucide-react"

function SectionHeader({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
    return (
        <div className="flex items-start gap-3 mb-6 border-b border-border/80 pb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary flex-shrink-0 mt-0.5">
                <Icon className="h-4 w-4" />
            </div>
            <div>
                <h2 className="font-serif text-2xl font-normal text-foreground">{title}</h2>
                <p className="text-xs text-muted-foreground mt-0.5 font-sans">{description}</p>
            </div>
        </div>
    )
}

function SettingRow({
    label,
    description,
    children,
}: {
    label: string
    description?: string
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 border-b border-border/80 last:border-0">
            <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground font-sans">{label}</p>
                {description && <p className="text-[11px] text-muted-foreground mt-0.5 font-sans leading-relaxed">{description}</p>}
            </div>
            <div className="flex-shrink-0">{children}</div>
        </div>
    )
}

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
    return (
        <button
            type="button"
            onClick={onToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none border cursor-pointer ${
                enabled ? "bg-primary border-primary" : "bg-secondary/40 border-border/80"
            }`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-primary-foreground shadow-xs transition-transform ${
                    enabled ? "translate-x-6" : "translate-x-1"
                }`}
            />
        </button>
    )
}

function TextInput({
    value,
    onChange,
    placeholder,
    type = "text",
}: {
    value: string
    onChange: (v: string) => void
    placeholder?: string
    type?: string
}) {
    return (
        <input
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-secondary/40 border border-border/80 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-primary/50 text-foreground font-sans placeholder:text-muted-foreground/50"
        />
    )
}

function SaveButton({ onClick, saving, saved }: { onClick: () => void; saving: boolean; saved: boolean }) {
    return (
        <button
            onClick={onClick}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-mono font-semibold uppercase tracking-wider hover:bg-primary-active transition-all disabled:opacity-60 shadow-sm cursor-pointer"
        >
            {saving ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : saved ? (
                <CheckCircle2 className="h-3.5 w-3.5" />
            ) : (
                <Save className="h-3.5 w-3.5" />
            )}
            {saved ? "Changes Saved" : "Save Changes"}
        </button>
    )
}

export default function AdminSettingsPage() {
    const [activeTab, setActiveTab] = useState("general")
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState<string | null>(null)

    const handleSave = (section: string) => {
        setSaving(true)
        setSaved(null)
        setTimeout(() => {
            setSaving(false)
            setSaved(section)
            setTimeout(() => setSaved(null), 2500)
        }, 600)
    }

    // Settings state
    const [siteName, setSiteName] = useState("ASCI Engineering Platform")
    const [siteUrl, setSiteUrl] = useState("http://localhost:3000")
    const [supportEmail, setSupportEmail] = useState("admissions@asci.edu")
    const [maintenanceMode, setMaintenanceMode] = useState(false)

    const [allowSignups, setAllowSignups] = useState(true)
    const [emailConfirmation, setEmailConfirmation] = useState(true)
    const [googleAuth, setGoogleAuth] = useState(true)
    const [passwordMinLength, setPasswordMinLength] = useState("8")

    const [smtpHost, setSmtpHost] = useState("smtp.gmail.com")
    const [smtpPort, setSmtpPort] = useState("465")
    const [smtpUser, setSmtpUser] = useState("")
    const [smtpPass, setSmtpPass] = useState("")
    const [smtpFrom, setSmtpFrom] = useState("")
    const [showSmtpPass, setShowSmtpPass] = useState(false)

    const [newUserAlert, setNewUserAlert] = useState(true)
    const [newEnrollmentAlert, setNewEnrollmentAlert] = useState(true)
    const [weeklyReport, setWeeklyReport] = useState(false)

    const [freeCoursesEnabled, setFreeCoursesEnabled] = useState(true)
    const [premiumEnabled, setPremiumEnabled] = useState(true)
    const [guestPreview, setGuestPreview] = useState(false)
    const [maxFreeCourses, setMaxFreeCourses] = useState("3")

    const [accentColor, setAccentColor] = useState("#2563eb")
    const [platformTagline, setPlatformTagline] = useState("Rigorous systems engineering for the next era of computing.")

    const tabs = [
        { id: "general", label: "General", icon: Globe },
        { id: "auth", label: "Authentication", icon: Shield },
        { id: "email", label: "Email / SMTP", icon: Mail },
        { id: "access", label: "Access Control", icon: Lock },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "appearance", label: "Appearance", icon: Palette },
    ]

    return (
        <div className="space-y-8 pt-2 font-sans text-foreground">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 mb-2 font-semibold">
                        System Configuration
                    </div>
                    <h1 className="font-serif text-3xl sm:text-4xl font-normal text-foreground tracking-tight">
                        Platform Settings
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-sans">
                        Global administrative configurations, auth policies, and external integrations.
                    </p>
                </div>
            </div>

            {/* Supabase Notice */}
            <div className="flex items-start gap-3 p-4 bg-card/70 border border-border/80 rounded-2xl backdrop-blur-xl">
                <AlertCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                    Authentication providers, OAuth credentials, and SMTP relays are synchronized through your{" "}
                    <a
                        href="https://supabase.com/dashboard"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-primary font-semibold inline-flex items-center gap-0.5"
                    >
                        Supabase Project Dashboard <ExternalLink className="h-3 w-3" />
                    </a>
                    . Values configured here reflect the active platform configuration state.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Sidebar Navigation */}
                <aside className="w-full md:w-52 flex-shrink-0">
                    <nav className="space-y-1 bg-card/70 p-2 rounded-2xl border border-border/80 backdrop-blur-xl">
                        {tabs.map(tab => {
                            const active = activeTab === tab.id
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-medium rounded-xl transition-all text-left cursor-pointer ${
                                        active
                                            ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                                    }`}
                                >
                                    <tab.icon className={`h-4 w-4 flex-shrink-0 ${active ? "text-primary-foreground" : "text-muted-foreground"}`} />
                                    {tab.label}
                                </button>
                            )
                        })}
                    </nav>
                </aside>

                {/* Settings Panel */}
                <div className="flex-1 min-w-0 w-full">
                    {/* GENERAL */}
                    {activeTab === "general" && (
                        <div className="bg-card/70 border border-border/80 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
                            <SectionHeader icon={Globe} title="General Settings" description="Core platform metadata and availability status." />
                            <div className="space-y-2">
                                <SettingRow label="Platform Name" description="Appears in header wordmark and verification certificates.">
                                    <div className="w-64"><TextInput value={siteName} onChange={setSiteName} placeholder="ASCI Engineering Platform" /></div>
                                </SettingRow>
                                <SettingRow label="Canonical URL" description="Production domain used for email and OAuth callbacks.">
                                    <div className="w-64"><TextInput value={siteUrl} onChange={setSiteUrl} placeholder="https://asci.dev" /></div>
                                </SettingRow>
                                <SettingRow label="Academic Support Email" description="Destination for scholar questions and admission inquiries.">
                                    <div className="w-64"><TextInput value={supportEmail} onChange={setSupportEmail} type="email" /></div>
                                </SettingRow>
                                <SettingRow label="Maintenance Mode" description="Temporarily restrict access to administrators only.">
                                    <Toggle enabled={maintenanceMode} onToggle={() => setMaintenanceMode(v => !v)} />
                                </SettingRow>
                            </div>
                            {maintenanceMode && (
                                <div className="mt-4 p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-mono">
                                    Notice: Maintenance mode is enabled. Non-admin students will receive a scheduled maintenance banner.
                                </div>
                            )}
                            <div className="mt-6 pt-4 border-t border-border/80 flex justify-end">
                                <SaveButton onClick={() => handleSave("general")} saving={saving && saved === null} saved={saved === "general"} />
                            </div>
                        </div>
                    )}

                    {/* AUTH */}
                    {activeTab === "auth" && (
                        <div className="bg-card/70 border border-border/80 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
                            <SectionHeader icon={Shield} title="Authentication Policies" description="Control scholar registration and identity verification." />
                            <div className="space-y-2">
                                <SettingRow label="Open Registration" description="Permit new student account registrations.">
                                    <Toggle enabled={allowSignups} onToggle={() => setAllowSignups(v => !v)} />
                                </SettingRow>
                                <SettingRow label="Email OTP Verification" description="Require 6-digit one-time code verification upon registration.">
                                    <Toggle enabled={emailConfirmation} onToggle={() => setEmailConfirmation(v => !v)} />
                                </SettingRow>
                                <SettingRow label="Google OAuth SSO" description="Enable one-click Google authentication.">
                                    <Toggle enabled={googleAuth} onToggle={() => setGoogleAuth(v => !v)} />
                                </SettingRow>
                                <SettingRow label="Minimum Password Length" description="Enforce password entropy standards (recommended 8+).">
                                    <div className="w-24">
                                        <TextInput value={passwordMinLength} onChange={setPasswordMinLength} type="number" />
                                    </div>
                                </SettingRow>
                            </div>

                            <div className="mt-6 p-4 bg-secondary/30 border border-border/80 rounded-xl space-y-2">
                                <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-2">Supabase External Auth Links</p>
                                {[
                                    { label: "OAuth Identity Providers", path: "auth/providers" },
                                    { label: "OTP Email Templates", path: "auth/templates" },
                                    { label: "Callback URL Whitelists", path: "auth/url-configuration" },
                                ].map(link => (
                                    <a
                                        key={link.path}
                                        href={`https://supabase.com/dashboard/project/_/${link.path}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-2.5 rounded-lg bg-card/80 hover:bg-secondary text-xs text-foreground transition-colors"
                                    >
                                        <span>{link.label}</span>
                                        <ExternalLink className="h-3.5 w-3.5 text-primary" />
                                    </a>
                                ))}
                            </div>

                            <div className="mt-6 pt-4 border-t border-border/80 flex justify-end">
                                <SaveButton onClick={() => handleSave("auth")} saving={saving && saved === null} saved={saved === "auth"} />
                            </div>
                        </div>
                    )}

                    {/* EMAIL / SMTP */}
                    {activeTab === "email" && (
                        <div className="bg-card/70 border border-border/80 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
                            <SectionHeader icon={Mail} title="Email & SMTP Infrastructure" description="Outgoing mail relay configuration for OTP codes and announcements." />

                            <div className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">SMTP Host</label>
                                        <TextInput value={smtpHost} onChange={setSmtpHost} placeholder="smtp.gmail.com" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Port</label>
                                        <TextInput value={smtpPort} onChange={setSmtpPort} placeholder="465" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">SMTP Username</label>
                                    <TextInput value={smtpUser} onChange={setSmtpUser} placeholder="relay@asci.dev" type="email" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">App Password / Secret</label>
                                    <div className="relative">
                                        <input
                                            type={showSmtpPass ? "text" : "password"}
                                            value={smtpPass}
                                            onChange={e => setSmtpPass(e.target.value)}
                                            placeholder="••••••••••••••••"
                                            className="w-full bg-secondary/40 border border-border/80 rounded-xl px-3.5 py-2 pr-10 text-xs focus:outline-none focus:border-primary/50 text-foreground font-mono"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowSmtpPass(v => !v)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground cursor-pointer"
                                        >
                                            {showSmtpPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Sender Address</label>
                                    <TextInput value={smtpFrom} onChange={setSmtpFrom} placeholder="ASCI Platform <no-reply@asci.dev>" />
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-border/80 flex justify-end">
                                <SaveButton onClick={() => handleSave("email")} saving={saving && saved === null} saved={saved === "email"} />
                            </div>
                        </div>
                    )}

                    {/* ACCESS CONTROL */}
                    {activeTab === "access" && (
                        <div className="bg-card/70 border border-border/80 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
                            <SectionHeader icon={Lock} title="Access & Tier Policies" description="Curriculum permissions and subscription boundaries." />
                            <div className="space-y-2">
                                <SettingRow label="Enable Foundational Access" description="Allow free scholars to access basic CS curriculum modules.">
                                    <Toggle enabled={freeCoursesEnabled} onToggle={() => setFreeCoursesEnabled(v => !v)} />
                                </SettingRow>
                                <SettingRow label="Enable Architect Pro Tier" description="Permit enrollment in paid, advanced systems modules.">
                                    <Toggle enabled={premiumEnabled} onToggle={() => setPremiumEnabled(v => !v)} />
                                </SettingRow>
                                <SettingRow label="Guest Preview Allowed" description="Enable unauthenticated visitors to view first lesson of any course.">
                                    <Toggle enabled={guestPreview} onToggle={() => setGuestPreview(v => !v)} />
                                </SettingRow>
                                <SettingRow label="Max Free Active Courses" description="Limit concurrent enrolled courses for free accounts.">
                                    <div className="w-24">
                                        <TextInput value={maxFreeCourses} onChange={setMaxFreeCourses} type="number" />
                                    </div>
                                </SettingRow>
                            </div>

                            <div className="mt-6 pt-4 border-t border-border/80 flex justify-end">
                                <SaveButton onClick={() => handleSave("access")} saving={saving && saved === null} saved={saved === "access"} />
                            </div>
                        </div>
                    )}

                    {/* NOTIFICATIONS */}
                    {activeTab === "notifications" && (
                        <div className="bg-card/70 border border-border/80 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
                            <SectionHeader icon={Bell} title="Administrative Alerts" description="Email notifications dispatched to platform operators." />
                            <div className="space-y-2">
                                <SettingRow label="New Scholar Signups" description="Dispatch alert upon successful user registration.">
                                    <Toggle enabled={newUserAlert} onToggle={() => setNewUserAlert(v => !v)} />
                                </SettingRow>
                                <SettingRow label="Course Enrollment Alerts" description="Dispatch alert when a scholar enrolls in a track.">
                                    <Toggle enabled={newEnrollmentAlert} onToggle={() => setNewEnrollmentAlert(v => !v)} />
                                </SettingRow>
                                <SettingRow label="Weekly Telemetry Digest" description="Receive summary metrics every Monday at 08:00 UTC.">
                                    <Toggle enabled={weeklyReport} onToggle={() => setWeeklyReport(v => !v)} />
                                </SettingRow>
                            </div>
                            <div className="mt-6 pt-4 border-t border-border/80 flex justify-end">
                                <SaveButton onClick={() => handleSave("notifications")} saving={saving && saved === null} saved={saved === "notifications"} />
                            </div>
                        </div>
                    )}

                    {/* APPEARANCE */}
                    {activeTab === "appearance" && (
                        <div className="bg-card/70 border border-border/80 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
                            <SectionHeader icon={Palette} title="Design System & Tokens" description="Electric Blue editorial design system configurations." />
                            <div className="space-y-4">
                                <SettingRow label="Primary Accent Color" description="Electric blue primary accent token used across key interactions.">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="color"
                                            value={accentColor}
                                            onChange={e => setAccentColor(e.target.value)}
                                            className="h-8 w-12 cursor-pointer bg-transparent border border-border/80 rounded-lg p-0.5"
                                        />
                                        <span className="text-xs text-foreground font-mono">{accentColor}</span>
                                    </div>
                                </SettingRow>
                                <SettingRow label="Institutional Tagline" description="Rendered under hero headline and editorial meta descriptions.">
                                    <div className="w-80">
                                        <TextInput value={platformTagline} onChange={setPlatformTagline} placeholder="Rigorous systems engineering..." />
                                    </div>
                                </SettingRow>
                            </div>

                            {/* Color Palette Preview */}
                            <div className="mt-6 p-4 bg-secondary/30 border border-border/80 rounded-xl space-y-3">
                                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Design Token Harmony</p>
                                <div className="flex items-center gap-3 flex-wrap">
                                    <div className="px-3 py-1 rounded-full text-xs font-mono text-white font-semibold" style={{ backgroundColor: accentColor }}>
                                        Primary Accent ({accentColor})
                                    </div>
                                    <div className="px-3 py-1 rounded-full text-xs font-mono bg-[#2563eb] text-white border border-[#2563eb]/60">
                                        Electric Blue (#2563eb)
                                    </div>
                                    <div className="px-3 py-1 rounded-full text-xs font-mono bg-[#181715] text-[#f5f0e8] border border-white/10">
                                        Obsidian Studio (#181715)
                                    </div>
                                    <div className="px-3 py-1 rounded-full text-xs font-mono bg-card text-foreground border border-border">
                                        Warm Cream Surface
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-border/80 flex justify-end">
                                <SaveButton onClick={() => handleSave("appearance")} saving={saving && saved === null} saved={saved === "appearance"} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
