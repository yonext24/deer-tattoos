import { Separator } from '@/components/shadcn/ui/separator'
import { Main } from '@/components/ui/common/main'

export default function Page() {
  return (
    <Main className="flex flex-col px-3 py-5">
      <h1 className="text-2xl font-extralight">Ver tatuajes</h1>

      <Separator className="my-4" />
    </Main>
  )
}
