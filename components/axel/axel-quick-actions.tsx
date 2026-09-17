"use client"

import React, { useState } from "react"
import { usePathname } from "next/navigation"
import { useAxel } from "@/context/axel-context"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, Users, Compass, Lightbulb, Clock, BookOpen, Flame, Brain, ChevronRight, ChevronLeft } from "lucide-react"

export interface QuickActionItem {
  icon: React.ReactNode
  label: string
  prompt: string
  tag?: string
}

interface AxelQuickActionsProps {
  className?: string
  stationActions?: QuickActionItem[]
  sectionLabel?: string
  anchorCoords: {
    posX: number
    posY: number
    curW: number
    curH: number
    winW: number
    winH: number
  }
}

export function AxelQuickActions({
  className = "",
  stationActions,
  sectionLabel,
  anchorCoords,
}: AxelQuickActionsProps) {
  const pathname = usePathname()
  const { sendMessage, openFocus, mode, isThinking } = useAxel()
  const [collapsed, setCollapsed] = useState(false)

  // Do not display quick actions when conversational focus modal is open
  if (mode === "focus" || isThinking) {
    return null
  }

  const handleActionClick = (e: React.MouseEvent, prompt: string) => {
    e.stopPropagation()
    openFocus()
    sendMessage(prompt)
  }

  // Use station-specific actions if provided, otherwise route defaults
  let actions: QuickActionItem[] = stationActions || []

  if (!actions.length) {
    if (pathname.includes("dsa")) {
      actions = [
        {
          icon: <Brain className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />,
          label: "Why queues in BFS?",
          prompt: "Why are queues used in Breadth-First Search instead of stacks?",
          tag: "Algorithm",
        },
        {
          icon: <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />,
          label: "Plan 30-min Sprint",
          prompt: "I have 30 minutes to study DSA today. Plan a targeted session for me.",
          tag: "Sprint",
        },
        {
          icon: <Lightbulb className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />,
          label: "Big-O Intuition",
          prompt: "Can you explain Big-O Time and Space Complexity with intuitive examples?",
          tag: "Complexity",
        },
        {
          icon: <Compass className="w-3.5 h-3.5 text-sky-500" />,
          label: "DP Knapsack Pattern",
          prompt: "Show me the Dynamic Programming 0/1 Knapsack pattern step by step.",
          tag: "Pattern",
        },
      ]
    } else if (pathname.includes("courses")) {
      actions = [
        {
          icon: <Compass className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />,
          label: "Which course first?",
          prompt: "Which course should I take first based on my goal to get interview ready?",
          tag: "Guidance",
        },
        {
          icon: <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />,
          label: "System Design Path",
          prompt: "Explain ASCI's Full Stack and System Design roadmap in detail.",
          tag: "Roadmap",
        },
        {
          icon: <Brain className="w-3.5 h-3.5 text-indigo-500" />,
          label: "Java vs Python Interviews",
          prompt: "Should I focus on Java or Python for coding interviews?",
          tag: "Strategy",
        },
      ]
    } else if (pathname.includes("dashboard")) {
      actions = [
        {
          icon: <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />,
          label: "Plan today's session",
          prompt: "Plan a focused 30-minute study session for my dashboard progress today.",
          tag: "Sprint",
        },
        {
          icon: <Flame className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />,
          label: "Analyze my streak",
          prompt: "How am I progressing on my learning streak and what should I tackle next?",
          tag: "Progress",
        },
        {
          icon: <Lightbulb className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />,
          label: "Warmup coding quiz",
          prompt: "Give me a quick 3-question conceptual quiz on algorithms to warm up.",
          tag: "Quiz",
        },
      ]
    } else {
      // General defaults
      actions = [
        {
          icon: <Compass className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />,
          label: "Recommend my roadmap",
          prompt: "Recommend the best ASCI learning path for me to reach Senior Engineer level.",
          tag: "Roadmap",
        },
        {
          icon: <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />,
          label: "I have 30 minutes today",
          prompt: "I have 30 minutes to study right now. Set up a quick sprint plan.",
          tag: "Sprint",
        },
        {
          icon: <Brain className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />,
          label: "Why queues in BFS?",
          prompt: "Why are queues used in Breadth-First Search instead of stacks?",
          tag: "Concept",
        },
        {
          icon: <Users className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />,
          label: "1-on-1 Mentorship",
          prompt: "How does 1-on-1 engineering mentorship work at ASCI?",
          tag: "Mentorship",
        },
      ]
    }
  }

  const { posX, posY, curW, curH, winW, winH } = anchorCoords

  // Calculate position: if Axel is on the right side of the screen, place actions to his left.
  // If Axel is on the left side, place actions to his right.
  const isRightSide = posX > winW / 2
  const actionsBottom = Math.max(16, Math.min(winH - 180, winH - (posY + curH / 2) + 8))

  const positionStyle: React.CSSProperties = {
    bottom: `${actionsBottom}px`,
    ...(isRightSide
      ? { right: `${Math.max(16, winW - (posX - curW / 2) + 14)}px` }
      : { left: `${Math.max(16, posX + curW / 2 + 14)}px` }),
  }

  return (
    <div
      className={`fixed z-50 pointer-events-auto flex flex-col gap-2 select-none ${
        isRightSide ? "items-end" : "items-start"
      } ${className}`}
      style={positionStyle}
    >
      {/* Header bar with section indicator & collapse toggle */}
      <div className="flex items-center gap-2 px-2 py-0.5 mb-0.5 text-[10px] font-mono tracking-wider text-blue-600 dark:text-blue-400 uppercase">
        <Bot className="w-3 h-3 text-blue-600 dark:text-blue-400" />
        <span>{sectionLabel ? `Ask Axel · ${sectionLabel}` : "Ask Axel"}</span>
        <button
          onClick={(e) => {
            e.stopPropagation()
            setCollapsed(!collapsed)
          }}
          className="ml-1 p-0.5 rounded-md hover:bg-blue-500/15 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          title={collapsed ? "Show quick actions" : "Hide quick actions"}
          aria-label={collapsed ? "Expand quick questions" : "Collapse quick questions"}
        >
          {collapsed ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </button>
      </div>

      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, x: isRightSide ? 16 : -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRightSide ? 16 : -16 }}
            transition={{ duration: 0.2 }}
            className={`flex flex-col gap-2 ${isRightSide ? "items-end" : "items-start"}`}
          >
            {actions.map((action, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, x: isRightSide ? 14 : -14, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: isRightSide ? 10 : -10, scale: 0.95 }}
                transition={{ delay: idx * 0.04, duration: 0.2 }}
                whileHover={{ scale: 1.03, x: isRightSide ? -3 : 3 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => handleActionClick(e, action.prompt)}
                className={`flex items-center gap-2.5 px-3.5 py-2 rounded-full text-xs font-medium bg-white/95 dark:bg-card/95 hover:bg-white dark:hover:bg-card backdrop-blur-3xl border border-hairline hover:border-blue-500/50 shadow-sm hover:shadow-md text-foreground/90 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 group whitespace-nowrap cursor-pointer ${
                  isRightSide ? "text-right" : "text-left"
                }`}
                title={`Ask Axel: "${action.prompt}"`}
              >
                {action.tag && (
                  <span className="text-[9.5px] font-mono uppercase px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500/20 font-semibold">
                    {action.tag}
                  </span>
                )}
                <span className="font-ui text-[12px]">{action.label}</span>
                <span className="group-hover:translate-x-0.5 transition-transform">{action.icon}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
