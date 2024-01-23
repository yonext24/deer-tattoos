import { Skeleton } from '@/components/shadcn/ui/skeleton'

export function AdminArtistCardSkeleton() {
  return (
    <article className="border border-border rounded-lg h-[200px] flex flex-col p-4">
      <header className="flex items-center justify-start gap-2">
        <Skeleton className="rounded-full h-12 w-12" />
        <Skeleton className="rounded-md h-4 w-32" />
        <Skeleton className="rounded-md h-5 w-5 ml-auto" />
      </header>
    </article>
  )
}
