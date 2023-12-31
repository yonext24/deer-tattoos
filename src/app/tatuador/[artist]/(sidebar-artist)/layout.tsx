import { SidebarSkeleton } from '@/components/ui/sidebar/sidebar-skeleton'
import { SidebarWithArtist } from '@/components/ui/sidebar/sidebar-with-artist'
import { Suspense } from 'react'

export default function Layout({
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
      {children}
    </div>
  )
}
