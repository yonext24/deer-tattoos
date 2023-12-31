import { Main } from '@/components/ui/common/main'
import tattoos from '../../../../../public/tattoos.json'
import { Back } from '@/components/ui/common/back'
import { ImageWithBlur } from '@/components/tattoo-card/image-with-blur'
import { Skeleton } from '@/components/shadcn/ui/skeleton'
import { notFound } from 'next/navigation'
import { Artist } from '@/components/ui/tatuajes/artist/artist'

export const generateStaticParams = () => {
  return tattoos.map((tattoo) => ({
    params: { slug: String(tattoo.id) },
  }))
}

const getTattoo = async (slug: string) => {
  const tattoo = tattoos.find((tattoo) => String(tattoo.id) === slug)
  if (!tattoo) {
    notFound()
  }
  return tattoo
}

export default async function Page({ params }: { params: { slug: string } }) {
  const tattoo = await getTattoo(params.slug)

  if (!tattoo) return <div>Not found</div>

  return (
    <Main className="ml-auto flex flex-col gap-4 p-4 w-[700px]">
      <div className="w-full flex justify-between items-start">
        <Back />
        <Artist slug={tattoo.artist.slug} name={tattoo.artist.name} />
      </div>
      <picture className="relative overflow-hidden w-full ">
        <ImageWithBlur
          alt="Image"
          src={tattoo.images.main.src}
          height={tattoo.images.main.height}
          width={tattoo.images.main.width}
          blurDataURL={tattoo.images.bluredImg}
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
