import { Input } from './ui/input'
import { Search } from './icons'

function SearchBar({ value, onChange, placeholder = 'Tìm kiếm từ vựng, nghĩa tiếng Việt hoặc ghi chú...' }) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        className="pl-9"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
