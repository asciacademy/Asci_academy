"use client"

import React, { useState, useRef, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAxel } from "@/context/axel-context"
import { motion, AnimatePresence } from "framer-motion"
import {
  createSpeechRecognizer,
  isSpeechRecognitionSupported,
} from "@/components/axel/axel-voice"
import {
  Bot,
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  RotateCcw,
  ArrowRight,
  Clock,
} from "lucide-react"
import { AxelSkeleton } from "@/components/skeletons"

export function AIAssistantWidget() {
  const router = useRouter()
  const pathname = usePathname()
  const {
    mode,
    openFocus,
    closeFocus,
    messages,
    sendMessage,
    isThinking,
    isSpeaking,
    speechEnabled,
    toggleSpeech,
    isListening,
    setIsListening,
    quickSuggestions,
    clearChat,
  } = useAxel()

  const isOpen = mode === "focus"
  const [inputVal, setInputVal] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const recognizerRef = useRef<any>(null)

  // Pages that already have a dedicated Ask AI tutor or where floating buttons would obstruct the UI
  const isExcludedPage =
    pathname?.startsWith("/dsa/problems") ||
    pathname?.startsWith("/admin")

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    if (scrollRef.current && isOpen) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isThinking, isOpen])

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => {
        inputRef.current?.focus()
      }, 200)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  // Initialize Speech Recognition
  useEffect(() => {
    if (isSpeechRecognitionSupported()) {
      recognizerRef.current = createSpeechRecognizer(
        (transcript) => {
          setInputVal(transcript)
          sendMessage(transcript)
          setIsListening(false)
        },
        (listening) => {
          setIsListening(listening)
        },
        (err) => {
          console.warn("Speech recognition error:", err)
          setIsListening(false)
        }
      )
    }
  }, [sendMessage, setIsListening])

  const handleToggle = () => {
    if (isOpen) {
      closeFocus()
    } else {
      openFocus()
    }
  }

  const handleSend = () => {
    if (!inputVal.trim() || isThinking) return
    sendMessage(inputVal)
    setInputVal("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    } else if (e.key === "Escape") {
      closeFocus()
    }
  }

  const handleMicClick = () => {
    if (!recognizerRef.current) {
      alert("Speech recognition is not supported in this browser.")
      return
    }

    if (isListening) {
      recognizerRef.current.stop()
      setIsListening(false)
    } else {
      recognizerRef.current.start()
      setIsListening(true)
    }
  }

  const handleActionClick = (target?: string) => {
    if (!target) return
    if (target.startsWith("http")) {
      window.open(target, "_blank")
    } else {
      router.push(target)
    }
  }

  // Do not render on excluded pages (e.g. /dsa/problems/* has its own Ask Axel AI button and dual-pane IDE)
  if (isExcludedPage) {
    return null
  }

  return (
    <>
      {/* 1. Floating AI Assistant Trigger Button — Editorial ASCI Circular Redesign */}
      <motion.button
        onClick={handleToggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 group flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-full border border-border/80 dark:border-white/15 bg-card/95 dark:bg-black/95 backdrop-blur-2xl hover:border-primary/60 dark:hover:border-primary/60 transition-all duration-300 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
        title={isOpen ? "Close AI Assistant" : "Ask AI Assistant"}
      >
        {/* Ambient Ring Pulse when thinking or speaking */}
        {(isSpeaking || isThinking) && (
          <span className="absolute -inset-1 rounded-full border-2 border-primary/40 animate-ping pointer-events-none" />
        )}

        {/* Hover Context Tooltip (Left Side of Circle - Desktop Only) */}
        <div className="pointer-events-none hidden sm:flex absolute right-full mr-3.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-card/95 dark:bg-black/95 backdrop-blur-xl border border-border/80 dark:border-white/15 text-xs font-semibold text-foreground whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 items-center gap-1.5">
          <Bot className="h-3.5 w-3.5 text-primary shrink-0" />
          <span>{isOpen ? "Close Assistant" : "Ask AI Assistant"}</span>
        </div>

        {/* Center Icon with Smooth Rotation/Morph */}
        <div className="relative flex items-center justify-center text-primary">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-5 w-5 text-foreground group-hover:text-primary transition-colors" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <Bot className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Activity Dot */}
          {isSpeaking || isThinking ? (
            <span className="absolute -top-1.5 -right-1.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
          ) : !isOpen && (
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/70 duration-1000" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
          )}
        </div>
      </motion.button>

      {/* 2. Floating AI Assistant Chat Window — Editorial ASCI Theme */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile backdrop shield to dismiss on tap outside */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeFocus}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden cursor-pointer"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.95 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="fixed z-50 pointer-events-auto flex flex-col select-text
                bottom-0 left-0 right-0 w-full h-[82vh] rounded-t-3xl rounded-b-none
                md:bottom-[88px] md:left-auto md:right-6 md:w-[420px] md:max-w-[calc(100vw-32px)] md:h-[590px] md:max-h-[calc(100vh-110px)] md:rounded-3xl"
            >
            <div className="flex flex-col h-full w-full rounded-3xl bg-card/98 dark:bg-black/98 backdrop-blur-2xl border border-hairline dark:border-white/10 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-hairline dark:border-white/10 bg-secondary/40 dark:bg-black/50">
                <div className="flex items-center gap-2.5">
                  <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/25">
                    <Bot className="h-4 w-4" />
                    {isSpeaking && (
                      <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-sans font-semibold text-sm tracking-tight text-foreground">
                        ASCI AI Assistant
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-primary/10 text-primary border border-primary/25">
                        AI Mentor
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground font-sans leading-tight mt-0.5">
                      {isListening
                        ? "Listening to your voice..."
                        : isThinking
                        ? "Synthesizing answer..."
                        : isSpeaking
                        ? "Speaking to you..."
                        : "Software Engineering & DSA Companion"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {/* Voice toggle */}
                  <button
                    onClick={toggleSpeech}
                    className="p-1.5 rounded-lg border border-hairline dark:border-[#262626] text-muted-foreground hover:text-foreground hover:bg-secondary dark:hover:bg-[#181818] transition-colors cursor-pointer"
                    title={speechEnabled ? "Mute voice" : "Enable voice"}
                  >
                    {speechEnabled ? (
                      <Volume2 className="h-3.5 w-3.5 text-primary" />
                    ) : (
                      <VolumeX className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </button>

                  {/* Clear chat */}
                  <button
                    onClick={clearChat}
                    className="p-1.5 rounded-lg border border-hairline dark:border-[#262626] text-muted-foreground hover:text-foreground hover:bg-secondary dark:hover:bg-[#181818] transition-colors cursor-pointer"
                    title="Clear conversation"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>

                  {/* Close button */}
                  <button
                    onClick={closeFocus}
                    className="p-1.5 rounded-lg border border-hairline dark:border-[#262626] text-muted-foreground hover:text-foreground hover:bg-secondary dark:hover:bg-[#181818] transition-colors cursor-pointer"
                    title="Close (Esc)"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Message Thread */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs text-foreground/90 scroll-smooth"
              >
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${
                      m.role === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                        m.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-xs shadow-xs font-sans font-medium"
                          : "bg-background dark:bg-[#141414] border border-hairline dark:border-[#242424] text-foreground rounded-tl-xs shadow-xs font-sans"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{m.content}</p>

                      {/* Structured Study Plan Bento Box */}
                      {m.plan && (
                        <div className="mt-3 pt-2.5 border-t border-hairline dark:border-[#282828]">
                          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-primary mb-2 font-serif">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{m.plan.title}</span>
                          </div>
                          <div className="space-y-1.5">
                            {m.plan.items.map((item, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between gap-2 p-2 rounded-xl bg-secondary/50 dark:bg-[#1a1a1a]/60 border border-hairline dark:border-[#282828] text-[11px]"
                              >
                                <span className="font-mono text-[10px] text-primary font-semibold px-1.5 py-0.5 rounded bg-primary/10">
                                  {item.duration}
                                </span>
                                <span className="flex-1 font-medium font-sans">{item.label}</span>
                                {item.actionTarget && (
                                  <button
                                    onClick={() => handleActionClick(item.actionTarget)}
                                    className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-primary/15 hover:bg-primary/25 text-primary transition-colors cursor-pointer"
                                  >
                                    Go
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action CTA Button */}
                      {m.action && (
                        <div className="mt-2.5 pt-2 border-t border-hairline dark:border-[#282828]">
                          <button
                            onClick={() => handleActionClick(m.action?.target)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-primary text-primary-foreground hover:opacity-90 shadow-xs transition-opacity cursor-pointer"
                          >
                            <span>{m.action.label || "Explore"}</span>
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Thinking Indicator */}
                {isThinking && (
                  <AxelSkeleton thinkingOnly className="my-1" />
                )}
              </div>

              {/* Suggested Prompts */}
              {quickSuggestions.length > 0 && !isThinking && (
                <div className="px-3 py-2 border-t border-hairline dark:border-[#222222] bg-secondary/20 dark:bg-[#101010]/30 flex gap-1.5 overflow-x-auto no-scrollbar">
                  {quickSuggestions.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => sendMessage(s)}
                      className="px-3 py-1 rounded-full text-[11px] font-medium bg-background dark:bg-[#141414] border border-hairline dark:border-[#262626] hover:border-primary/50 hover:text-primary text-muted-foreground whitespace-nowrap transition-colors cursor-pointer shadow-2xs"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Input Bar */}
              <div className="p-3 border-t border-hairline dark:border-[#222222] bg-card/90 dark:bg-[#0c0c0c]/90 flex items-center gap-2">
                {/* Voice Button */}
                <button
                  onClick={handleMicClick}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    isListening
                      ? "bg-destructive text-destructive-foreground border-destructive animate-pulse shadow-xs"
                      : "border-hairline dark:border-[#262626] hover:bg-secondary dark:hover:bg-[#181818] text-muted-foreground hover:text-primary"
                  }`}
                  title={isListening ? "Stop listening" : "Speak to AI Assistant"}
                >
                  {isListening ? (
                    <MicOff className="h-4 w-4" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </button>

                {/* Text Input */}
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    isListening
                      ? "Listening to your voice..."
                      : "Ask AI Assistant anything (code, DSA, roadmap)..."
                  }
                  className="flex-1 h-9 px-3 text-xs rounded-xl bg-background dark:bg-[#141414] border border-hairline dark:border-[#282828] focus:border-primary focus:ring-1 focus:ring-primary/40 focus:outline-none transition-all text-foreground placeholder:text-muted-foreground/60 font-sans"
                />

                {/* Send Button */}
                <button
                  onClick={handleSend}
                  disabled={!inputVal.trim() || isThinking}
                  className="p-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40 transition-opacity cursor-pointer disabled:cursor-not-allowed shadow-xs"
                  title="Send (Enter)"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  </>
)
}
