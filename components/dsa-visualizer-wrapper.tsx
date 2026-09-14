"use client"

import dynamic from "next/dynamic"
import { Loader2, Braces } from "lucide-react"

export const DSAVisualizerWrapper = dynamic(
  () => import("@/components/dsa-visualizer").then((mod) => mod.DSAVisualizer),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[500px] w-full bg-background border-y border-hairline flex flex-col items-center justify-center p-16 relative">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-hairline bg-secondary text-primary">
            <Braces className="h-6 w-6" />
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-widest">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span>Loading Algorithm Visualizer...</span>
          </div>
        </div>
      </div>
    ),
  }
)
