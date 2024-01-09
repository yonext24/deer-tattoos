/* eslint-disable react-hooks/exhaustive-deps */
import { CategoriesFilterMainButton } from '@/components/filters/categories-filter/categories-filter-main-button'
import { Button } from '@/components/shadcn/ui/button'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/shadcn/ui/command'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/shadcn/ui/popover'
import { getStyles } from '@/lib/backend/utils/styles'
import { Style } from '@/lib/types/style'
import { cn } from '@/lib/utils/utils'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { useCallback, useEffect, useState } from 'react'

export function CategorySelector({
  onChange,
  selectedValues,
}: {
  selectedValues: string[]
  onChange: (value: string[]) => void
}) {
  const [allCategories, setAllCategories] = useState<Style[]>([])

  useEffect(() => {
    getStyles().then(setAllCategories)
  }, [])

  const handleSelect = useCallback(
    (value: string) => {
      const isValueIncluded = selectedValues.includes(value)
      const newSelectedValues = isValueIncluded
        ? selectedValues.filter((el) => el !== value)
        : [...selectedValues, value]

      onChange(newSelectedValues)
    },
    [selectedValues, onChange]
  )

  const handleRemove = (removed: string) => {
    const newValue = selectedValues.filter((el) => el !== removed)
    onChange(newValue)
  }

  return (
    <>
      <div className="flex gap-2 flex-wrap">
        {selectedValues?.length > 0 &&
          selectedValues.map((option) => (
            <Button
              size="sm"
              className="py-1 px-2 h-auto bg-black border border-gold/50 text-white hover:bg-gold/10"
              onClick={() => handleRemove(option)}
              key={option}
            >
              {option}
            </Button>
          ))}
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            size="default"
            className={cn(
              'h-8 transition-colors justify-between px-3',
              selectedValues.length > 0
                ? 'border-primary-foreground'
                : 'border-border-foreground !text-border-foreground'
            )}
          >
            <span>Seleccionar estilos</span>
            <CaretSortIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput autoComplete="false" placeholder={'Estilos'} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {allCategories.map((el) => {
                  const isSelected = selectedValues.includes(
                    String(el.name).toLocaleLowerCase()
                  )

                  return (
                    <CommandItem onSelect={handleSelect} key={el.name}>
                      <div
                        className={cn(
                          'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'opacity-50 [&_svg]:invisible'
                        )}
                      >
                        <CheckIcon className={cn('h-4 w-4')} />
                      </div>
                      <span>{el.name}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}
