export interface SitePopup {
  id: string
  title: string
  content: string
  type: "info" | "warning" | "success" | "promo"
  is_active: boolean
  is_popup: boolean
  image_url?: string
  badge_text?: string
  cta_text?: string
  cta_url?: string
  secondary_cta_text?: string
  secondary_cta_url?: string
  target_audience?: "all" | "students" | "visitors"
  display_placement?: "all" | "home" | "dashboard" | "courses"
  frequency?: "always" | "once_per_session" | "once_forever"
  priority?: number
  accent_color?: string
  created_at?: string
  updated_at?: string
}

export interface SitePopupFormData {
  title: string
  content: string
  type: "info" | "warning" | "success" | "promo"
  is_active: boolean
  is_popup: boolean
  image_url?: string
  badge_text?: string
  cta_text?: string
  cta_url?: string
  secondary_cta_text?: string
  secondary_cta_url?: string
  target_audience?: "all" | "students" | "visitors"
  display_placement?: "all" | "home" | "dashboard" | "courses"
  frequency?: "always" | "once_per_session" | "once_forever"
  priority?: number
  accent_color?: string
}
