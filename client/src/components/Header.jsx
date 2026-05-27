import { useState } from 'react'
import { Search, Moon, Sun } from './icons'
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
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-primary/10 px-6 py-3.5 bg-sidebar/80 backdrop-blur-md shadow-sm">
      {/* Search — command palette style */}
      <form className="flex-1 max-w-md" onSubmit={handleSubmit}>
        <div className="relative group flex items-center bg-background/40 hover:bg-background/60 border border-primary/20 hover:border-primary/40 transition-all duration-300 rounded-full shadow-inner focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
          <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-primary/75 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            className="w-full h-10 bg-transparent border-none outline-none focus:outline-none focus:ring-0 pl-10 pr-16 text-sm text-foreground placeholder:text-muted-foreground font-sans"
            placeholder="Tra từ điển nhanh..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className="absolute right-1.5">
            {keyword.trim() && (
              <button
                type="submit"
                className="h-7 px-3 text-xs bg-primary text-primary-foreground hover:bg-primary/95 rounded-full transition-all duration-200 shadow-sm font-medium"
              >
                Tìm
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Dashboard Status Pill */}
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-label font-medium tracking-wider text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          DASHBOARD
        </div>

        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'light' ? 'Chuyển sang chế độ tối' : 'Chuyển sang chế độ sáng'}
          className="h-9 w-9 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all duration-300 flex items-center justify-center"
        >
          {theme === 'light' ? (
            <Moon className="h-[18px] w-[18px] text-primary" />
          ) : (
            <Sun className="h-[18px] w-[18px] text-primary" />
          )}
        </button>
      </div>
    </header>
  )
}

export default Header
