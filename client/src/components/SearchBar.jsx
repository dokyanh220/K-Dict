import { Input } from './ui/input'
import { Search } from './icons'

function SearchBar({ value, onChange, placeholder = 'Tìm kiếm từ vựng, nghĩa tiếng Việt hoặc ghi chú...' }) {
  return (
    <div className="relative group">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
      <Input
        type="text"
        className="pl-10 bg-background/50 focus-glow rounded-lg"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
