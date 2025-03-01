'use client'

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/shadcn/ui/popover'
import { cn } from '@/lib/utils/utils'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { PositionFilterMainButton } from './position-filter-main-button'
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup,
} from '@/components/shadcn/ui/command'
import { useStateWithLoading } from '@/hooks/useStateWithLoading'
import { usePathname, useSearchParams } from 'next/navigation'
import { useNavigation } from '@/hooks/useNavigation'
import { useRouter } from 'next-nprogress-bar'
import { createUrl, generateParams } from '@/lib/utils/createUrl'
import { CheckIcon } from 'lucide-react'
import Spinner from '@/components/ui/common/spinner'
import { getPositionsClient } from '@/lib/backend/utils/positions'

export default function PositionFilter() {
  const {
    error,
    state: allPositions,
    status,
    updateState,
  } = useStateWithLoading<string[]>([])
  const [navigating, setNavigating] = useState<false | string>(false)

  const searchParams = useSearchParams()
  const currentPositions = searchParams.getAll('position') || []
  const pathname = usePathname()
  const artist = useMemo<string | undefined>(() => {
    const reg = new RegExp('\/tatuador\/(.*)\/tatuajes')
    const res = reg.exec(pathname)
    return res?.[1]
  }, [pathname])

  useNavigation({
    on: {
      routeChanged: () => setNavigating(false),
    },
  })

  useEffect(() => {
    updateState(async () => getPositionsClient(artist))
  }, [])

  const router = useRouter()

  const handleSelect = useCallback(
    (value: string) => {
      const params = generateParams(searchParams)

      const selectedValues = params.getAll('position')

      if (selectedValues.includes(value)) {
        params.delete('position', value)
      } else {
        params.append('position', value)
      }

      setNavigating(value)
      router.push(createUrl(pathname, params))
    },
    [router, searchParams, pathname]
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <PositionFilterMainButton currentPositions={currentPositions} />
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={'Posición'} />
          <CommandList
            className={cn(status === 'loading' && 'overflow-y-hidden')}
          >
            {(() => {
              if (status === 'loading')
                return <Spinner className="mx-auto my-4" />

              if (status === 'error')
                return (
                  <p className="text-red-500">{error || 'Algo salió mal'}</p>
                )
              if (status === 'success' && !allPositions.length)
                return <CommandEmpty>No se encontraron posiciones</CommandEmpty>
              return (
                <CommandGroup>
                  {allPositions.map((position) => {
                    const isCurrentElementLoading =
                      (typeof navigating === 'string' &&
                        navigating.toLowerCase()) ===
                      position.toLocaleLowerCase()
                    const isSelected = currentPositions.includes(position)

                    return (
                      <CommandItem
                        key={position}
                        onSelect={handleSelect}
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
                        <span>{position}</span>
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
