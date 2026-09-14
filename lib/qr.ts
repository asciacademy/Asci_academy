import QRCode from "qrcode"

/**
 * Generate a high-contrast data URL QR code matching ASCI's cream & charcoal aesthetic
 */
export async function generateQrDataUrl(url: string): Promise<string> {
  try {
    return await QRCode.toDataURL(url, {
      width: 280,
      margin: 1,
      color: {
        dark: "#141413", // Charcoal ink
        light: "#fdfbf7", // Warm cream paper
      },
      errorCorrectionLevel: "M",
    })
  } catch (err) {
    console.error("Failed to generate QR code data URL:", err)
    return ""
  }
}

/**
 * Generate a standalone SVG string for the QR code
 */
export async function generateQrSvgString(url: string): Promise<string> {
  try {
    return await QRCode.toString(url, {
      type: "svg",
      margin: 1,
      color: {
        dark: "#141413",
        light: "#fdfbf7",
      },
      errorCorrectionLevel: "M",
    })
  } catch (err) {
    console.error("Failed to generate QR code SVG:", err)
    return ""
  }
}
