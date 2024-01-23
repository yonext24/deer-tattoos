import { Separator } from '@/components/shadcn/ui/separator'
import { Main } from '@/components/ui/common/main'
import { AdminArtistLay } from '@/components/ui/see-artistas/admin-artist-lay'
import { AdminArtistWrapper } from '@/components/ui/see-artistas/admin-artist-wrapper'
import { AdminActionsProvider } from '@/components/ui/see-artistas/use-admin-artist-page'
import { getAllArtists } from '@/lib/backend/utils/artists'

export default async function Page() {
  const artists = await getAllArtists()

  return (
    <Main withAnalytics={false} className="flex flex-col px-3 py-5">
      <h1 className="text-2xl font-extralight">Ver Artistas</h1>
      <Separator className="my-4" />
      <AdminArtistLay>
        <AdminActionsProvider artists={artists}>
          <AdminArtistWrapper />
        </AdminActionsProvider>
      </AdminArtistLay>
    </Main>
  )
}
