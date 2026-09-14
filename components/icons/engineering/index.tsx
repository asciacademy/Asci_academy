import React from "react"
import { AsciIcon, AsciIconProps } from "../asci-icon"

export const CodeIcon = (props: Omit<AsciIconProps, "name">) => <AsciIcon name="code" {...props} />
export const TerminalIcon = (props: Omit<AsciIconProps, "name">) => <AsciIcon name="terminal" {...props} />
export const DatabaseIcon = (props: Omit<AsciIconProps, "name">) => <AsciIcon name="database" {...props} />
export const ServerIcon = (props: Omit<AsciIconProps, "name">) => <AsciIcon name="server" {...props} />
export const CloudIcon = (props: Omit<AsciIconProps, "name">) => <AsciIcon name="cloud" {...props} />
export const LayersIcon = (props: Omit<AsciIconProps, "name">) => <AsciIcon name="layers" {...props} />
export const NetworkIcon = (props: Omit<AsciIconProps, "name">) => <AsciIcon name="network" {...props} />
export const CpuIcon = (props: Omit<AsciIconProps, "name">) => <AsciIcon name="cpu" {...props} />
export const FolderCodeIcon = (props: Omit<AsciIconProps, "name">) => <AsciIcon name="projects" {...props} />
export const GitBranchIcon = (props: Omit<AsciIconProps, "name">) => <AsciIcon name="git" {...props} />
