import { Separator } from '@/components/shadcn/ui/separator'
import { Main } from '@/components/ui/common/main'
import { AddPageButton } from '@/components/ui/pages/add-page-button'
import {
  PageContextProvider,
  RenderPages,
} from '@/components/ui/pages/context/pages-context'
import { uncachedGetPages } from '@/lib/backend/utils/pages'

export default async function Page() {
  const data = await uncachedGetPages()
  return (
    <Main withAnalytics={false} className="flex flex-col px-3 py-5">
      <h1 className="text-2xl font-extralight">Páginas dinámicas</h1>
      <Separator className="my-4" />
      <p className="text-muted-foreground text-sm mb-3">
        Este panel te permite crear páginas con el contenido que quieran, como
        por ejemplo información de contacto o preguntas frecuentes.
      </p>

      <PageContextProvider data={data}>
        <AddPageButton />
        <RenderPages />
      </PageContextProvider>
    </Main>
  )
}
