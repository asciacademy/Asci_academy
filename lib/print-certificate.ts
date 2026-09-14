/**
 * Triggers isolated, pixel-perfect certificate printing.
 * Suppresses all non-certificate web page elements, sets clean PDF filename,
 * and triggers window.print().
 */
export function printCertificate(certId?: string) {
  if (typeof window === "undefined") return

  const originalTitle = document.title
  if (certId) {
    document.title = `Certificate-${certId}`
  }

  document.body.classList.add("printing-certificate")

  const cleanup = () => {
    document.body.classList.remove("printing-certificate")
    document.title = originalTitle
    window.removeEventListener("afterprint", cleanup)
  }

  window.addEventListener("afterprint", cleanup)

  // Request browser print
  window.print()

  // Fallback cleanup in case afterprint does not fire in some browsers
  setTimeout(() => {
    document.body.classList.remove("printing-certificate")
    document.title = originalTitle
  }, 2000)
}
