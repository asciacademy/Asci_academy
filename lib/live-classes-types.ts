export type LiveClassStatus = "upcoming" | "live" | "completed" | "cancelled"

export interface LiveClass {
  id: string
  title: string
  description: string
  topic: string
  instructor_name: string
  instructor_role: string
  instructor_avatar?: string
  start_time: string
  duration_minutes: number
  status: LiveClassStatus
  zoom_meeting_url: string
  zoom_meeting_id?: string
  zoom_passcode?: string
  recording_url?: string
  banner_image?: string
  max_attendees?: number
  attendees_count?: number
  tags?: string[]
  is_featured?: boolean
  created_at?: string
  updated_at?: string
}

export interface LiveClassFormData {
  title: string
  description: string
  topic: string
  instructor_name: string
  instructor_role: string
  instructor_avatar?: string
  start_time: string
  duration_minutes: number
  status: LiveClassStatus
  zoom_meeting_url: string
  zoom_meeting_id?: string
  zoom_passcode?: string
  recording_url?: string
  banner_image?: string
  max_attendees?: number
  tags?: string[]
  is_featured?: boolean
}
