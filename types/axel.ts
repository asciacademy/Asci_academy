export type AxelMode = "hero" | "docked" | "focus"

export type AxelState =
  | "idle"
  | "listening"
  | "thinking"
  | "speaking"
  | "happy"
  | "excited"
  | "encouraging"
  | "celebrating"
  | "confused"
  | "surprised"

export type AxelEmotion =
  | "normal"
  | "happy"
  | "smile"
  | "heart"
  | "shocked"
  | "cute"
  | "cry"
  | "proud"
  | "curious"
  | "excited"
  | "wave"


export interface AxelAction {
  type:
    | "navigate"
    | "open_course"
    | "open_lesson"
    | "open_visualizer"
    | "open_dashboard"
    | "none"
  target?: string
  label?: string
}

export interface AxelPlanItem {
  duration: string
  label: string
  actionTarget?: string
}

export interface AxelPlan {
  title: string
  items: AxelPlanItem[]
}

export interface AxelMessage {
  id: string
  role: "user" | "axel"
  content: string
  timestamp: number
  emotion?: AxelEmotion
  action?: AxelAction
  plan?: AxelPlan
  suggestions?: string[]
}

export interface AxelChatResponse {
  message: string
  emotion: AxelEmotion
  state: AxelState
  action?: AxelAction
  suggestions?: string[]
  plan?: AxelPlan
}

export interface StudentContext {
  pathname: string
  courseSlug?: string
  lessonId?: string
  topic?: string
  activeSection?: string
  streak?: number
  enrolledCount?: number
  currentGoal?: string
  // DSA Problem Solver Context
  problemId?: string
  problemTitle?: string
  simpleMission?: string
  realWorldAnalogy?: string
  starterCode?: string
  userCode?: string
  mode?: 'eli10' | 'socratic-hint' | 'diagnose-error' | 'visual-walkthrough' | 'complexity' | 'general'
  failingTest?: { input: string; expected: string; actual: string }
}
