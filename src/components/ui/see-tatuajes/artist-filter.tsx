'use client'

import { useRouter } from 'next-nprogress-bar'
import { ArtistSelector } from '../add-tatuajes/artist-selector/artist-selector'
import { useSearchParams } from 'next/navigation'
import { createUrl } from '@/lib/utils/createUrl'

export function ArtistFilter() {
  const router = useRouter()
  const params = useSearchParams()
  const artist = params.get('artist')

  const handleChange = (artist: string) => {
    const newParams = new URLSearchParams(params)

    if (artist == null) newParams.delete('artist')
    else newParams.set('artist', artist)

    router.push(createUrl('/admin/tatuajes', newParams))
  }

  return <ArtistSelector value={artist} onChange={handleChange} />
}
