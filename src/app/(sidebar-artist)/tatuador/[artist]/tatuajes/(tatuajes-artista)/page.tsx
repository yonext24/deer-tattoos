import { Skeleton } from '@/components/shadcn/ui/skeleton'
import { TattooCard } from '@/components/tattoo-card/tattoo-card'
import { ColumnLayout } from '@/components/ui/tatuajes/column-layout'
import { getArtistTattoos } from '@/lib/backend/utils/tattoos'
import { SearchParamsType } from '@/lib/types/common'
import { transformSearchParams } from '@/lib/utils/utils'
import { Suspense } from 'react'

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
