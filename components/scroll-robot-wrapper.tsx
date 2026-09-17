"use client"

import dynamic from "next/dynamic"

const AxelCompanion = dynamic(
  () => import("@/components/axel/axel-companion").then((mod) => mod.AxelCompanion),
  { ssr: false }
)

const AIAssistantWidget = dynamic(
  () => import("@/components/ai-assistant-widget").then((mod) => mod.AIAssistantWidget),
  { ssr: false }
)

export function ScrollRobotWrapper() {
  return (
    <>
      <AxelCompanion />
      <AIAssistantWidget />
    </>
  )
}

