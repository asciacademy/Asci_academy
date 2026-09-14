"use client"

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  AxelMode,
  AxelState,
  AxelEmotion,
  AxelMessage,
  AxelAction,
  AxelChatResponse,
  StudentContext,
} from "@/types/axel"
import { speakText, stopSpeaking } from "@/components/axel/axel-voice"

interface AxelContextType {
  mode: AxelMode
  setMode: (mode: AxelMode) => void
  state: AxelState
  setState: (state: AxelState) => void
  expression: AxelEmotion
  setExpression: (expr: AxelEmotion, duration?: number, fallbackExpr?: AxelEmotion) => void
  messages: AxelMessage[]
  currentBubble: string | null
  speechEnabled: boolean
  toggleSpeech: () => void
  isListening: boolean
  setIsListening: (listening: boolean) => void
  isThinking: boolean
  isSpeaking: boolean
  quickSuggestions: string[]
  activeSection: string
  setActiveSection: (section: string) => void
  sendMessage: (text: string) => Promise<void>
  triggerEvent: (eventType: string, payload?: any) => void
  openFocus: () => void
  closeFocus: () => void
  clearChat: () => void
}

const AxelContext = createContext<AxelContextType | undefined>(undefined)

const INITIAL_GREETING = "Hey! I'm Axel, your AI mentor. Click me or pick an action below to get started!"

export function AxelProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const [mode, setMode] = useState<AxelMode>(pathname === "/" ? "hero" : "docked")
  const [state, setAxelState] = useState<AxelState>("idle")
  const [expression, setAxelExpression] = useState<AxelEmotion>("normal")
  const [currentBubble, setCurrentBubble] = useState<string | null>(null)
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(true)
  const [activeSection, setActiveSection] = useState<string>("hero")
  const [isListening, setIsListening] = useState<boolean>(false)
  const [isThinking, setIsThinking] = useState<boolean>(false)
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false)

  const [messages, setMessages] = useState<AxelMessage[]>([
    {
      id: "init-1",
      role: "axel",
      content: "Hey there! I'm Axel, your 3D engineering companion. What are we building or mastering today?",
      timestamp: Date.now(),
      emotion: "cute",
      suggestions: [
        "I have 30 minutes to study",
        "Why are queues used in BFS?",
        "Recommend my next course",
      ],
    },
  ])

  const [quickSuggestions, setQuickSuggestions] = useState<string[]>([
    "I have 30 minutes to study",
    "Why are queues used in BFS?",
    "Recommend my next course",
  ])

  const bubbleTimerRef = useRef<NodeJS.Timeout | null>(null)
  const expressionTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Load saved speech preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem("asci_axel_speech_enabled")
      if (saved !== null) {
        setSpeechEnabled(saved === "true")
      }
    } catch (_) {}
  }, [])

  const toggleSpeech = useCallback(() => {
    setSpeechEnabled((prev) => {
      const next = !prev
      try {
        localStorage.setItem("asci_axel_speech_enabled", String(next))
      } catch (_) {}
      if (!next) {
        stopSpeaking()
      }
      return next
    })
  }, [])

  const setExpression = useCallback((expr: AxelEmotion, duration = 3000, fallbackExpr?: AxelEmotion) => {
    if (expressionTimerRef.current) {
      clearTimeout(expressionTimerRef.current)
      expressionTimerRef.current = null
    }

    setAxelExpression(expr)

    const targetFallback = fallbackExpr || "normal"
    if (duration > 0 && expr !== targetFallback) {
      expressionTimerRef.current = setTimeout(() => {
        setAxelExpression(targetFallback)
      }, duration)
    }
  }, [])

  const showBubble = useCallback((text: string, duration = 4800) => {
    if (bubbleTimerRef.current) {
      clearTimeout(bubbleTimerRef.current)
      bubbleTimerRef.current = null
    }

    setCurrentBubble(text)

    if (duration > 0) {
      bubbleTimerRef.current = setTimeout(() => {
        setCurrentBubble(null)
      }, duration)
    }
  }, [])

  const openFocus = useCallback(() => {
    setMode("focus")
    setAxelState("idle")
    setExpression("cute", 2000)
    showBubble("What are we working on?", 3500)
  }, [setExpression, showBubble])

  const closeFocus = useCallback(() => {
    setMode("docked")
    stopSpeaking()
    setIsSpeaking(false)
    setIsThinking(false)
    setIsListening(false)
    setAxelState("idle")
    setExpression("normal")
  }, [setExpression])

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: "cleared-1",
        role: "axel",
        content: "Cleared! Ready for our next topic. What shall we explore?",
        timestamp: Date.now(),
        emotion: "normal",
      },
    ])
  }, [])

  // Send message to Axel Gemini backend
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return

      const userMsg: AxelMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: text.trim(),
        timestamp: Date.now(),
      }

      setMessages((prev) => [...prev, userMsg])
      setIsThinking(true)
      setAxelState("thinking")
      setExpression("normal")
      showBubble("Thinking...", 10000)

      try {
        const studentContext: StudentContext = {
          pathname,
          activeSection,
          topic: pathname.includes("dsa")
            ? "Data Structures & Algorithms"
            : pathname.includes("courses")
            ? "Curriculum Overview"
            : pathname.includes("dashboard")
            ? "Student Dashboard"
            : "ASCI Platform",
        }

        const historyPayload = messages.slice(-5).map((m) => ({
          role: m.role,
          content: m.content,
        }))

        const res = await fetch("/api/axel/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: text.trim(),
            context: studentContext,
            history: historyPayload,
          }),
        })

        const data: AxelChatResponse = await res.json()

        const axelMsg: AxelMessage = {
          id: `axel-${Date.now()}`,
          role: "axel",
          content: data.message,
          timestamp: Date.now(),
          emotion: data.emotion,
          action: data.action,
          plan: data.plan,
          suggestions: data.suggestions,
        }

        setMessages((prev) => [...prev, axelMsg])

        // Update Axel emotional expression and state
        setExpression(data.emotion, 4000)
        setAxelState(data.state || "speaking")
        showBubble(data.message.slice(0, 120) + (data.message.length > 120 ? "..." : ""), 6000)

        if (data.suggestions?.length) {
          setQuickSuggestions(data.suggestions)
        }

        // Voice output
        if (speechEnabled) {
          setIsSpeaking(true)
          speakText(data.message, {
            onStart: () => {
              setIsSpeaking(true)
              setAxelState("speaking")
            },
            onEnd: () => {
              setIsSpeaking(false)
              setAxelState("idle")
            },
          })
        }
      } catch (err) {
        console.error("Axel chat error:", err)
        const errorMsg: AxelMessage = {
          id: `err-${Date.now()}`,
          role: "axel",
          content: "I ran into a quick connection glitch, but I'm right here! Let's try again.",
          timestamp: Date.now(),
          emotion: "shocked",
        }
        setMessages((prev) => [...prev, errorMsg])
        setExpression("shocked", 3000)
        setAxelState("confused")
        showBubble("Oops! Let's try again.", 4000)
      } finally {
        setIsThinking(false)
      }
    },
    [pathname, messages, speechEnabled, setExpression, showBubble]
  )

  // Trigger platform milestone events
  const triggerEvent = useCallback(
    (eventType: string, payload?: any) => {
      if (eventType === "lesson_completed") {
        setExpression("heart", 4000)
        setAxelState("celebrating")
        showBubble("Nice! That's another piece of the path finished. 🎉", 5000)
        if (speechEnabled) {
          speakText("Nice! That's another piece of the path finished.")
        }
      } else if (eventType === "quiz_passed") {
        setExpression("cute", 4000)
        setAxelState("happy")
        showBubble("That one wasn't easy. You earned that result!", 5000)
      } else if (eventType === "streak_extended") {
        setExpression("heart", 4000)
        setAxelState("celebrating")
        showBubble(`Streak extended! Keep that momentum going! 🔥`, 5000)
      }
    },
    [speechEnabled, setExpression, showBubble]
  )

  // Global window event listener for asci events
  useEffect(() => {
    const handlePlatformEvent = (e: Event) => {
      const custom = e as CustomEvent<{ type: string; payload?: any }>
      if (custom.detail?.type) {
        triggerEvent(custom.detail.type, custom.detail.payload)
      }
    }

    window.addEventListener("asci-event", handlePlatformEvent)
    return () => window.removeEventListener("asci-event", handlePlatformEvent)
  }, [triggerEvent])

  // Contextual suggestions based on route
  useEffect(() => {
    if (pathname.includes("dsa")) {
      setQuickSuggestions([
        "Why queues in BFS?",
        "Explain Big-O Time & Space",
        "Give me a 30-minute study sprint",
      ])
    } else if (pathname.includes("courses")) {
      setQuickSuggestions([
        "Which course should I start first?",
        "DSA vs Full Stack roadmap",
        "How do 1-on-1 teardowns work?",
      ])
    } else if (pathname.includes("dashboard")) {
      setQuickSuggestions([
        "Plan today's 30-min session",
        "What are my weakest topics?",
        "Review interview milestones",
      ])
    } else {
      setQuickSuggestions([
        "I have 30 minutes to study",
        "Why are queues used in BFS?",
        "Recommend my next course",
      ])
    }
  }, [pathname])

  return (
    <AxelContext.Provider
      value={{
        mode,
        setMode,
        state,
        setState: setAxelState,
        expression,
        setExpression,
        messages,
        currentBubble,
        speechEnabled,
        toggleSpeech,
        isListening,
        setIsListening,
        isThinking,
        isSpeaking,
        quickSuggestions,
        activeSection,
        setActiveSection,
        sendMessage,
        triggerEvent,
        openFocus,
        closeFocus,
        clearChat,
      }}
    >
      {children}
    </AxelContext.Provider>
  )
}

export function useAxel() {
  const context = useContext(AxelContext)
  if (!context) {
    throw new Error("useAxel must be used within an AxelProvider")
  }
  return context
}
