'use client'

import { FormControl } from '@/components/shadcn/ui/form'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectLabel,
} from '@/components/shadcn/ui/select'
import { Artist } from '@/lib/types/artist'
import { appFetch } from '@/lib/utils/appFetch'
import { SelectGroup } from '@radix-ui/react-select'
import { useEffect, useMemo, useState } from 'react'

export function ArtistSelector({
  value,
  onChange,
}: {
  value: string
  onChange: any
}) {
  const [artists, setArtists] = useState<Artist[]>([])
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>(
    'loading',
  )

  useEffect(() => {
    appFetch('/api/artists')
      .then((artists) => {
        setArtists(artists)
        setStatus('success')
      })
      .catch(() => setStatus('error'))
  }, [])

  const selectedName = useMemo(() => {
    if (!value || artists.length === 0) return null
    const artist = artists.find((artist) => artist.slug === value)
    return artist?.name ?? null
  }, [value, artists])

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <FormControl>
          <SelectValue placeholder="Selecciona un artista" asChild>
            <span>{selectedName}</span>
          </SelectValue>
        </FormControl>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>
            {(() => {
              if (status === 'loading') return 'Cargando...'
              if (status === 'error')
                return 'Algo salió mal, intenta recargar la página'
              if (status === 'success') return 'Selecciona un artista'
            })()}
          </SelectLabel>
          {artists.map((artist) => {
            return (
              <SelectItem key={artist.slug} value={artist.slug}>
                {artist.name}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
