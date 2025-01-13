import { Link } from 'next-view-transitions'
import { ImageWithBlur } from './image-with-blur'
import { Tattoo } from '@/lib/types/tattoo'
import { cn } from '@/lib/utils/utils'

export function SmallerTattooCard({
  tattoo,
  preventScale = false,
}: {
  tattoo: Tattoo
  preventScale?: boolean
}) {
  return (
    <Link
      href={`/tatuajes/${tattoo.slug}`}
      role="article"
      key={tattoo.id}
      className={cn(
        'rounded w-[var(--tattoo-width)] h-[var(--tattoo-height)] transition-opacity duration-300 relative overflow-hidden group cursor-pointer',
        'transition-[transform,border-color] duration-300 border border-transparent hover:border-gold',
        !preventScale && 'hover:scale-110 hover:z-10'
      )}
    >
      <ImageWithBlur
        src={tattoo.images.card.src}
        blurDataURL={tattoo.images.card.blured}
        alt="image"
        className="h-full object-cover"
        loading="lazy"
        quality={75}
        height={tattoo.images.card.height}
        width={tattoo.images.card.width}
      />
      <div
        className="absolute top-0 left-0 w-full h-full z-10 opacity-0 flex items-center justify-center duration-300
    bg-green-darker/60 backdrop-blur-md transition-opacity group-hover:opacity-100 font-extralight text-gold"
      >
        <span>Ver más</span>
      </div>
    </Link>
  )
}
