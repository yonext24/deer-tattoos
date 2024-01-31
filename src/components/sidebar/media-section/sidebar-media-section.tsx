import { MediaButton } from '@/components/media-button/media-button'
import { Artist } from '@/lib/types/artist'

export async function SidebarMediaSection({
  medias,
}: {
  medias?: Artist['medias']
}) {
  return (
    <div className="flex mt-auto w-full m-2 gap-2">
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
