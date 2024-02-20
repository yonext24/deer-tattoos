'use client'

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

// Fuck it, shadcn doesn't let me use null
const NONE_VALUE = '1892371987381283901829381290381029839012830120913'

export function ArtistSelector({
  value,
  onChange,
}: {
  value: string | null
  onChange: any
}) {
  const [artists, setArtists] = useState<Artist[]>([])
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>(
    'loading'
  )

  const handleChange = (val: string) => {
    const value = val === NONE_VALUE ? null : val
    onChange(value)
  }

  useEffect(() => {
    appFetch('/api/artists')
      .then((artists) => {
        setArtists(artists)
        setStatus('success')
      })
      .catch(() => setStatus('error'))
  }, [])

  console.log({ value })

  const selectedName = useMemo(() => {
    if (status === 'loading') return 'Cargando...'
    if (status === 'error') return 'Algo salió mal'

    if (value === NONE_VALUE || value === null || value === undefined)
      return 'Ninguno'
    const artist = artists.find((artist) => artist.slug === value)
    return artist?.name ?? NONE_VALUE
  }, [value, artists, status])

  return (
    <Select
      defaultValue={NONE_VALUE}
      value={value ?? NONE_VALUE}
      onValueChange={handleChange}
    >
      <SelectTrigger>
        <SelectValue placeholder="Selecciona un artista" asChild>
          <span>{selectedName}</span>
        </SelectValue>
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
          {status === 'success' && (
            <>
              <SelectItem value={NONE_VALUE}>Ninguno</SelectItem>

              {artists.map((artist) => {
                return (
                  <SelectItem key={artist.slug} value={artist.slug}>
                    {artist.name}
                  </SelectItem>
                )
              })}
            </>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
