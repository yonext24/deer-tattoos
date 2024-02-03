'use client'

import { Separator } from '@/components/shadcn/ui/separator'
import { SidebarArtistSection } from './artist-section/sidebar-artist-section'
import { SidebarMediaSection } from './media-section/sidebar-media-section'
import { Artist } from '@/lib/types/artist'
import { MARCA } from '@/lib/utils/consts'
import { useRef, useState } from 'react'
import { useClickOutside } from '@/hooks/useClickOutside'

export function Sidebar({ artist }: { artist: Artist | null }) {
  const [isSmall, setIsSmall] = useState<boolean>(true)

  const sidebarRef = useRef<HTMLElement>(null)

  const handleClick = () => {
    setIsSmall(false)
  }

  useClickOutside(sidebarRef, () => {
    setIsSmall(true)
  })

  return (
    <aside
      ref={sidebarRef}
      className="flex flex-col transition-[max-width] duration-300 w-[60px] md:w-[300px] relative"
      data-small={isSmall}
      onClick={handleClick}
    >
      <div className="flex flex-col sticky h-[var(--section-min-height)] top-[var(--navbar-height)] left-0 z-30">
        <div
          className="border-r border-border transition-[max-width] duration-300 absolute top-0 left-0 w-[300px] h-full flex flex-col
        max-w-[60px] md:!max-w-[300px] data-[small=false]:max-w-[300px] z-30 bg-black"
          data-small={isSmall}
        >
          <SidebarArtistSection images={artist?.images} isSmall={isSmall} />
          <h3
            className="text-center font-extralight mt-2 opacity-0 text-xs md:text-2xl md:opacity-100 data-[small=false]:!opacity-100 data-[small=false]:!text-2xl duration-300
            transition-[opacity,font-size]"
            data-small={isSmall}
          >
            {artist?.name ?? `${MARCA} Tattoos`}
          </h3>
          <div className="w-full px-6 mt-1">
            <Separator />
          </div>
          <SidebarMediaSection medias={artist?.medias} isSmall={isSmall} />
        </div>
      </div>
    </aside>
  )
}

export function SidebarContainer({ children }: { children: React.ReactNode }) {
  return <div className="w-full grid grid-cols-[auto_1fr]">{children}</div>
}
