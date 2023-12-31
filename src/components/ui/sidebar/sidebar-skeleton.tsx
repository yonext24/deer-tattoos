import { Separator } from '@/components/shadcn/ui/separator'
import { Skeleton } from '@/components/shadcn/ui/skeleton'

export function SidebarSkeleton() {
  return (
    <aside className="border-r border-border flex flex-col relative">
      <div className="flex flex-col sticky h-[var(--section-min-height)] top-[var(--navbar-height)] left-0">
        <Skeleton className="w-full h-[120px]" />
        <div className="h-[140px] w-[140px] border border-gold rounded-full -mt-[70px] overflow-hidden mx-auto">
          <Skeleton className="w-full h-full" />
        </div>
        <h3 className="flex justify-center mt-2">
          <Skeleton className="w-24 h-[32px]" />
        </h3>
        <div className="w-full px-6 mt-1">
          <Separator />
        </div>
        {/* <SidebarMediaSection isTatuajes={isTatuajes} /> */}
      </div>
    </aside>
  )
}
