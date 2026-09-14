export interface GoogleCredentialResponse {
  credential?: string
  select_by?: string
  clientId?: string
}

export interface PromptMomentNotification {
  isNotDisplayed: () => boolean
  isSkippedMoment: () => boolean
  isDismissedMoment: () => boolean
  getNotDisplayedReason: () =>
    | "browser_not_supported"
    | "invalid_client"
    | "missing_client_id"
    | "opt_out_or_no_session"
    | "secure_http_required"
    | "suppressed_by_user"
    | "unregistered_origin"
    | "unknown_reason"
  getSkippedReason: () =>
    | "auto_cancel"
    | "user_cancel"
    | "tap_outside"
    | "issuing_token"
  getDismissedReason: () =>
    | "credential_returned"
    | "cancel"
    | "dismissed_by_user"
}

export interface IdConfiguration {
  client_id: string
  callback: (response: GoogleCredentialResponse) => void | Promise<void>
  nonce?: string
  auto_select?: boolean
  cancel_on_tap_outside?: boolean
  context?: "signin" | "signup" | "use"
  use_fedcm_for_prompt?: boolean
  itp_support?: boolean
  prompt_parent_id?: string
}

export interface GoogleAccountsId {
  initialize: (config: IdConfiguration) => void
  prompt: (momentListener?: (notification: PromptMomentNotification) => void) => void
  renderButton: (parent: HTMLElement, options: Record<string, any>) => void
  cancel: () => void
}

declare global {
  interface Window {
    google?: {
      accounts?: {
        id?: GoogleAccountsId
      }
    }
  }
}
