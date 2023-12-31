import { Skeleton } from '@/components/shadcn/ui/skeleton'
import { Tattoos } from '@/components/ui/home/tattoos/tattoos'

export default function Loading() {
  return (
    <Tattoos>
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton className="w-full h-full aspect-square" key={index} />
      ))}
    </Tattoos>
  )
}
