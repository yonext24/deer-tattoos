import { Section } from '@/components/ui/common/section'
import { TatuajesPagination } from '@/components/ui/tatuajes/pagination/tatuajes-pagination'
import { getArtistTattoos, getTattoos } from '@/lib/backend/utils/tattoos'
import { SearchParamsType } from '@/lib/types/common'

export default async function Page({
  params,
  searchParams,
}: {
  params: { artist: string }
  searchParams: SearchParamsType
}) {
  const { total, page } = await getArtistTattoos(params.artist, {
    page: searchParams?.page as string,
    search: searchParams?.search as string,
    style: searchParams?.style,
    size: searchParams?.size as string,
  })

  return (
    <Section className="!min-h-[auto] mt-2">
      {total >= 1 && <TatuajesPagination page={page} total={total} />}
    </Section>
  )
}
