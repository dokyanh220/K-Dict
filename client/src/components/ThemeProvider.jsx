/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'
  const stored = localStorage.getItem('kdict-theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyThemeToDOM(theme) {
  const root = document.documentElement
  // Add transitioning class for smooth theme change
  root.classList.add('transitioning')
  root.classList.remove('light', 'dark')
  root.classList.add(theme)
  localStorage.setItem('kdict-theme', theme)
  // Remove transitioning class after animation
  setTimeout(() => root.classList.remove('transitioning'), 350)
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    applyThemeToDOM(theme)
  }, [theme])

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      // Only follow system if user hasn't explicitly chosen
      const stored = localStorage.getItem('kdict-theme')
      if (!stored) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
