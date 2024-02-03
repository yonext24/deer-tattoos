import { MediaButton } from '@/components/media-button/media-button'
import { Artist } from '@/lib/types/artist'

export function SidebarMediaSection({
  medias,
  isSmall,
}: {
  isSmall: boolean
  medias?: Artist['medias']
}) {
  return (
    <div
      className="flex opacity-0 md:opacity-100 data-[small=false]:!opacity-100 transition-opacity duration-300
      mt-auto w-full m-2 gap-2 pointer-events-none md:pointer-events-auto data-[small=false]:!pointer-events-auto"
      data-small={isSmall}
    >
      {medias?.facebook && (
        <MediaButton type="facebook" href={medias.facebook} />
      )}
      {medias?.instagram && (
        <MediaButton type="instagram" href={medias.instagram} />
      )}
      {medias?.website && <MediaButton type="website" href={medias.website} />}
    </div>
  )
}
