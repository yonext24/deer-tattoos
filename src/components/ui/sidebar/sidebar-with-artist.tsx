import { getArtistForCard } from '@/lib/backend/utils/artists'
import { Sidebar } from './sidebar'

export async function SidebarWithArtist({ slug }: { slug: string }) {
  const artist = await getArtistForCard(slug).catch(() => null)

  return <Sidebar artist={artist} />
}
