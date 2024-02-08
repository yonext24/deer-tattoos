import { Separator } from '@/components/shadcn/ui/separator'
import { Skeleton } from '@/components/shadcn/ui/skeleton'

export function SidebarSkeleton() {
  return (
    <aside className="border-r border-border flex flex-col relative w-[60px] md:w-[300px]">
      <div className="flex flex-col sticky h-[var(--section-min-height)] top-[var(--navbar-height)] left-0">
        <Skeleton className="w-full h-[120px] opacity-0 md:opacity-100" />
        <div
          className="rounded-full border-2 border-border w-full aspect-square max-w-[140px] max-h-[140px] mx-auto overflow-hidden select-none
      transition-transform duration-300 -translate-y-[120px] md:-translate-y-1/2 data-[small=false]:!-translate-y-1/2"
        >
          <Skeleton className="w-full h-full" />
        </div>
        <div className="w-full px-6 mt-1">
          <Separator />
        </div>
        {/* <SidebarMediaSection isTatuajes={isTatuajes} /> */}
      </div>
    </aside>
  )
}
