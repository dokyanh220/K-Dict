import api from '../lib/axios'

export const vocabApi = {
  analyzeText: (text, tags = ['programmer']) => {
    return api.post('/api/analyze', { text, tags }).then(res => res.data)
  },

  getVocab: ({ search = '', type = '', page = 1, limit = 20 } = {}) => {
    const params = new URLSearchParams()

    if (search) params.append('search', search)
    if (type && type !== 'all') params.append('type', type)

    params.append('page', page.toString())
    params.append('limit', limit.toString())

    return api.get(`/api/vocab?${params.toString()}`).then(res => res.data)
  },

  saveVocab: vocabData => {
    return api.post('/api/vocab', vocabData).then(res => res.data)
  },

  deleteVocab: itemId => {
    return api.delete(`/api/vocab/${itemId}`).then(res => res.data)
  }
}