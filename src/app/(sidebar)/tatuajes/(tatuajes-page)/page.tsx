import { Skeleton } from '@/components/shadcn/ui/skeleton'
import { TattooCard } from '@/components/tattoo-card/tattoo-card'
import { ColumnLayout } from '@/components/ui/tatuajes/column-layout'
import { getTattoos } from '@/lib/backend/utils/tattoos'
import { SearchParamsType } from '@/lib/types/common'
import { transformSearchParams } from '@/lib/utils/utils'
import { Suspense } from 'react'

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParamsType
}) {
  const paramsToString = `${JSON.stringify(
    searchParams?.style
  )}-${searchParams?.search}-${searchParams?.page}-${searchParams?.size}`

  return (
    <Suspense key={paramsToString} fallback={<Skeletons />}>
      <Children searchParams={searchParams} />
    </Suspense>
  )
}

const Children = async ({
  searchParams,
}: {
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

  const { data: tattoos } = await getTattoos(filterParams, paginationParams)

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
