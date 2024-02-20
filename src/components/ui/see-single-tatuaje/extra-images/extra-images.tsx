import { Tattoo } from '@/lib/types/tattoo'
import { ExtraImagesCard } from './extra-images-card'
import { cn } from '@/lib/utils/utils'

export function ExtraImages({
  images,
  selectedIndex,
  slug,
}: {
  images: Tattoo['images']['images']
  selectedIndex: number
  slug: string
}) {
  if (images.length <= 1) return null

  return (
    <div className={cn('flex gap-4 flex-wrap justify-end min-h-[96px]')}>
      {images.map((img, i) => {
        return (
          <ExtraImagesCard
            key={img.src}
            {...img}
            isSelected={selectedIndex === i + 1}
            index={i + 1}
            slug={slug}
          />
        )
      })}
    </div>
  )
}
