import { SidebarSkeleton } from '@/components/ui/sidebar/sidebar-skeleton'
import { SidebarWithArtist } from '@/components/ui/sidebar/sidebar-with-artist'
import { getTattooBySlug } from '@backend/utils/tattoos-utils'
import { Suspense } from 'react'

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  const tattoo = await getTattooBySlug(params.slug).catch(() => null)

  return (
    <div className="w-full grid grid-cols-[300px_1fr]">
      <Suspense key={tattoo?.artistSlug} fallback={<SidebarSkeleton />}>
        <SidebarWithArtist slug={tattoo?.artistSlug} />
      </Suspense>
      {children}
    </div>
  )
}
