import { Separator } from '@/components/shadcn/ui/separator'
import { AdminCategoriesForm } from '@/components/ui/admin-categories/admin-categories-form'
import { Main } from '@/components/ui/common/main'
import { getAllCategories } from '@/lib/backend/utils/categories'

export default async function Page() {
  const data = await getAllCategories()

  return (
    <Main withAnalytics={false} className="flex flex-col px-3 py-5">
      <h1 className="text-2xl font-extralight">Modificar estilos</h1>
      <Separator className="my-4" />
      <AdminCategoriesForm categories={data} />
    </Main>
  )
}
