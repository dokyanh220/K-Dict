import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000'
})

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach(promise => {
    if (error) {
      promise.reject(error)
    } else {
      promise.resolve(token)
    }
  })

  failedQueue = []
}

api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (
      error.response?.status !== 401 ||
      originalRequest?._retry ||
      originalRequest?.url === '/api/auth/google' ||
      originalRequest?.url === '/api/auth/refresh'
    ) {
      return Promise.reject(error)
    }

    originalRequest._retry = true

    const refreshToken = localStorage.getItem('refreshToken')

    if (!refreshToken) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
      window.dispatchEvent(new Event('auth:logout'))
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      }).then(newToken => {
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return api(originalRequest)
      })
    }

    isRefreshing = true

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/refresh', {
        refresh_token: refreshToken
      })

      const newAccessToken = response.data.access_token

      localStorage.setItem('accessToken', newAccessToken)
      api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

      processQueue(null, newAccessToken)

      return api(originalRequest)
    } catch (error) {
      processQueue(error, null)

      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      window.dispatchEvent(new Event('auth:logout'))

      return Promise.reject(error)
    } finally {
      isRefreshing = false
    }
  }
)

export default api
