import { ImageWithBlur } from '@/components/tattoo-card/image-with-blur'
import { Artist } from '@/lib/types/artist'
import { AdminArtistCardDropdown } from './admin-artist-card-dropdown'
import { Separator } from '@/components/shadcn/ui/separator'
import { Badge } from '@/components/shadcn/ui/badge'

export function AdminArtistCard(artist: Artist) {
  const { name, slug, styles, images } = artist

  const stylesToShow = styles.slice(0, 4)
  const restOfStyles = styles.length - stylesToShow.length

  return (
    <article className="border border-border rounded-lg h-[220px] flex flex-col p-4">
      <header className="flex items-center justify-start gap-2">
        <ImageWithBlur
          withSkeleton
          src={images.profile.src}
          blurDataURL={images.profile.blured}
          alt="Imágen de artista"
          height={48}
          width={48}
          pictureClassName="rounded-full h-12 w-12"
        />
        <span>{name}</span>
        <span className="text-gold text-sm ml-4">
          {/* {amountOfTattoos} Tatuajes */}
        </span>
        <div className="ml-auto">
          <AdminArtistCardDropdown {...artist} />
        </div>
      </header>
      <div className="flex flex-1"></div>

      <footer className="h-[33px] overflow-hidden">
        <Separator className="my-1" />
        <div className="flex">
          <div className="flex gap-1 flex-wrap items-start">
            {stylesToShow.map((style) => (
              <Badge key={style} variant="outline">
                {style}
              </Badge>
            ))}
          </div>
          {restOfStyles > 0 && (
            <Badge
              variant="outline"
              title={styles.join(', ')}
              className="ml-auto"
            >
              +{restOfStyles}
            </Badge>
          )}
        </div>
      </footer>
    </article>
  )
}
