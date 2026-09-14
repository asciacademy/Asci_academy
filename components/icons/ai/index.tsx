import React from "react"
import { AsciIcon, AsciIconProps } from "../asci-icon"
import { AI3DIcon, Agents3DIcon, Automation3DIcon } from "../3d"
import { ThreeDIconBaseProps } from "../3d/3d-base"

export const AIIcon2D = (props: Omit<AsciIconProps, "name">) => <AsciIcon name="cpu" {...props} />
export const AI3D = (props: ThreeDIconBaseProps) => <AI3DIcon {...props} />
export const Agent3D = (props: ThreeDIconBaseProps) => <Agents3DIcon {...props} />
export const Automation3D = (props: ThreeDIconBaseProps) => <Automation3DIcon {...props} />
