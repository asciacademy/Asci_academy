"use client"

import dynamic from "next/dynamic"

const AIAssistantWidget = dynamic(
  () => import("@/components/ai-assistant-widget").then((mod) => mod.AIAssistantWidget),
  { ssr: false }
)

export function ScrollRobotWrapper() {
  return <AIAssistantWidget />
}
