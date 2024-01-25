import { Separator } from '@/components/shadcn/ui/separator'
import { Skeleton } from '@/components/shadcn/ui/skeleton'
import { Main } from '@/components/ui/common/main'

export default function Loading() {
  return (
    <Main withAnalytics={false} className="flex flex-col px-3 py-5">
      <h1 className="text-2xl font-extralight">Panel de administración</h1>
      <Separator className="my-4" />
      <div className="flex-1 flex flex-col gap-4">
        <div className="col-start-1 col-end-3">
          <Skeleton className="h-[316px] rounded-lg" />
        </div>
        <div className="flex *:flex-1 gap-4">
          <Skeleton className="h-[316px] rounded-lg" />
          <Skeleton className="h-[316px] rounded-lg" />
        </div>
      </div>
    </Main>
  )
}
