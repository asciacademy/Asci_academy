export interface Certificate {
  id: string
  certificate_id: string // e.g. "GRV-ASCI-2026-X89F2A1B"
  user_id?: string
  recipient_name: string
  recipient_email?: string
  course_id: string
  course_title: string
  course_slug?: string
  issuer_name: string
  issued_at: string
  verification_code: string
  grade?: string
  skills?: string[]
  metadata?: {
    instructor?: string
    track_code?: string
    hours_estimated?: number
    verification_hash?: string
    [key: string]: any
  }
  created_at?: string
}

export interface CertificateGenerationPayload {
  courseId: string
  courseTitle: string
  courseSlug?: string
  recipientName?: string
  grade?: string
  skills?: string[]
  progressPercent?: number
  isCompleted?: boolean
}

