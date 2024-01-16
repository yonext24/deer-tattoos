import { Separator } from '@/components/shadcn/ui/separator'
import { Main } from '@/components/ui/common/main'
import { TatuajesTable } from '@/components/ui/see-tatuajes/tatuajes-table/tatuajes-table'
import { getTattoos } from '@/lib/backend/utils/tattoos'
import { SearchParamsType } from '@/lib/types/common'
import { transformSearchParams } from '@/lib/utils/utils'

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParamsType
}) {
  const params = transformSearchParams(searchParams, {
    page: 'unique',
    size: 'unique',
  })

  const { data: initialTattoos, total } = await getTattoos(
    undefined,
    undefined,
    params.page ?? '1',
    params.size ?? '10'
  )

  return (
    <Main className="flex flex-col px-3 py-5">
      <h1 className="text-2xl font-extralight">Ver tatuajes</h1>
      <Separator className="my-4" />
      <section className="flex-1 flex flex-col justify-between">
        <TatuajesTable initial={initialTattoos} total={total} />
      </section>
    </Main>
  )
}
