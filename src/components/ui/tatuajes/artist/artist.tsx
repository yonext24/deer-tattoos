import { Artist } from '@/lib/types/artist'
import { ArtistDropdown } from './artist-dropdown'
import { ImageWithBlur } from '@/components/tattoo-card/image-with-blur'

export function Artist({ artist }: { artist: Artist | null }) {
  if (artist === null) {
    return null
  }

  return (
    <ArtistDropdown media={artist.medias} name={artist.name} slug={artist.slug}>
      <div className="flex min-w-32 gap-2 cursor-pointer" role="button">
        <ImageWithBlur
          width={40}
          height={40}
          alt={`${artist.name} avatar`}
          src={artist.images.profile.src}
          blurDataURL={artist.images.profile.blured}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <span className="ml-2">{artist.name}</span>
          <span className="ml-2 text-sm text-gray-500">Artista</span>
        </div>
      </div>
    </ArtistDropdown>
  )
}
