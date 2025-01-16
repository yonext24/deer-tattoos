/* eslint-disable react-hooks/exhaustive-deps */
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
import { getStylesClient } from '@/lib/backend/utils/styles'
import { cn } from '@/lib/utils/utils'
import { CheckIcon } from '@radix-ui/react-icons'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next-nprogress-bar'
import { useNavigation } from '@/hooks/useNavigation'
import Spinner from '@/components/ui/common/spinner'
import { useStateWithLoading } from '@/hooks/useStateWithLoading'

export function CategoriesFilter() {
  const {
    state: styles,
    updateState,
    status,
    error,
  } = useStateWithLoading<Style[]>([])
  const [navigating, setNavigating] = useState<false | string>(false)

  const searchParams = useSearchParams()

  useNavigation({
    on: {
      routeChanged: () => {
        setNavigating(false)
      },
    },
  })

  useEffect(() => {
    updateState(async () =>
      getStylesClient().then((styles) =>
        styles.sort((a, b) => {
          if (a.name < b.name) {
            return -1
          }
          if (a.name > b.name) {
            return 1
          }
          return 0
        })
      )
    )
  }, [])

  const router = useRouter()
  const pathname = usePathname()

  const handleSelect = useCallback(
    (value: string) => {
      const params = generateParams(searchParams)

      const selectedValues = params.getAll('style')

      if (selectedValues.includes(value)) {
        params.delete('style', value)
      } else {
        params.append('style', value)
      }

      setNavigating(value)
      router.push(createUrl(pathname, params))
    },
    [router, searchParams, pathname]
  )

  const params = generateParams(searchParams)
  const selectedValues = params.getAll('style')

  console.log({ status })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <CategoriesFilterMainButton selectedValues={selectedValues} />
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={'Estilos'} />
          <CommandList
            className={cn(status === 'loading' && 'overflow-y-hidden')}
          >
            {(() => {
              if (status === 'loading')
                return <Spinner className="mx-auto my-4" />
              if (status === 'error')
                return (
                  <p className="text-red-500">{error ?? 'Algo salió mal'}</p>
                )
              if (status === 'success' && !styles.length)
                return <CommandEmpty>No se encontraron estilos</CommandEmpty>
              return (
                <CommandGroup>
                  {styles.map((el) => {
                    const isSelected = selectedValues.includes(
                      String(el.name).toLocaleLowerCase()
                    )
                    const isCurrentElementLoading =
                      (typeof navigating === 'string' &&
                        navigating.toLowerCase()) ===
                      el.name.toLocaleLowerCase()
                    return (
                      <CommandItem
                        onSelect={handleSelect}
                        key={el.name}
                        className="py-3 sm:py-1.5"
                      >
                        <div
                          data-loading={isCurrentElementLoading}
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
                        {isCurrentElementLoading && (
                          <Spinner className="border-2 ml-auto text-white" />
                        )}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              )
            })()}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
