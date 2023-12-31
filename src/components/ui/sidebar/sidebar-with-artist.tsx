import { getArtistForCard } from '@/lib/firebase/utils/artists'
import { Sidebar } from './sidebar'
import { cache } from 'react'

const localGetArtistForCard = cache(getArtistForCard)

export async function SidebarWithArtist({ slug }: { slug: string }) {
  const artist = await localGetArtistForCard(slug)

  return <Sidebar artist={artist} />
}
