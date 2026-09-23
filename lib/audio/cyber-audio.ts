/**
 * ASCI Academy — Cyber Audio Synthesizer (Web Audio API)
 * Zero external audio files (0 KB network overhead).
 * Generates soft, pleasant harmonic micro-chimes for Axel interactions.
 */

let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {})
  }
  return audioCtx
}

export type CyberSoundType = "click" | "happy" | "thinking" | "curious" | "celebrate" | "shocked" | "wave"

export function isAudioMuted(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("asci_axel_muted") === "true"
}

export function setAudioMuted(muted: boolean): void {
  if (typeof window === "undefined") return
  localStorage.setItem("asci_axel_muted", muted ? "true" : "false")
}

export function toggleAudioMute(): boolean {
  const current = isAudioMuted()
  setAudioMuted(!current)
  return !current
}

/**
 * Plays a soft, synthesized harmonic cyber tone.
 */
export function playCyberTone(type: CyberSoundType = "click"): void {
  if (isAudioMuted()) return
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime

  switch (type) {
    case "click": {
      // Soft tactile blip (800Hz, 35ms)
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "sine"
      osc.frequency.setValueAtTime(820, now)
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.035)

      gain.gain.setValueAtTime(0.04, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.04)
      break
    }

    case "happy":
    case "wave": {
      // Gentle ascending 2-tone chime (C5 -> G5)
      const notes = [523.25, 783.99]
      notes.forEach((freq, idx) => {
        const start = now + idx * 0.08
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = "sine"
        osc.frequency.setValueAtTime(freq, start)

        gain.gain.setValueAtTime(0.035, start)
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.12)

        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(start)
        osc.stop(start + 0.13)
      })
      break
    }

    case "curious": {
      // Soft question slide (440Hz -> 587Hz)
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "sine"
      osc.frequency.setValueAtTime(440, now)
      osc.frequency.exponentialRampToValueAtTime(587.33, now + 0.1)

      gain.gain.setValueAtTime(0.035, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.13)
      break
    }

    case "celebrate": {
      // Warm major triad arpeggio (C5 -> E5 -> G5 -> C6)
      const triad = [523.25, 659.25, 783.99, 1046.5]
      triad.forEach((freq, idx) => {
        const start = now + idx * 0.065
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = "triangle"
        osc.frequency.setValueAtTime(freq, start)

        gain.gain.setValueAtTime(0.03, start)
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.18)

        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(start)
        osc.stop(start + 0.19)
      })
      break
    }

    case "shocked": {
      // Minor surprise dip (660Hz -> 380Hz)
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "sine"
      osc.frequency.setValueAtTime(660, now)
      osc.frequency.exponentialRampToValueAtTime(380, now + 0.1)

      gain.gain.setValueAtTime(0.04, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.13)
      break
    }

    case "thinking": {
      // Single subtle soft radar blip (980Hz, 40ms)
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "sine"
      osc.frequency.setValueAtTime(987.77, now)

      gain.gain.setValueAtTime(0.02, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.07)
      break
    }
  }
}
