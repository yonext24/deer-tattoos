import { Artists } from '@/components/ui/home/artists'
import { getAllArtists } from '@/lib/firebase/utils/artists'

export default async function Page() {
  const artists = await getAllArtists()

  return <Artists artists={artists} />
}
