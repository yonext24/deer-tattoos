import { Skeleton } from '@/components/shadcn/ui/skeleton'

export function ArtistSkeleton() {
  return (
    <div className="flex min-w-32 gap-2 cursor-pointer h-[44px]">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="flex flex-col gap-1">
        <Skeleton className="ml-2 w-[60px] h-[18px]" />
        <Skeleton className="ml-2 w-[43.88px] h-[15px]" />
      </div>
    </div>
  )
}
