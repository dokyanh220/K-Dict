import { useState } from 'react'
import { Button } from './ui/button'
import { Search, Moon, Sun } from './icons'
import { Input } from './ui/input'
import { useTheme } from './ThemeProvider'

function Header({ onDictionarySearch }) {
  const [keyword, setKeyword] = useState('')
  const { theme, toggleTheme } = useTheme()

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = keyword.trim()
    if (trimmed) {
      onDictionarySearch(trimmed)
      setKeyword('')
    }
  }

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b px-6 py-3 glass-surface"
      style={{ borderColor: 'var(--glass-border)' }}
    >
      {/* Search — command palette style */}
      <form className="flex-1 max-w-xl" onSubmit={handleSubmit}>
        <div className="relative group">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <Input
            type="text"
            className="h-10 pl-10 pr-24 rounded-lg border bg-background/50 focus-glow font-label text-sm placeholder:font-sans"
            placeholder="Tra từ điển nhanh..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            {keyword.trim() && (
              <Button type="submit" size="sm" className="h-7 px-2.5 text-xs rounded-md">
                Tìm
              </Button>
            )}
          </div>
        </div>
      </form>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={theme === 'light' ? 'Chuyển sang chế độ tối' : 'Chuyển sang chế độ sáng'}
          className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
        >
          {theme === 'light' ? (
            <Moon className="h-[18px] w-[18px]" />
          ) : (
            <Sun className="h-[18px] w-[18px]" />
          )}
        </Button>
      </div>
    </header>
  )
}

export default Header
