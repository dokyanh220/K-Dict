import { Search } from './icons'

function SearchBar({ value, onChange, placeholder = 'Tìm kiếm từ vựng, nghĩa tiếng Việt hoặc ghi chú...' }) {
  return (
    <div className="relative group flex items-center bg-background/40 hover:bg-background/60 border border-primary/20 hover:border-primary/40 transition-all duration-300 rounded-full shadow-inner focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 w-full">
      <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-primary/75 group-focus-within:text-primary transition-colors" />
      <input
        type="text"
        className="w-full h-10 bg-transparent border-none outline-none focus:outline-none focus:ring-0 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground font-sans"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
