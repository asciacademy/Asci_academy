"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Bookmark, Heart, Check } from "lucide-react"
import { useWishlist, WishlistItem } from "@/lib/user-learning-store"

interface WishlistButtonProps {
  course: {
    id?: string
    courseSlug?: string
    slug?: string
    title: string
    category?: string
    level?: string
    duration?: string
    thumbnail?: string
    is_premium?: boolean
    desc?: string
    playerUrl?: string
    href?: string
  }
  variant?: "icon" | "full" | "minimal"
  className?: string
  iconType?: "bookmark" | "heart"
}

export function WishlistButton({
  course,
  variant = "icon",
  className = "",
  iconType = "bookmark",
}: WishlistButtonProps) {
  const { isSaved, toggle } = useWishlist()
  const resolvedSlug = course.courseSlug || course.slug || course.id || ""
  const saved = isSaved(resolvedSlug)
  const [animating, setAnimating] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setAnimating(true)
    setTimeout(() => setAnimating(false), 500)
    toggle({
      courseSlug: resolvedSlug,
      title: course.title,
      category: course.category,
      level: course.level,
      duration: course.duration,
      thumbnail: course.thumbnail,
      is_premium: course.is_premium,
      desc: course.desc,
      playerUrl: course.playerUrl || course.href,
    })
  }

  const IconComponent = iconType === "bookmark" ? Bookmark : Heart

  if (variant === "full") {
    return (
      <motion.button
        type="button"
        whileTap={{ scale: 0.94 }}
        onClick={handleClick}
        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer select-none ${
          saved
            ? "bg-primary/10 text-primary border-primary/40 shadow-2xs hover:bg-primary/15"
            : "bg-secondary/70 hover:bg-secondary text-muted-foreground hover:text-foreground border-border"
        } ${className}`}
        title={saved ? "Remove from Wishlist" : "Save to Wishlist"}
      >
        <motion.span
          animate={animating ? { scale: [1, 1.35, 1], rotate: [0, -10, 10, 0] } : {}}
          transition={{ duration: 0.35 }}
          className="flex items-center justify-center"
        >
          <IconComponent
            className={`w-3.5 h-3.5 transition-colors ${
              saved ? "fill-primary text-primary" : "text-muted-foreground group-hover:text-foreground"
            }`}
          />
        </motion.span>
        <span>{saved ? "Saved in Wishlist" : "Save to Wishlist"}</span>
      </motion.button>
    )
  }

  if (variant === "minimal") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex items-center gap-1.5 text-xs transition-colors cursor-pointer ${
          saved ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
        } ${className}`}
      >
        <IconComponent className={`w-3.5 h-3.5 ${saved ? "fill-primary" : ""}`} />
        <span>{saved ? "Saved" : "Save"}</span>
      </button>
    )
  }

  // Default: icon-only button for card corners
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.88 }}
      onClick={handleClick}
      aria-label={saved ? `Remove ${course.title} from wishlist` : `Save ${course.title} to wishlist`}
      title={saved ? "Saved in Wishlist (Click to remove)" : "Save to Wishlist"}
      className={`relative flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-200 cursor-pointer shadow-xs ${
        saved
          ? "bg-card border-primary/50 text-primary shadow-xs"
          : "bg-black/50 hover:bg-black/75 border-white/20 text-white/90 hover:text-white hover:border-white/40"
      } ${className}`}
    >
      <motion.span
        animate={animating ? { scale: [1, 1.4, 1] } : {}}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center"
      >
        <IconComponent
          className={`h-3.5 w-3.5 transition-all ${
            saved ? "fill-primary text-primary stroke-[2]" : "text-white stroke-[1.8]"
          }`}
        />
      </motion.span>
    </motion.button>
  )
}
