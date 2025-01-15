import { Skeleton } from '@/components/shadcn/ui/skeleton'
import { TattooCard } from '@/components/tattoo-card/tattoo-card'
import { ColumnLayout } from '@/components/ui/tatuajes/column-layout'
import { getArtistForCard } from '@/lib/backend/utils/artists'
import { getArtistTattoos } from '@/lib/backend/utils/tattoos'
import { SearchParamsType } from '@/lib/types/common'
import { transformSearchParams } from '@/lib/utils/utils'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> => {
  const artist = await getArtistForCard(params.slug)

  if (!artist) return {}

  return {
    description: `Los tatuajes de nuestro artista ${artist.name}`,
    openGraph: {
      images: [
        {
          url: artist.images.profile.src,
          width: 1200,
          height: 600,
          alt: artist.name,
        },
      ],
    },
  }
}

export default function Page({
  searchParams,
  params,
}: {
  searchParams: SearchParamsType
  params: { artist: string }
}) {
  const key = JSON.stringify(searchParams)

  return (
    <Suspense fallback={<Skeletons />} key={key}>
      <Children params={params} searchParams={searchParams} />
    </Suspense>
  )
}

const Children = async ({
  params,
  searchParams,
}: {
  params: { artist: string }
  searchParams: SearchParamsType
}) => {
  const filterParams = transformSearchParams(searchParams, {
    search: 'unique',
    style: 'multiple',
  })
  const paginationParams = transformSearchParams(searchParams, {
    page: 'unique',
    size: 'unique',
  })
  const { data: tattoos } = await getArtistTattoos(
    params.artist,
    filterParams,
    paginationParams
  )

  return (
    <div className="flex flex-col">
      {filterParams.search && (
        <h3 className="mx-4 font-thin text-xl">
          Buscando por: {filterParams.search}
        </h3>
      )}
      <ColumnLayout>
        {tattoos.map((tat, index) => (
          <TattooCard
            key={tat.id}
            {...tat}
            withAnimation
            delay={`${index * 80}ms`}
          />
        ))}
      </ColumnLayout>
    </div>
  )
}

const Skeletons = () => {
  return (
    <ColumnLayout>
      {Array.from({ length: 6 }).map((_, index) => {
        return <Skeleton key={index} className="w-full h-[400px]" />
      })}
    </ColumnLayout>
  )
}
