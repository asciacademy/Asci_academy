import React from "react"
import { AsciIcon, AsciIconProps } from "../asci-icon"

export const TrophyIcon = (props: Omit<AsciIconProps, "name">) => <AsciIcon name="trophy" {...props} />
export const AwardIcon = (props: Omit<AsciIconProps, "name">) => <AsciIcon name="certificate" {...props} />
export const StreakIcon = (props: Omit<AsciIconProps, "name">) => <AsciIcon name="streak" tone="gold" {...props} />
export const StarIcon = (props: Omit<AsciIconProps, "name">) => <AsciIcon name="star" tone="gold" {...props} />
