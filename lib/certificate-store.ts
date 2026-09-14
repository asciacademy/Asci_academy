"use client"

import { Certificate } from "./certificate-types"

const CERTIFICATES_STORAGE_KEY = "asci_gravit_certificates_v1"

export function getLocalCertificates(): Certificate[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(CERTIFICATES_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (e) {
    console.warn("Failed to load local certificates:", e)
    return []
  }
}

export function saveLocalCertificate(cert: Certificate): void {
  if (typeof window === "undefined") return
  try {
    const current = getLocalCertificates()
    // Avoid duplicates by certificate_id or course_id
    const existingIndex = current.findIndex(
      (c) => c.certificate_id === cert.certificate_id || c.course_id === cert.course_id
    )
    let updated: Certificate[]
    if (existingIndex >= 0) {
      updated = [...current]
      updated[existingIndex] = cert
    } else {
      updated = [cert, ...current]
    }
    localStorage.setItem(CERTIFICATES_STORAGE_KEY, JSON.stringify(updated))
    window.dispatchEvent(new CustomEvent("asci-certificates-update", { detail: updated }))
  } catch (e) {
    console.warn("Failed to save local certificate:", e)
  }
}

export function getLocalCertificateById(certId: string): Certificate | null {
  const all = getLocalCertificates()
  return (
    all.find(
      (c) =>
        c.certificate_id.toLowerCase() === certId.toLowerCase() ||
        c.id.toLowerCase() === certId.toLowerCase()
    ) || null
  )
}
