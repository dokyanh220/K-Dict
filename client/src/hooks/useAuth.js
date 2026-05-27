import { useEffect, useMemo, useState } from 'react'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }

    const handleLogout = () => {
      setToken(null)
      setUser(null)
    }

    window.addEventListener('auth:logout', handleLogout)

    return () => {
      window.removeEventListener('auth:logout', handleLogout)
    }
  }, [])

  const login = authData => {
    localStorage.setItem('token', authData.access_token)
    localStorage.setItem('user', JSON.stringify(authData.user))

    setToken(authData.access_token)
    setUser(authData.user)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    setToken(null)
    setUser(null)
  }

  return useMemo(() => ({
    token,
    user,
    isAuthenticated: !!token,
    login,
    logout
  }), [token, user])
}