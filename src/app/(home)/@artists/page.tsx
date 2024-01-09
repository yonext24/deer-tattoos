import { Artists } from '@/components/ui/home/artists'
import { getAllArtists } from '@/lib/backend/utils/artists'

export const revalidate = 60

export default async function Page() {
  const artists = await getAllArtists()

  return <Artists artists={artists} />
}
