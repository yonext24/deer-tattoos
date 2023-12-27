import { Separator } from '@/components/shadcn/ui/separator'
import { SidebarArtistSection } from './artist-section/sidebar-artist-section'
import { SidebarMediaSection } from './media-section/sidebar-media-section'

export function Sidebar({ isTatuajes }: { isTatuajes: boolean }) {
  return (
    <aside className="border-r border-border flex flex-col relative">
      <div className="flex flex-col sticky h-[var(--section-min-height)] top-[var(--navbar-height)] left-0">
        <SidebarArtistSection isTatuajes={isTatuajes} />
        <h3 className="text-center text-2xl font-extralight mt-2">
          {isTatuajes ? 'Deer Tattoos' : 'Piercings'}
        </h3>
        <div className="w-full px-6 mt-1">
          <Separator />
        </div>
        <SidebarMediaSection isTatuajes={isTatuajes} />
      </div>
    </aside>
  )
}
