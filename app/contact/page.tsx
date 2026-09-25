"use client"

import React, { useState } from "react"
import { Mail, MessageSquare, MapPin, Send, CheckCircle2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.email && formData.message) {
      setSubmitted(true)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 max-w-[800px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-serif font-normal text-foreground tracking-tight">
            Contact ASCI Academy
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Have questions about curricula, institutional partnerships, hackathons, or verified certificates? Reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <div className="p-4 rounded-xl border border-border bg-card space-y-1">
            <Mail className="w-5 h-5 text-primary mb-2" />
            <div className="text-xs font-bold text-foreground">Email</div>
            <div className="text-xs text-muted-foreground">contact@asci.academy</div>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card space-y-1">
            <MessageSquare className="w-5 h-5 text-primary mb-2" />
            <div className="text-xs font-bold text-foreground">Community</div>
            <div className="text-xs text-muted-foreground">Discord Server</div>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card space-y-1">
            <MapPin className="w-5 h-5 text-primary mb-2" />
            <div className="text-xs font-bold text-foreground">Location</div>
            <div className="text-xs text-muted-foreground">Bangalore, India</div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-6 rounded-2xl border border-border bg-card">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <h3 className="text-lg font-bold text-foreground">Message Sent</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Thank you for getting in touch. Our team will review your inquiry and reply within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ada Lovelace"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-secondary border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ada@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-secondary border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Course inquiries / Institutional collaboration"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-secondary border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Message</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist you?"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-secondary border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary-active text-xs font-semibold transition-all shadow-2xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
