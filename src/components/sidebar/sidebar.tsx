import { Separator } from '@/components/shadcn/ui/separator'
import { SidebarArtistSection } from './artist-section/sidebar-artist-section'
import { SidebarMediaSection } from './media-section/sidebar-media-section'
import { Artist } from '@/lib/types/artist'
import { MARCA } from '@/lib/utils/consts'

export function Sidebar({ artist }: { artist: Artist | null }) {
  return (
    <aside className="border-r border-border flex flex-col relative">
      <div className="flex flex-col sticky h-[var(--section-min-height)] top-[var(--navbar-height)] left-0">
        <SidebarArtistSection images={artist?.images} />
        <h3 className="text-center text-2xl font-extralight mt-2">
          {artist?.name ?? `${MARCA} Tattoos`}
        </h3>
        <div className="w-full px-6 mt-1">
          <Separator />
        </div>
        <SidebarMediaSection medias={artist?.medias} />
      </div>
    </aside>
  )
}
