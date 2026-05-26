import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Search, Moon, Sun } from './icons'
import { Input } from './ui/input'

function Header({ onDictionarySearch }) {
  const [keyword, setKeyword] = useState('')
  const [theme, setTheme] = useState(() => {
    const stored = typeof window !== 'undefined' && localStorage.getItem('kdict-theme')
    if (stored) return stored
    const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  })

  // Apply theme to html element
  const applyTheme = (t) => {
    const root = typeof document !== 'undefined' && document.documentElement
    if (!root) return
    root.classList.remove('light', 'dark')
    root.classList.add(t)
    localStorage.setItem('kdict-theme', t)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    applyTheme(newTheme)
  }

  // Ensure theme is applied on mount
  useEffect(() => {
    applyTheme(theme)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = keyword.trim()
    if (trimmed) {
      onDictionarySearch(trimmed)
      setKeyword('')
    }
  }

  return (
    <header className="flex flex-col gap-4 border-b bg-card px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-md border bg-primary/10 font-bold text-primary">
          K
        </div>
        <div>
          <h2 className="text-lg font-semibold leading-none tracking-normal">K-Dict</h2>
          <p className="mt-1 text-xs text-muted-foreground">Hỗ trợ tự học tiếng Anh</p>
        </div>
      </div>

      <form className="w-full sm:max-w-sm" onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            className="h-10 pl-9 pr-20"
            placeholder="Tra từ điển nhanh..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button type="submit" size="sm" className="absolute right-1 top-1/2 h-8 -translate-y-1/2">
            Tìm
          </Button>
        </div>
      </form>

      {/* Theme toggle button */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="ml-2"
        title="Toggle light/dark mode"
      >
        {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </Button>
    </header>
  )
}

export default Header
