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

const NONE_VALUE = null

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

  useEffect(() => {
    appFetch('/api/artists')
      .then((artists) => {
        setArtists(artists)
        setStatus('success')
      })
      .catch(() => setStatus('error'))
  }, [])

  const selectedName = useMemo(() => {
    if (status === 'loading') return 'Cargando...'
    if (status === 'error') return 'Algo salió mal'

    if (value === NONE_VALUE) return 'Ninguno'
    const artist = artists.find((artist) => artist.slug === value)
    return artist?.name ?? NONE_VALUE
  }, [value, artists, status])

  return (
    <Select
      defaultValue={NONE_VALUE!}
      value={value ?? NONE_VALUE!}
      onValueChange={onChange}
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
              <SelectItem value={NONE_VALUE!}>Ninguno</SelectItem>

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
