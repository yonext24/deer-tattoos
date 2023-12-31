import { Separator } from '@/components/shadcn/ui/separator'
import { SidebarArtistSection } from './artist-section/sidebar-artist-section'
import { SidebarMediaSection } from './media-section/sidebar-media-section'
import { Artist } from '@/lib/types/artist'

export function Sidebar({ artist }: { artist?: Artist }) {
  const artistMedias = artist
    ? Object.entries(artist.media).map(([key, val]) => ({
        text: key,
        href: val,
      }))
    : [
        { text: 'Instagram', href: 'instagram' },
        { text: 'Twitter', href: 'twitter' },
      ]

  return (
    <aside className="border-r border-border flex flex-col relative">
      <div className="flex flex-col sticky h-[var(--section-min-height)] top-[var(--navbar-height)] left-0">
        <SidebarArtistSection
          image={artist?.images?.profile}
          backgroundImage={artist?.images?.profile}
        />
        <h3 className="text-center text-2xl font-extralight mt-2">
          {artist?.name ?? 'Deer Tattoos'}
        </h3>
        <div className="w-full px-6 mt-1">
          <Separator />
        </div>
        <SidebarMediaSection medias={artistMedias} />
      </div>
    </aside>
  )
}
