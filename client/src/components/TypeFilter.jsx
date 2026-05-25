import { Button } from './ui/button'

function TypeFilter({ selectedType, onTypeChange }) {
  const types = [
    { value: 'all', label: 'Tất cả' },
    { value: 'word', label: 'Từ' },
    { value: 'phrase', label: 'Cụm từ' },
    { value: 'sentence', label: 'Câu' }
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {types.map((type) => (
        <Button
          key={type.value}
          type="button"
          size="sm"
          variant={selectedType === type.value ? 'default' : 'outline'}
          onClick={() => onTypeChange(type.value)}
        >
          {type.label}
        </Button>
      ))}
    </div>
  )
}

export default TypeFilter
