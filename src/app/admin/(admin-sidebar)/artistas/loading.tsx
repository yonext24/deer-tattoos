import { Separator } from '@/components/shadcn/ui/separator'
import { Main } from '@/components/ui/common/main'
import { AdminArtistCardSkeleton } from '@/components/ui/see-artistas/admin-artist-card-skeleton'
import { AdminArtistLay } from '@/components/ui/see-artistas/admin-artist-lay'

export default function Loading() {
  return (
    <Main withAnalytics={false} className="flex flex-col px-3 py-5">
      <h1 className="text-2xl font-extralight">Ver Artistas</h1>
      <Separator className="my-4" />
      <AdminArtistLay>
        {Array.from({ length: 4 }).map((_, i) => (
          <AdminArtistCardSkeleton key={i} />
        ))}
      </AdminArtistLay>
    </Main>
  )
}
