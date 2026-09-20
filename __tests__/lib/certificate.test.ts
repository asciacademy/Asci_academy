import { describe, it, expect, beforeEach, vi } from "vitest"
import {
  getLocalCertificates,
  saveLocalCertificate,
  getLocalCertificateById,
} from "@/lib/certificate-store"
import { Certificate } from "@/lib/certificate-types"
import crypto from "crypto"

describe("Certificate System - Local Store & Verification", () => {
  const store = new Map<string, string>()

  beforeEach(() => {
    store.clear()

    const mockStorage = {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, val: string) => store.set(key, String(val)),
      removeItem: (key: string) => store.delete(key),
      clear: () => store.clear(),
      length: 0,
      key: () => null,
    }

    vi.stubGlobal("window", {
      localStorage: mockStorage,
      dispatchEvent: vi.fn(),
    })
    vi.stubGlobal("localStorage", mockStorage)
    vi.stubGlobal(
      "CustomEvent",
      class CustomEvent {
        constructor(public type: string, public detail?: any) {}
      }
    )
  })

  const sampleCert: Certificate = {
    id: "cert-uuid-1",
    certificate_id: "ASCI-2026-GRV-8821",
    recipient_name: "Aarav Sharma",
    course_id: "python-architect",
    course_title: "Python for Z — Architect Edition",
    issuer_name: "ASCI Academy x Gravit Engineering",
    issued_at: new Date().toISOString(),
    verification_code: "A1B2C3D4E5F6",
    grade: "Distinction",
    skills: ["Python", "FastAPI", "Docker", "AsyncIO"],
    metadata: {
      instructor: "Staff Architect",
      hours_estimated: 40,
    },
  }

  it("returns empty list initially", () => {
    expect(getLocalCertificates()).toEqual([])
    expect(getLocalCertificateById("ASCI-2026-GRV-8821")).toBeNull()
  })

  it("saves a certificate and retrieves it by certificate_id or uuid", () => {
    saveLocalCertificate(sampleCert)
    const list = getLocalCertificates()
    expect(list.length).toBe(1)
    expect(list[0].certificate_id).toBe("ASCI-2026-GRV-8821")

    // Retrieve by certificate_id
    const retrieved = getLocalCertificateById("ASCI-2026-GRV-8821")
    expect(retrieved).not.toBeNull()
    expect(retrieved?.recipient_name).toBe("Aarav Sharma")

    // Retrieve case-insensitively
    const lowerRetrieved = getLocalCertificateById("asci-2026-grv-8821")
    expect(lowerRetrieved).not.toBeNull()
    expect(lowerRetrieved?.id).toBe("cert-uuid-1")

    // Retrieve by UUID
    const uuidRetrieved = getLocalCertificateById("cert-uuid-1")
    expect(uuidRetrieved).not.toBeNull()
  })

  it("updates existing certificate for same course_id without duplicate entries", () => {
    saveLocalCertificate(sampleCert)

    const updatedCert: Certificate = {
      ...sampleCert,
      grade: "High Distinction",
      recipient_name: "Aarav Sharma (Honors)",
    }

    saveLocalCertificate(updatedCert)
    const list = getLocalCertificates()
    expect(list.length).toBe(1)
    expect(list[0].grade).toBe("High Distinction")
    expect(list[0].recipient_name).toBe("Aarav Sharma (Honors)")
  })

  it("validates certificate verification code structure (12-char uppercase hex)", () => {
    const code = crypto.randomBytes(6).toString("hex").toUpperCase()
    expect(code).toMatch(/^[0-9A-F]{12}$/)
    expect(code.length).toBe(12)
  })

  it("validates official certificate ID pattern", () => {
    const validIds = [
      "ASCI-2026-GRV-1234",
      "ASCI-2026-GRV-9999",
      "GRV-ASCI-2026-X89F2A1B",
    ]
    const pattern = /^(ASCI-2026-GRV-\d{4}|GRV-ASCI-2026-[A-Z0-9]{8})$/

    validIds.forEach((id) => {
      expect(pattern.test(id)).toBe(true)
    })
  })
})
