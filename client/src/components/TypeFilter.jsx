import { cn } from '../lib/utils'

function TypeFilter({ selectedType, onTypeChange }) {
  const types = [
    { value: 'all', label: 'Tất cả', className: '' },
    { value: 'word', label: 'Từ', className: 'badge-word' },
    { value: 'phrase', label: 'Cụm từ', className: 'badge-phrase' },
    { value: 'sentence', label: 'Câu', className: 'badge-sentence' },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {types.map((type) => {
        const isActive = selectedType === type.value
        return (
          <button
            key={type.value}
            type="button"
            onClick={() => onTypeChange(type.value)}
            className={cn(
              'inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-label font-medium tracking-wide',
              'transition-all duration-200 ease-out-expo',
              isActive
                ? type.value === 'all'
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : cn(type.className, 'border-current shadow-sm')
                : 'bg-background text-muted-foreground border-border hover:bg-accent hover:text-foreground'
            )}
          >
            {type.label}
          </button>
        )
      })}
    </div>
  )
}

export default TypeFilter
