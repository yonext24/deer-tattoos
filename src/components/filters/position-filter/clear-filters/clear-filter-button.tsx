'use client'

import { XIcon } from 'lucide-react'
import { FilterButton } from '../../filter-button'
import { usePathname, useSearchParams } from 'next/navigation'
import { createUrl, generateParams } from '@/lib/utils/createUrl'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

export function ClearFilterButton() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleClick = () => {
    const params = generateParams(searchParams)
    params.delete('position')
    params.delete('style')

    router.push(createUrl(pathname, params))
  }

  const shouldRender = useMemo(() => {
    return Boolean(searchParams.get('position') || searchParams.get('style'))
  }, [searchParams])

  if (!shouldRender) return null

  return (
    <FilterButton Icon={XIcon} onClick={handleClick}>
      Limpiar filtros
    </FilterButton>
  )
}
