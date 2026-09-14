"use client"

import React from "react"
import { GoogleSignInButton } from "./google-sign-in-button"

export interface GoogleSignInProps {
  variant?: "filled" | "outline"
  label?: string
  fullWidth?: boolean
  className?: string
  onError?: (message: string) => void
}

export function GoogleSignIn(props: GoogleSignInProps) {
  return <GoogleSignInButton {...props} />
}

export default GoogleSignIn
