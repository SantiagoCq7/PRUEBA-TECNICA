const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, options)

  const payload = await response
    .json()
    .catch(() => null)

  if (!response.ok) {
    const message = normalizeApiError(payload, `La solicitud fallo con estado ${response.status}`)
    throw new Error(message)
  }

  return payload
}

function normalizeApiError(payload, fallback) {
  if (!payload || typeof payload !== 'object') {
    return fallback
  }

  if (typeof payload.message === 'string' && !payload.errors) {
    return payload.message
  }

  if (payload.errors && typeof payload.errors === 'object') {
    const messages = []

    Object.entries(payload.errors).forEach(([field, fieldErrors]) => {
      if (Array.isArray(fieldErrors)) {
        fieldErrors.forEach((item) => {
          messages.push(`${field}: ${item}`)
        })
      }
    })

    if (messages.length > 0) {
      return messages.join(' | ')
    }
  }

  return fallback
}
