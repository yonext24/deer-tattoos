import { StylizedText } from '@/components/stylized-text/stylized-text'
import { Artist } from '@/lib/types/artist'
import Image from 'next/image'

export function SidebarArtistSection({
  image,
  backgroundImage,
}: {
  image?: string
  backgroundImage?: string
}) {
  return (
    <div className="flex flex-col">
      {backgroundImage ? (
        <Image
          src={backgroundImage}
          alt="Background image"
          height={120}
          width={300}
        />
      ) : (
        <div className="bg-green h-[120px] shadow-[0px_-6px_30px_3px_inset_rgba(0,0,0,.5)]" />
      )}
      <div className="rounded-full border-2 border-gold w-[140px] h-[140px] -mt-[70px] mx-auto overflow-hidden select-none">
        {image ? (
          <Image
            src={image}
            alt="Artist image"
            height={140}
            width={140}
            layout="responsive"
          />
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
