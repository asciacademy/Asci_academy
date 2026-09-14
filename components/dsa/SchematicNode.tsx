"use client"

import { motion } from "framer-motion"
import { Lock, Zap, Target, BookOpen, Code2 } from "lucide-react"
import { Lesson } from "@/lib/dsa-course-data"

interface SchematicNodeProps {
    mission: Lesson
    index: number
    onSelect: (lesson: Lesson) => void
}

export default function SchematicNode({ mission, index, onSelect }: SchematicNodeProps) {
    const isLocked = mission.isLocked || false
    const Icon = mission.icon || Target

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            className={`mission-node absolute group pointer-events-auto transition-all duration-500 ${isLocked ? "opacity-30 grayscale cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
            onClick={() => !isLocked && onSelect(mission)}
            style={{
                // Positions will be set via GSAP or dynamic layout in parent
                zIndex: 10
            }}
        >
            <div className="relative w-16 h-16 flex items-center justify-center">
                <div className={`absolute inset-0 rounded-xl border border-white/10 bg-background/80 backdrop-blur-md transition-all duration-200 ${!isLocked && "group-hover:border-primary"}`} />
                
                {/* Connecting Wire Stem (Visual) */}
                <div className="absolute top-1/2 right-full w-4 h-px bg-white/20 origin-right transition-all duration-200 group-hover:bg-primary group-hover:w-8" />
                
                <div className={`relative z-10 transition-transform duration-300 ${!isLocked && "group-hover:scale-110"}`}>
                    {isLocked ? (
                        <Lock size={16} className="text-white/20" />
                    ) : (
                        <Icon size={24} style={{ color: mission.color || "#ea580c" }} />
                    )}
                </div>
            </div>

            {/* Label */}
            <div className="absolute top-1/2 left-full ml-4 -translate-y-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-4 group-hover:translate-x-0">
                <div className="px-3 py-1.5 rounded-lg bg-black/90 border border-white/15 backdrop-blur-md">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-white">{mission.title}</p>
                    {!isLocked && (
                        <div className="flex items-center gap-1 mt-1">
                            <Zap size={10} className="text-primary" />
                            <span className="text-[9px] font-mono font-bold text-primary">{mission.xpReward || 100} XP</span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}
