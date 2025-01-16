import { Artist } from '@/lib/types/artist'
import { TAGS } from '@/lib/utils/consts'
import { prisma } from '@backend/prisma'
import { unstable_cache } from 'next/cache'

export const getAllArtists = unstable_cache(async (): Promise<Artist[]> => {
  const artists = await prisma.artist.findMany({
    include: {
      tattoos: false,
    },
  })

  return artists as Artist[]
}, ['artist', 'all'], { tags: [TAGS.artists] })

export const getArtistForCard = unstable_cache(async (slug: string) => {
  const artist = await prisma.artist.findFirst({
    where: {
      slug,
    },
  })

  return artist as Artist
}, ['artist', 'card'], { tags: [TAGS.artists] })
