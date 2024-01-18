import { Main } from '@/components/ui/common/main'
import { Back } from '@/components/ui/common/back'
import { ImageWithBlur } from '@/components/tattoo-card/image-with-blur'
import { Skeleton } from '@/components/shadcn/ui/skeleton'
import { notFound } from 'next/navigation'
import { Artist } from '@/components/ui/tatuajes/artist/artist'
import {
  filterAndPaginateTattoos,
  getTattooBySlug,
} from '@backend/utils/tattoos-utils'
import { getArtistForCard } from '@/lib/backend/utils/artists'
import { TattoosFooter } from '@/components/ui/footers/tattoos-footer'

export const dynamicParams = true

export const generateStaticParams = async () => {
  const { data } = await filterAndPaginateTattoos({}, { page: 1, size: 1000 })
  return data.map((tattoo) => ({ params: { slug: tattoo.slug } }))
}

const getTattoo = async (slug: string) => {
  const tattoo = await getTattooBySlug(slug).catch(() => null)
  if (!tattoo) {
    notFound()
  }
  return tattoo
}

export default async function Page({ params }: { params: { slug: string } }) {
  const tattoo = await getTattoo(params.slug)
  const artist = await getArtistForCard(tattoo.artistSlug).catch(() => null)

  return (
    <Main className="ml-auto flex flex-col gap-4 p-4 w-[700px]">
      <div className="w-full flex justify-between items-start">
        <Back />
        <Artist artist={artist} />
      </div>
      <picture className="relative overflow-hidden w-full ">
        <ImageWithBlur
          alt="Image"
          src={tattoo.images.main.src}
          height={tattoo.images.main.height}
          width={tattoo.images.main.width}
          blurDataURL={tattoo.images.main.blured}
          className="w-full max-w-auto max-h-auto"
        />
      </picture>
      <h2 className="font-extralight text-4xl mt-4">Tatuajes Relacionados</h2>
      <div className="w-full h-[250px] flex gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="w-full h-full" />
        ))}
      </div>
      <h2 className="font-extralight text-2xl mt-4">Por categoría</h2>
      <div className="w-full h-[250px] flex gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="w-full h-full" />
        ))}
      </div>
    </Main>
  )
}
