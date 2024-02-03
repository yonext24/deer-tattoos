import { ImageWithBlur } from '@/components/tattoo-card/image-with-blur'
import { Artist } from '@/lib/types/artist'
import { MARCA } from '@/lib/utils/consts'

export function SidebarArtistSection({
  images,
  isSmall,
}: {
  images?: Artist['images']
  isSmall: boolean
}) {
  return (
    <div className="flex flex-col">
      <div
        data-small={isSmall}
        className="after:shadow-[0px_-20px_30px_3px_inset_rgba(0,0,0,.5)] after:absolute after:top-0 after:left-0 after:w-full after:h-full h-[140px] flex items-start
      relative -z-10 opacity-0 md:opacity-100 data-[small=false]:!opacity-100 duration-300 transition-opacity"
      >
        {images?.background ? (
          <div className="relative overflow-hidden">
            <ImageWithBlur
              src={images.background.src}
              blurDataURL={images.background.blured}
              alt="Background image"
              height={120}
              width={300}
            />
          </div>
        ) : (
          <div className="bg-green h-[120px] w-full" />
        )}
      </div>
      <div
        data-small={isSmall}
        className="rounded-full border-2 border-border w-full aspect-square max-w-[140px] max-h-[140px] mx-auto overflow-hidden select-none
      transition-transform duration-300 -translate-y-[calc(140px)] md:-translate-y-1/2 data-[small=false]:!-translate-y-1/2 mb-[-25%]
      "
      >
        {images?.profile ? (
          <div className="relative overflow-hidden">
            <ImageWithBlur
              src={images.profile.src}
              blurDataURL={images.profile.blured}
              alt="Artist image"
              height={140}
              width={140}
            />
          </div>
        ) : (
          <div
            className="bg-green-dark shadow-lg w-full h-full flex items-center justify-center flex-col font-bold font-title text-gold
            text-xs md:text-2xl data-[small=false]:!text-2xl transition-[font-size,line-height] duration-300
          "
            data-small={isSmall}
          >
            <h3>
              {MARCA}
              <br />
              TATTOOS
            </h3>
          </div>
        )}
      </div>
    </div>
  )
}
