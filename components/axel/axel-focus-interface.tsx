"use client"

import React, { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAxel } from "@/context/axel-context"
import { motion, AnimatePresence } from "framer-motion"
import {
  createSpeechRecognizer,
  isSpeechRecognitionSupported,
} from "@/components/axel/axel-voice"
import {
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  ArrowRight,
  Clock,
  RotateCcw,
  Bot,
  User,
} from "lucide-react"

interface AxelFocusInterfaceProps {
  className?: string
  anchorCoords: {
    posX: number
    posY: number
    curW: number
    curH: number
    winW: number
    winH: number
  }
}

export function AxelFocusInterface({
  className = "",
  anchorCoords,
}: AxelFocusInterfaceProps) {
  const router = useRouter()
  const {
    mode,
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

  const [inputVal, setInputVal] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const recognizerRef = useRef<any>(null)

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isThinking])

  // Auto-focus input when entering focus mode
  useEffect(() => {
    if (mode === "focus") {
      const t = setTimeout(() => {
        inputRef.current?.focus()
      }, 200)
      return () => clearTimeout(t)
    }
  }, [mode])

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

  if (mode !== "focus") {
    return null
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

  const { posX, curW, winW, winH } = anchorCoords
  const isMobile = winW < 768

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.96 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      onClick={(e) => e.stopPropagation()}
      className={`fixed z-50 pointer-events-auto flex flex-col select-text ${className}`}
      style={
        isMobile
          ? {
              bottom: 0,
              left: 0,
              right: 0,
              width: "100%",
              height: "78vh",
            }
          : {
              bottom: "24px",
              right: `${Math.max(20, winW - (posX - curW / 2) + 24)}px`,
              width: "min(460px, calc(100vw - 48px))",
              height: "min(640px, calc(100vh - 64px))",
            }
      }
    >
      <div className="flex flex-col h-full w-full rounded-3xl bg-[#FDFBF7]/96 dark:bg-[#141414]/96 backdrop-blur-3xl border border-hairline shadow-2xl overflow-hidden">
        {/* Warm Claude Orange Top Accent */}
        <div className="h-0.5 w-full bg-[#ea580c]" />

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-hairline bg-muted/20">
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 text-primary shadow-xs">
              <Bot className="w-4 h-4" />
              {isSpeaking && (
                <span className="absolute -top-1 -right-1 flex h-2 w-2 rounded-full bg-[#ea580c]" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm tracking-tight text-foreground font-ui">
                  Axel
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9.5px] font-mono font-medium bg-primary/10 text-primary border border-primary/20">
                  AI Mentor
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground font-ui">
                {isListening
                  ? "Listening to your voice..."
                  : isThinking
                  ? "Axel is thinking..."
                  : isSpeaking
                  ? "Speaking to you..."
                  : "AI Coding Assistant"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Voice toggle */}
            <button
              onClick={toggleSpeech}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-[#ea580c] hover:bg-[#ea580c]/10 transition-colors cursor-pointer"
              title={speechEnabled ? "Mute Axel's voice" : "Enable Axel's voice"}
            >
              {speechEnabled ? (
                <Volume2 className="w-4 h-4 text-[#ea580c]" />
              ) : (
                <VolumeX className="w-4 h-4 text-muted-foreground" />
              )}
            </button>

            {/* Clear chat */}
            <button
              onClick={clearChat}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-[#ea580c] hover:bg-[#ea580c]/10 transition-colors cursor-pointer"
              title="Clear conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Close */}
            <button
              onClick={closeFocus}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-[#ea580c]/10 transition-colors cursor-pointer"
              title="Minimize Axel (Esc)"
            >
              <X className="w-4 h-4" />
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
                    ? "bg-[#181818] text-[#FDFBF7] dark:bg-[#181818] dark:text-[#FDFBF7] border border-[#ea580c]/30 rounded-tr-sm shadow-md font-ui font-medium"
                    : "bg-[#FDFBF7]/80 dark:bg-zinc-900/80 border border-[#ea580c]/20 rounded-tl-sm text-foreground shadow-sm font-ui"
                }`}
              >
                <p className="whitespace-pre-wrap">{m.content}</p>

                {/* Structured Study Plan Bento Box */}
                {m.plan && (
                  <div className="mt-3 pt-2.5 border-t border-[#ea580c]/25">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#ea580c] mb-2 font-display">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{m.plan.title}</span>
                    </div>
                    <div className="space-y-1.5">
                      {m.plan.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between gap-2 p-2 rounded-xl bg-background/80 dark:bg-zinc-950/80 border border-[#ea580c]/20 text-[11px]"
                        >
                          <span className="font-mono text-[10px] text-[#ea580c] font-semibold px-1.5 py-0.5 rounded bg-[#ea580c]/10">
                            {item.duration}
                          </span>
                          <span className="flex-1 font-medium font-ui">{item.label}</span>
                          {item.actionTarget && (
                            <button
                              onClick={() => handleActionClick(item.actionTarget)}
                              className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-[#ea580c]/20 hover:bg-[#ea580c]/30 text-[#ea580c] transition-colors cursor-pointer"
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
                  <div className="mt-2.5 pt-2 border-t border-[#ea580c]/20">
                    <button
                      onClick={() => handleActionClick(m.action?.target)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold bg-primary text-primary-foreground hover:bg-primary-active shadow-xs transition-all cursor-pointer"
                    >
                      <span>{m.action.label || "Explore"}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Thinking Indicator */}
          {isThinking && (
            <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-primary/10 border border-primary/20 w-fit">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
              </div>
              <span className="text-[11px] font-medium text-foreground/80 font-ui">
                Axel is thinking...
              </span>
            </div>
          )}
        </div>

        {/* Suggested Prompts */}
        {quickSuggestions.length > 0 && !isThinking && (
          <div className="px-3 py-1.5 border-t border-hairline bg-muted/20 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickSuggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(s)}
                className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-card border border-border hover:border-primary hover:text-primary text-muted-foreground whitespace-nowrap transition-colors cursor-pointer shadow-2xs"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 border-t border-hairline bg-card flex items-center gap-2">
          {/* Voice Button */}
          <button
            onClick={handleMicClick}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isListening
                ? "bg-destructive text-destructive-foreground border-destructive"
                : "bg-muted/40 hover:bg-primary/10 text-muted-foreground hover:text-primary border-border"
            }`}
            title={isListening ? "Stop listening" : "Speak to Axel"}
          >
            {isListening ? (
              <MicOff className="w-4 h-4" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </button>

          {/* Text Input */}
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isListening ? "Listening to your voice..." : "Ask Axel a question about coding or algorithms..."}
            className="flex-1 h-9 px-3 text-xs rounded-xl bg-background border border-hairline focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all text-foreground placeholder:text-muted-foreground font-ui"
          />

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!inputVal.trim() || isThinking}
            className="p-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary-active disabled:opacity-40 transition-opacity cursor-pointer disabled:cursor-not-allowed shadow-xs"
            title="Send (Enter)"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
