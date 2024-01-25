import { TattoosFooter } from '@/components/footers/tattoos-footer'
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
    <div className="w-full grid grid-cols-[300px_1fr]">
      <Suspense key={params.artist} fallback={<SidebarSkeleton />}>
        <SidebarWithArtist slug={params.artist} />
      </Suspense>
      <div className="flex flex-col gap-4">
        {children}
        <TattoosFooter />
      </div>
    </div>
  )
}
