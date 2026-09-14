/**
 * Utility to generate a cryptographically random raw nonce
 * and its corresponding SHA-256 hash.
 * 
 * Google Identity Services expects the SHA-256 hashed nonce,
 * while Supabase auth.signInWithIdToken expects the raw nonce
 * to verify against the nonce claim in the decoded Google ID token.
 */
export async function generateNonce(): Promise<{ rawNonce: string; hashedNonce: string }> {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)

  // Convert raw random bytes to hex string
  const rawNonce = Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")

  // Compute SHA-256 digest of the raw nonce
  const encoder = new TextEncoder()
  const data = encoder.encode(rawNonce)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)

  // Convert hash buffer to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashedNonce = hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("")

  return { rawNonce, hashedNonce }
}
