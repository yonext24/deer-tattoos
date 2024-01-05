import { Button } from '@/components/shadcn/ui/button'
import { FormControl } from '@/components/shadcn/ui/form'
import { Input } from '@/components/shadcn/ui/input'
import { cn } from '@/lib/utils/utils'
import { useState } from 'react'

export function TagsSelector({
  selectedValues,
  onChange,
  defaultValue = '',
}: {
  selectedValues: string[]
  onChange: (values: string[]) => void
  defaultValue?: string
}) {
  const [value, setValue] = useState<string>(defaultValue)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (value === '') return
      const isValueIncluded = selectedValues.includes(value)
      if (isValueIncluded) return

      const newSelectedValues = [...selectedValues, value]

      onChange(newSelectedValues)
      setValue('')
    }
  }

  const handleDelete = (removed: string) => {
    const newValue = selectedValues.filter((el) => el !== removed)
    onChange(newValue)
  }

  return (
    <div className="flex flex-col gap-2 items-start">
      <div className="flex gap-2 flex-wrap">
        {selectedValues.map((value) => (
          <Button
            onClick={() => handleDelete(value)}
            key={value}
            variant="outline"
            size="sm"
            className="px-2 h-auto py-1 bg-primary-foreground"
          >
            {value}
          </Button>
        ))}
      </div>

      <FormControl>
        <Input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          onKeyDown={handleKeyDown}
          className={cn(
            'w-auto py-1',
            selectedValues.length > 0 && 'border-border',
          )}
          placeholder="Ingresa los estilos"
        />
      </FormControl>
    </div>
  )
}
