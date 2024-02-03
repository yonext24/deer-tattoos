import { TattoosFooter } from '@/components/footers/tattoos-footer'
import { SidebarContainer } from '@/components/sidebar/sidebar'
import { SidebarSkeleton } from '@/components/sidebar/sidebar-skeleton'
import { SidebarWithArtist } from '@/components/sidebar/sidebar-with-artist'
import { Suspense } from 'react'

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { artist: string }
}) {
  return (
    <SidebarContainer>
      <Suspense key={params.artist} fallback={<SidebarSkeleton />}>
        <SidebarWithArtist slug={params.artist} />
      </Suspense>
      <div className="flex flex-col gap-4">
        {children}
        <TattoosFooter />
      </div>
    </SidebarContainer>
  )
}
