import { Section } from '@/components/ui/common/section'
import { TatuajesPagination } from '@/components/ui/tatuajes/pagination/tatuajes-pagination'
import { getArtistTattoos } from '@/lib/backend/utils/tattoos'
import { SearchParamsType } from '@/lib/types/common'
import { transformSearchParams } from '@/lib/utils/utils'

export default async function Page({
  params,
  searchParams,
}: {
  params: { artist: string }
  searchParams: SearchParamsType
}) {
  const filterParams = transformSearchParams(searchParams, {
    search: 'unique',
    style: 'multiple',
  })
  const paginationParams = transformSearchParams(searchParams, {
    page: 'unique',
    size: 'unique',
  })
  const { total, page } = await getArtistTattoos(
    params.artist,
    filterParams,
    paginationParams
  )

  return (
    <Section className="!min-h-[auto] mt-2">
      {total >= 1 && <TatuajesPagination page={page} total={total} />}
    </Section>
  )
}
