const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

function findRecords(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    for (const key of ['results', 'data', 'items']) {
      const value = payload[key]
      if (Array.isArray(value)) {
        return value
      }
      if (value && typeof value === 'object') {
        const records = findRecords(value)
        if (records) {
          return records
        }
      }
    }
  }

  return null
}

export async function fetchCollection(path, signal) {
  const response = await fetch(`${API_BASE_URL}${path}`, { signal })
  const payload = await response.json()

  if (!response.ok) {
    const message =
      payload && typeof payload === 'object'
        ? payload.message || payload.error
        : null
    throw new Error(message || `Request failed with status ${response.status}.`)
  }

  const records = findRecords(payload)
  if (!records) {
    throw new Error('The API response did not contain a list of records.')
  }

  return records
}
