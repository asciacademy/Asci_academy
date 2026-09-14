import { GoogleGenAI } from "@google/genai"

let aiClient: GoogleGenAI | null = null

export function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey || apiKey.trim() === "") {
    return null
  }

  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey })
  }

  return aiClient
}

export function getGeminiModelName(): string {
  return process.env.GEMINI_MODEL || "gemini-2.5-flash"
}
