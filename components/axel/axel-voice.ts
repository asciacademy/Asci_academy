/**
 * Axel Voice Integration
 * Uses browser-native Web Speech API (SpeechSynthesis & SpeechRecognition)
 * Zero external latency, free, accessible, and privacy-respecting.
 */

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window
}

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === "undefined") return false
  return "webkitSpeechRecognition" in window || "SpeechRecognition" in window
}

let activeUtterance: SpeechSynthesisUtterance | null = null

export function speakText(
  text: string,
  options?: {
    onStart?: () => void
    onEnd?: () => void
    rate?: number
    pitch?: number
  }
) {
  if (!isSpeechSynthesisSupported()) return

  // Cancel any ongoing speech
  window.speechSynthesis.cancel()

  // Clean text of markdown links or heavy code blocks for fluid speech
  const cleanText = text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/```[\s\S]*?```/g, "code block omitted")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/[*_#>-]/g, "")
    .trim()

  if (!cleanText) return

  const utterance = new SpeechSynthesisUtterance(cleanText)
  activeUtterance = utterance

  utterance.rate = options?.rate ?? 1.05
  utterance.pitch = options?.pitch ?? 1.15 // Friendly, youthful companion tone

  // Attempt to select a clear English voice
  const voices = window.speechSynthesis.getVoices()
  const preferredVoice = voices.find(
    (v) =>
      v.lang.startsWith("en") &&
      (v.name.includes("Natural") ||
        v.name.includes("Google") ||
        v.name.includes("Samantha") ||
        v.name.includes("Alex"))
  )
  if (preferredVoice) {
    utterance.voice = preferredVoice
  }

  utterance.onstart = () => {
    options?.onStart?.()
  }

  utterance.onend = () => {
    activeUtterance = null
    options?.onEnd?.()
  }

  utterance.onerror = () => {
    activeUtterance = null
    options?.onEnd?.()
  }

  window.speechSynthesis.speak(utterance)
}

export function stopSpeaking() {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel()
    activeUtterance = null
  }
}

export function createSpeechRecognizer(
  onResult: (text: string) => void,
  onStateChange?: (listening: boolean) => void,
  onError?: (err: any) => void
) {
  if (!isSpeechRecognitionSupported()) return null

  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
  const recognition = new SpeechRecognition()

  recognition.continuous = false
  recognition.interimResults = false
  recognition.lang = "en-US"

  recognition.onstart = () => {
    onStateChange?.(true)
  }

  recognition.onresult = (event: any) => {
    const transcript = event.results[0]?.[0]?.transcript
    if (transcript) {
      onResult(transcript)
    }
  }

  recognition.onerror = (event: any) => {
    onStateChange?.(false)
    onError?.(event.error)
  }

  recognition.onend = () => {
    onStateChange?.(false)
  }

  return {
    start: () => {
      try {
        recognition.start()
      } catch (e) {
        console.warn("Speech recognition already active:", e)
      }
    },
    stop: () => {
      try {
        recognition.stop()
      } catch (_) {}
    },
  }
}
