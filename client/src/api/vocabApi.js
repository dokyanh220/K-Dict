const BASE_URL = 'http://127.0.0.1:8000'

const request = async (path, options = {}) => {
  const url = `${BASE_URL}${path}`
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  }

  const response = await fetch(url, {
    ...options,
    headers
  })

  if (!response.ok) {
    let errorDetail = 'API Request failed'
    try {
      const errJson = await response.json()
      errorDetail =
        errJson?.error?.message ||
        errJson?.detail ||
        errJson?.message ||
        errorDetail
    } catch {
      // ignore
    }
    throw new Error(errorDetail)
  }

  // Handle empty or 204 responses
  if (response.status === 204) {
    return null
  }

  return response.json()
}

export const vocabApi = {
  analyzeText: (text) => {
    return request('/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ text })
    })
  },

  getVocab: ({ search = '', type = '', page = 1, limit = 20 } = {}) => {
    const params = new URLSearchParams()
    if (search) params.append('search', search)
    if (type && type !== 'all') params.append('type', type)
    params.append('page', page.toString())
    params.append('limit', limit.toString())

    return request(`/api/vocab?${params.toString()}`)
  },

  saveVocab: (vocabData) => {
    return request('/api/vocab', {
      method: 'POST',
      body: JSON.stringify(vocabData)
    })
  },

  deleteVocab: (itemId) => {
    return request(`/api/vocab/${itemId}`, {
      method: 'DELETE'
    })
  }
}
