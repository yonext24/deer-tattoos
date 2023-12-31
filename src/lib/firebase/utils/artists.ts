import { Artist } from '@/lib/types/artist'
import tatuadores from '../../../../public/tatuadores.json'

export const getAllArtists = async (): Promise<Artist[]> => {
  await new Promise((resolve) => setTimeout(resolve, 700))

  return tatuadores as Artist[]
}

export const getArtistForCard = async (slug: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const artist = tatuadores.find((tatuador: Artist) => tatuador.slug === slug)

  if (!artist) {
    throw new Error(`Artist ${slug} not found`)
  }

  return artist
}
