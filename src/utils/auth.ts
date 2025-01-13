export function generateNonce() {
  const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))))
  return nonce
}

export function hashNonce(nonce: string) {
  const encoder = new TextEncoder()
  const encodedNonce = encoder.encode(nonce)
  return crypto.subtle.digest('SHA-256', encodedNonce).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  })
} 