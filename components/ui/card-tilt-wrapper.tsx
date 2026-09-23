"use client"

import React, { useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface CardTiltWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  maxTilt?: number
  scale?: number
  glareEffect?: boolean
  className?: string
}

export function CardTiltWrapper({
  children,
  maxTilt = 7,
  scale = 1.015,
  glareEffect = true,
  className,
  ...props
}: CardTiltWrapperProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 })

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window
      setIsTouchDevice(isTouch)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const tiltX = ((y - centerY) / centerY) * -maxTilt
    const tiltY = ((x - centerX) / centerX) * maxTilt

    setTilt({ x: tiltX, y: tiltY })

    if (glareEffect) {
      setGlarePos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.15,
      })
    }
  }

  const handleMouseEnter = () => {
    if (isTouchDevice) return
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    if (isTouchDevice) return
    setIsHovered(false)
    setTilt({ x: 0, y: 0 })
    setGlarePos(prev => ({ ...prev, opacity: 0 }))
  }

  // On touch devices: render clean non-3D container with touch-pan-y for buttery smooth native scroll
  if (isTouchDevice) {
    return (
      <div
        ref={cardRef}
        className={cn("relative touch-pan-y w-full", className)}
        {...props}
      >
        <div className="h-full w-full relative">
          {children}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        touchAction: "pan-y",
      }}
      className={cn("relative transition-transform duration-200 ease-out will-change-transform touch-pan-y", className)}
      {...props}
    >
      <div
        style={{
          transform: isHovered
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${scale})`
            : "rotateX(0deg) rotateY(0deg) scale(1)",
          transition: isHovered ? "transform 0.08s ease-out" : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
          transformStyle: "preserve-3d",
        }}
        className="h-full w-full relative"
      >
        {children}

        {/* Dynamic Specular Glare Layer (desktop only) */}
        {glareEffect && (
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden transition-opacity duration-300 z-30"
            style={{
              opacity: glarePos.opacity,
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 60%)`,
            }}
          />
        )}
      </div>
    </div>
  )
}
