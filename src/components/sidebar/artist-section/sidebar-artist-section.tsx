import { StylizedText } from '@/components/stylized-text/stylized-text'
import { ImageWithBlur } from '@/components/tattoo-card/image-with-blur'
import { Artist } from '@/lib/types/artist'

export function SidebarArtistSection({
  images,
}: {
  images?: Artist['images']
}) {
  return (
    <div className="flex flex-col">
      <div className="after:shadow-[0px_-20px_30px_3px_inset_rgba(0,0,0,.5)] after:absolute after:top-0 after:left-0 after:w-full after:h-full relative -z-10">
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
          <div className="bg-green h-[120px]" />
        )}
      </div>
      <div className="rounded-full border-2 border-gold w-[140px] h-[140px] -mt-[70px] mx-auto overflow-hidden select-none">
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
          <div className="bg-green-dark shadow-lg w-full h-full flex items-center justify-center flex-col font-bold font-title text-gold text-2xl">
            <StylizedText text="DEER" size={28} />
            <StylizedText text="TATTOOS" size={25} />
          </div>
        )}
      </div>
    </div>
  )
}
