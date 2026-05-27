import api from '../lib/axios'

export const authApi = {
  loginWithGoogle: idToken => {
    if (!idToken) {
      throw new Error('Missing Google ID token')
    }

    return api.post('/auth/google', {
      id_token: idToken
    }).then(res => res.data)
  }
}