import api from '../lib/axios'

export const authApi = {
  loginWithGoogle: idToken => {
    if (!idToken) {
      throw new Error('Missing Google ID token')
    }

    return api.post('/api/auth/google', {
      id_token: idToken
    }).then(res => res.data)
  },

  refreshToken: refreshToken => {
    if (!refreshToken) {
      throw new Error('Missing refresh token')
    }

    return api.post('/api/auth/refresh', {
      refresh_token: refreshToken
    }).then(res => res.data)
  }
}
