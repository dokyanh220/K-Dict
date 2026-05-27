import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000'
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.dispatchEvent(new Event('auth:logout'))
    }

    const message =
      error.response?.data?.error?.message ||
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message ||
      'API request failed'

    return Promise.reject(new Error(message))
  }
)

export default api