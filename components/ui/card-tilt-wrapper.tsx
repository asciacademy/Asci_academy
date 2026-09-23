"use client"

import React, { useRef, useEffect, useState } from "react"
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
  const innerRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  
  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null)
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window
      setIsTouchDevice(isTouch)
    }
  }, [])

  const handleMouseEnter = () => {
    if (isTouchDevice || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    rectRef.current = {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    }
    if (innerRef.current) {
      innerRef.current.style.transition = "transform 0.08s ease-out"
    }
    if (glareEffect && glareRef.current) {
      glareRef.current.style.opacity = "0.15"
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current || !innerRef.current) return

    if (!rectRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      rectRef.current = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      }
    }

    const rect = rectRef.current
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const tiltX = ((y - centerY) / centerY) * -maxTilt
    const tiltY = ((x - centerX) / centerX) * maxTilt

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current)
    }

    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null
      if (innerRef.current) {
        innerRef.current.style.transform = `rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale(${scale})`
      }
      if (glareEffect && glareRef.current && rect.width > 0 && rect.height > 0) {
        const px = ((x / rect.width) * 100).toFixed(1)
        const py = ((y / rect.height) * 100).toFixed(1)
        glareRef.current.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 60%)`
      }
    })
  }

  const handleMouseLeave = () => {
    if (isTouchDevice) return
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
    rectRef.current = null
    if (innerRef.current) {
      innerRef.current.style.transition = "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)"
      innerRef.current.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)"
    }
    if (glareEffect && glareRef.current) {
      glareRef.current.style.opacity = "0"
    }
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
        ref={innerRef}
        style={{
          transform: "rotateX(0deg) rotateY(0deg) scale(1)",
          transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        className="h-full w-full relative"
      >
        {children}

        {/* Dynamic Specular Glare Layer (desktop only, zero-re-render) */}
        {glareEffect && (
          <div
            ref={glareRef}
            className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden transition-opacity duration-300 z-30"
            style={{
              opacity: 0,
              background: "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 60%)",
            }}
          />
        )}
      </div>
    </div>
  )
}

