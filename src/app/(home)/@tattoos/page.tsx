import { ImageWithBlur } from '@/components/tattoo-card/image-with-blur'
import { Tattoos } from '@/components/ui/home/tattoos/tattoos'
import { getRankedTattoos } from '@/lib/firebase/utils/tattoos'
import { cn } from '@/lib/utils/utils'

export default async function Page() {
  const tattoos = await getRankedTattoos()

  return (
    <Tattoos>
      {tattoos.map((tattoo) => {
        return (
          <article
            key={tattoo.id}
            className={cn(
              'rounded transition-opacity duration-300 relative overflow-hidden group cursor-pointer aspect-square w-full h-full',
            )}
          >
            <ImageWithBlur
              src={tattoo.images.main.src}
              blurDataURL={tattoo.images.main.blured}
              alt="image"
              loading="lazy"
              height={tattoo.images.main.height}
              width={tattoo.images.main.width}
            />
            <div
              className="absolute top-0 left-0 w-full h-full z-10 opacity-0 flex items-center justify-center duration-300
              bg-green-dark/50 text-white backdrop-blur-md transition-opacity group-hover:opacity-100 font-thin"
            >
              <span>Ver más</span>
            </div>
          </article>
        )
      })}
    </Tattoos>
  )
}
