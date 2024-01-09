'use client'

import { Artist } from '@/lib/types/artist'
import { useEffect, useState } from 'react'
import { ArtistSkeleton } from './artist-skeleton'
import { getArtistForCard } from '@/lib/backend/utils/artists'
import { ArtistDropdown } from './artist-dropdown'
import Image from 'next/image'

export function Artist({ slug }: { slug: string }) {
  const [status, setStatus] = useState<{
    type: 'loading' | 'error' | 'success'
    message?: string
  }>({ type: 'loading' })
  const [artist, setArtist] = useState<Artist | null>(null)

  useEffect(() => {
    getArtistForCard(slug)
      .then((artist: Artist) => {
        setArtist(artist)
        setStatus({ type: 'success' })
      })
      .catch(() => {
        setStatus({ type: 'error' })
      })
  }, [slug])

  if (status.type === 'loading' || status.type === 'error' || !artist) {
    return <ArtistSkeleton />
  }

  return (
    <ArtistDropdown media={artist.medias} name={artist.name} slug={slug}>
      <div className="flex min-w-32 gap-2 cursor-pointer" role="button">
        {/* <Image
          width={40}
          height={40}
          alt={`${name} avatar`}
          src={'https://i.pravatar.cc/40'}
          className="rounded-full"
        /> */}
        <div className="w-10 h-10 rounded-full bg-green"></div>
        <div className="flex flex-col">
          <span className="ml-2">{artist.name}</span>
          <span className="ml-2 text-sm text-gray-500">Artista</span>
        </div>
      </div>
    </ArtistDropdown>
  )
}
