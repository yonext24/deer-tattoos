import { Main } from '@/components/ui/common/main'
import { Back } from '@/components/ui/common/back'
import { ImageWithBlur } from '@/components/tattoo-card/image-with-blur'
import { Skeleton } from '@/components/shadcn/ui/skeleton'
import { notFound } from 'next/navigation'
import { Artist } from '@/components/ui/tatuajes/artist/artist'
import { getArtistForCard } from '@/lib/backend/utils/artists'
import { tattooController } from '@backend/controllers/tattoo-controller'
import { getTattooBySlug, getTattoos } from '@/lib/backend/utils/tattoos'
import { Metadata } from 'next'

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> => {
  const tattoo = await getTattooBySlug(params.slug)

  if (!tattoo) return {}

  return {
    title: tattoo.title,
    description: `Tatuaje de <MARCA> hecho por ${tattoo.artistSlug}${
      tattoo.styles.length > 0
        ? ` manejando los estilos ${tattoo.styles.join(', ')}`
        : ''
    }`,
    openGraph: {
      images: [
        {
          url: tattoo.images.card.src,
          width: tattoo.images.main.width,
          height: tattoo.images.main.height,
          alt: tattoo.title,
        },
      ],
    },
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const tattoo = await getTattooBySlug(params.slug)
  if (!tattoo) {
    return notFound()
  }
  const artist = await getArtistForCard(tattoo.artistSlug).catch(() => null)
  tattooController.addRanking({ slug: params.slug })

  return (
    <>
      <div className="w-full flex justify-between items-start">
        <Back />
        <Artist artist={artist} />
      </div>
      <ImageWithBlur
        pictureClassName="w-full"
        alt="Image"
        src={tattoo.images.main.src}
        height={tattoo.images.main.height}
        width={tattoo.images.main.width}
        blurDataURL={tattoo.images.main.blured}
        className="w-full max-w-auto max-h-auto"
      />
    </>
  )
}
