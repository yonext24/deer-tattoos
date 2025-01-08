import { Separator } from '@/components/shadcn/ui/separator'
import { Main } from '@/components/ui/common/main'
import { EditDataForm } from '@/components/ui/edit-data/edit-data-form'
import { getAllPageData } from '@/lib/backend/utils/data'

export default async function Page() {
  const data = await getAllPageData()
  return (
    <Main withAnalytics={false} className="flex flex-col px-3 py-5">
      <h1 className="text-2xl font-extralight">Cambiar datos de la página</h1>
      <Separator className="my-4" />
      <EditDataForm data={data} />
    </Main>
  )
}
