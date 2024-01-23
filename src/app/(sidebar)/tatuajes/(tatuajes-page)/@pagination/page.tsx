import { Section } from '@/components/ui/common/section'
import { TatuajesPagination } from '@/components/ui/tatuajes/pagination/tatuajes-pagination'
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
    <Section className="!min-h-[auto] mt-2">
      <Suspense key={paramsToString}>
        <Children searchParams={searchParams} />
      </Suspense>
    </Section>
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

  const { page: parsedPage, total } = await getTattoos(
    filterParams,
    paginationParams
  )

  if (total === 0) return null

  return <TatuajesPagination page={parsedPage} total={total} />
}
