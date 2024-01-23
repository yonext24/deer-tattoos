import { Artist } from '@/lib/types/artist'
import { prisma } from '@backend/prisma'
import { cache } from 'react'

export const getAllArtists = cache(async (): Promise<Artist[]> => {
  const artists = await prisma.artist.findMany({
    include: {
      tattoos: false,
    },
  })

  return artists as Artist[]
})

export const getArtistForCard = cache(async (slug: string) => {
  const artist = await prisma.artist.findFirst({
    where: {
      slug,
    },
  })

  return artist as Artist
})
