import { Main } from '@/components/ui/common/main'
import tattoos from '../../../../../public/tattoos.json'
import Image from 'next/image'
import { Back } from '@/components/ui/common/back'

const getTattoo = async (slug: string) => {
  return tattoos.find((tattoo) => String(tattoo.id) === slug)
}

export default async function Page({ params }: { params: { slug: string } }) {
  const tattoo = await getTattoo(params.slug)

  if (!tattoo) return <div>Not found</div>

  return (
    <Main className="w-max ml-auto flex flex-col gap-4 p-4">
      <Back />
      <Image
        alt="Image"
        src={tattoo.image}
        height={500}
        width={500}
        className="w-full max-h-auto h-auto"
      />
      <h2 className="font-extralight text-4xl mt-4">Tatuajes Relacionados</h2>
      <div className="w-full h-[250px] flex gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex-1 bg-neutral-800 h-full rounded" />
        ))}
      </div>
      <h2 className="font-extralight text-2xl mt-4">Por categoría</h2>
      <div className="w-full h-[250px] flex gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex-1 bg-neutral-800 h-full rounded" />
        ))}
      </div>
    </Main>
  )
}
