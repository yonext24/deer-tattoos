'use client'

import { useRouter } from 'next-nprogress-bar'
import { ArtistSelector } from '../add-tatuajes/artist-selector/artist-selector'
import { useSearchParams } from 'next/navigation'
import { createUrl } from '@/lib/utils/createUrl'

export function ArtistFilter() {
  const router = useRouter()
  const params = useSearchParams()
  const artist = params.get('artist') ?? 'all'

  const handleChange = (artist: string) => {
    // console.log({ artist })
    const newParams = new URLSearchParams(params)

    if (artist == 'all') newParams.delete('artist')
    else newParams.set('artist', artist)

    router.push(createUrl('/admin/tatuajes', newParams))
  }

  return (
    <ArtistSelector
      value={artist === 'null' ? null : artist}
      onChange={handleChange}
      withAll
    />
  )
}
