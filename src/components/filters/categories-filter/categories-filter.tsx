'use client'

import { createUrl, generateParams } from '@/lib/utils/createUrl'
import { CategoriesFilterMainButton } from './categories-filter-main-button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shadcn/ui/popover'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/shadcn/ui/command'

import { Style } from '@/lib/types/style'
import { useCallback, useEffect, useState } from 'react'
import { getStyles } from '@/lib/firebase/utils/styles'
import { cn } from '@/lib/utils/utils'
import { CheckIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'

export function CategoriesFilter({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const [styles, setStyles] = useState<Style[]>([])

  useEffect(() => {
    getStyles().then(setStyles)
  }, [])

  const router = useRouter()

  const handleSelect = useCallback(
    (value: string) => {
      const params = generateParams(searchParams)
      const selectedValues = params.getAll('style')

      if (selectedValues.includes(value)) {
        params.delete('style', value)
      } else {
        params.append('style', value)
      }

      router.push(createUrl('/tatuajes', params))
    },
    [router, searchParams],
  )

  const params = generateParams(searchParams)
  const selectedValues = params.getAll('style')

  return (
    <Popover>
      <PopoverTrigger asChild>
        <CategoriesFilterMainButton selectedValues={selectedValues} />
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={'Estilos'} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {styles.map((el) => {
                const isSelected = selectedValues.includes(
                  String(el.name).toLocaleLowerCase(),
                )
                return (
                  <CommandItem onSelect={handleSelect} key={el.name}>
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible',
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
  )
}
