import { Section } from '@/components/ui/common/section'
import { TatuajesPagination } from '@/components/ui/tatuajes/pagination/tatuajes-pagination'
import { getTattoos } from '@/lib/backend/utils/tattoos'
import { SearchParamsType } from '@/lib/types/common'
import { Suspense } from 'react'

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParamsType
}) {
  const paramsToString = `${searchParams?.style}-${searchParams?.search}-${searchParams?.page}-${searchParams?.size}`

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
  const { total, page } = await getTattoos(
    searchParams?.style,
    searchParams?.search as string | undefined,
    searchParams?.page as string | undefined,
    searchParams?.size as string | undefined
  )

  if (total === 0) return null

  return <TatuajesPagination page={page} total={total} />
}
