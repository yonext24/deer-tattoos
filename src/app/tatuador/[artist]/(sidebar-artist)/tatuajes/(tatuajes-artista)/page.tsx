import { Skeleton } from '@/components/shadcn/ui/skeleton'
import { TattooCard } from '@/components/tattoo-card/tattoo-card'
import { ColumnLayout } from '@/components/ui/tatuajes/column-layout'
import { getArtistTattoos } from '@/lib/backend/utils/tattoos'
import { SearchParamsType } from '@/lib/types/common'
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
  const { data: tattoos } = await getArtistTattoos(params.artist, {
    search: searchParams?.search as string | undefined,
    style: searchParams?.style as string | string[] | undefined,
  })

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
