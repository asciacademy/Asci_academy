"use client"

import React from "react"
import { useAxel } from "@/context/axel-context"
import { Bot, Volume2, Mic, Brain } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { AxelMode } from "@/types/axel"

interface AxelSpeechBubbleProps {
  className?: string
  onClick?: () => void
  sectionLabel?: string
  guideText?: string
  anchorCoords: {
    posX: number
    posY: number
    curW: number
    curH: number
    mode: AxelMode
    winW: number
    winH: number
  }
}

export function AxelSpeechBubble({
  className = "",
  onClick,
  sectionLabel,
  guideText,
  anchorCoords,
}: AxelSpeechBubbleProps) {
  const { currentBubble, isThinking, isSpeaking, isListening, mode } = useAxel()

  // In focus mode, conversation is inside the main focus interface
  if (mode === "focus") {
    return null
  }

  const activeText = currentBubble || guideText
  const shouldShow = !!activeText || isThinking || isSpeaking || isListening

  // Determine state badge
  let badgeLabel = sectionLabel ? `Axel · ${sectionLabel}` : "Axel Guide"
  let badgeIcon = <Bot className="w-3 h-3 text-[#ea580c]" />

  if (isListening) {
    badgeLabel = "Listening..."
    badgeIcon = <Mic className="w-3 h-3 text-red-400 animate-bounce" />
  } else if (isThinking) {
    badgeLabel = "Synthesizing..."
    badgeIcon = <Brain className="w-3 h-3 text-[#ea580c] animate-spin" />
  } else if (isSpeaking) {
    badgeLabel = "Speaking..."
    badgeIcon = <Volume2 className="w-3 h-3 text-[#ea580c] animate-pulse" />
  }

  const { posX, posY, curW, curH, winW, winH } = anchorCoords
  const isRightSide = posX > winW / 2

  // Fixed unscaled coordinates anchored relative to Axel
  let positionStyle: React.CSSProperties = {}

  if (posY - curH / 2 >= 90) {
    // Normal case: Float above Axel's head
    const bubbleBottom = Math.max(16, winH - (posY - curH / 2) + 12)
    positionStyle = {
      position: "fixed",
      bottom: `${bubbleBottom}px`,
      ...(isRightSide
        ? { right: `${Math.max(16, winW - (posX + curW / 2) + 6)}px` }
        : { left: `${Math.max(16, posX - curW / 2 - 6)}px` }),
      maxWidth: "310px",
    }
  } else {
    // Top of screen case: Float beside Axel
    const bubbleTop = Math.max(76, posY - 40)
    positionStyle = {
      position: "fixed",
      top: `${bubbleTop}px`,
      ...(isRightSide
        ? { right: `${Math.max(16, winW - (posX - curW / 2) + 14)}px` }
        : { left: `${Math.max(16, posX + curW / 2 + 14)}px` }),
      maxWidth: "310px",
    }
  }

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.94 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          onClick={onClick}
          className={`z-50 pointer-events-auto cursor-pointer select-none ${className}`}
          style={positionStyle}
        >
          <div className="relative rounded-2xl p-3.5 bg-[#FDFBF7]/95 dark:bg-[#141414]/95 backdrop-blur-3xl border border-hairline hover:border-[#ea580c] shadow-md text-foreground text-xs leading-relaxed group transition-all duration-200">

            {/* Header */}
            <div className="relative flex items-center gap-1.5 mb-1.5 text-[10px] font-mono tracking-wider uppercase">
              {badgeIcon}
              <span className="font-semibold text-foreground/90 font-ui tracking-wide truncate max-w-[170px]">
                {badgeLabel}
              </span>
              <span className="ml-auto text-[9px] text-muted-foreground/70 group-hover:text-[#ea580c] transition-colors whitespace-nowrap">
                Click to talk
              </span>
            </div>

            {/* Content */}
            <p className="relative text-[12.5px] font-medium leading-snug line-clamp-4 text-foreground/90 font-ui">
              {isThinking && !activeText ? (
                <span className="flex items-center gap-1.5 text-muted-foreground italic">
                  <span>Synthesizing engineering concept</span>
                  <span className="flex gap-0.5">
                    <span className="w-1 h-1 rounded-full bg-[#ea580c] animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1 h-1 rounded-full bg-[#ea580c] animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1 h-1 rounded-full bg-[#ea580c] animate-bounce" />
                  </span>
                </span>
              ) : (
                activeText
              )}
            </p>

            {/* Pointer Tail */}
            <div
              className={`absolute w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#FDFBF7]/95 dark:border-t-[#141414]/95 -bottom-2 ${
                isRightSide ? "right-10" : "left-10"
              }`}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
