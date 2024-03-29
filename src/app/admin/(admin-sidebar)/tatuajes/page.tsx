import { Separator } from '@/components/shadcn/ui/separator'
import { Main } from '@/components/ui/common/main'
import { ArtistFilter } from '@/components/ui/see-tatuajes/artist-filter'
import { TatuajesTable } from '@/components/ui/see-tatuajes/tatuajes-table/tatuajes-table'
import { getTattoos } from '@/lib/backend/utils/tattoos'
import { SearchParamsType } from '@/lib/types/common'
import { transformSearchParams } from '@/lib/utils/utils'
import { Suspense } from 'react'

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParamsType
}) {
  const paginationParams = transformSearchParams(searchParams, {
    page: 'unique',
    size: 'unique',
    artist: 'unique',
  })
  const filterParams = transformSearchParams(searchParams, {
    artist: 'unique',
  })

  const { data: initialTattoos, total } = await getTattoos(
    filterParams,
    paginationParams
  )

  return (
    <Main withAnalytics={false} className="flex flex-col px-3 py-5">
      <div className="grid grid-cols-[1fr,300px]">
        <h1 className="text-2xl font-extralight">Ver tatuajes</h1>
        <Suspense>
          <ArtistFilter />
        </Suspense>
      </div>
      <Separator className="my-4" />
      <section className="flex-1 flex flex-col justify-between">
        <Suspense>
          <TatuajesTable initial={initialTattoos} total={total} />
        </Suspense>
      </section>
    </Main>
  )
}
