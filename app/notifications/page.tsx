"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Bell, BookOpen, Clock, Award, Briefcase, Check, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

import { EmptyState } from "@/components/ui/state-system"

interface NotificationItem {
  id: string
  title: string
  message: string
  time: string
  type: "course" | "competition" | "certificate" | "career"
  read: boolean
  actionText: string
  actionHref: string
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Course Progress",
    message: "Your Python course is 65% complete. 8 lessons remaining until certification.",
    time: "2 hours ago",
    type: "course",
    read: false,
    actionText: "Resume Learning",
    actionHref: "/courses/python/learn",
  },
  {
    id: "notif-2",
    title: "Registration Closing",
    message: "Registration for Google Summer Algorithm Sprint closes tomorrow at 11:59 PM.",
    time: "5 hours ago",
    type: "competition",
    read: false,
    actionText: "View Hackathon",
    actionHref: "/competitions",
  },
  {
    id: "notif-3",
    title: "Certificate Issued",
    message: "You earned your verified certificate for SQL & Database Architecture.",
    time: "1 day ago",
    type: "certificate",
    read: true,
    actionText: "View & Verify",
    actionHref: "/certificates",
  },
  {
    id: "notif-4",
    title: "Career Match",
    message: "New Software Engineer internship at Razorpay matching your Python & React skills.",
    time: "2 days ago",
    type: "career",
    read: true,
    actionText: "View Role",
    actionHref: "/career",
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "course":
        return <BookOpen className="w-4 h-4 text-primary" />
      case "competition":
        return <Clock className="w-4 h-4 text-amber-500" />
      case "certificate":
        return <Award className="w-4 h-4 text-emerald-500" />
      case "career":
        return <Briefcase className="w-4 h-4 text-sky-500" />
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 max-w-[800px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-serif font-normal text-foreground tracking-tight">
              Notifications
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Essential updates regarding your learning, deadlines, certificates, and opportunities.
            </p>
          </div>
          <button
            onClick={markAllRead}
            className="text-xs font-semibold text-primary hover:text-primary-active flex items-center gap-1 cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Mark all as read</span>
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-2.5">
          {notifications.length === 0 ? (
            <EmptyState
              illustration="learning"
              title="All caught up"
              explanation="You have no notifications right now. Check back later for course progress and competition updates."
              action={{ label: "Go to Dashboard", href: "/dashboard" }}
            />
          ) : (
            notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                n.read
                  ? "bg-card border-border"
                  : "bg-secondary/40 border-primary/30"
              }`}
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center shrink-0 mt-0.5">
                  {getIcon(n.type)}
                </div>
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground">{n.title}</span>
                    <span className="text-[11px] text-muted-foreground">• {n.time}</span>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {n.message}
                  </p>
                </div>
              </div>

              <Link
                href={n.actionHref}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 border border-border text-foreground hover:text-primary text-xs font-semibold transition-all shrink-0 self-end sm:self-center"
              >
                <span>{n.actionText}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ))
        )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
