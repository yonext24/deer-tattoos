import { TattoosFooter } from '@/components/footers/tattoos-footer'
import { SidebarContainer } from '@/components/sidebar/sidebar'
import { SidebarSkeleton } from '@/components/sidebar/sidebar-skeleton'
import { SidebarWithArtist } from '@/components/sidebar/sidebar-with-artist'
import { Main } from '@/components/ui/common/main'
import { getTattoos } from '@/lib/backend/utils/tattoos'
import { getTattooBySlug } from '@backend/utils/tattoos-utils'
import { Suspense } from 'react'

export const dynamicParams = true

export const generateStaticParams = async () => {
  const { data } = await getTattoos({}, { page: 1, size: 9999 })
  return data.map((tattoo) => ({ params: { slug: tattoo.slug } }))
}

export default async function Layout({
  children,
  recommended,
  params,
}: {
  children: React.ReactNode
  recommended: React.ReactNode
  params: { slug: string }
}) {
  const tattoo = await getTattooBySlug(params.slug).catch(() => null)

  return (
    <SidebarContainer>
      <Suspense key={tattoo?.artistSlug} fallback={<SidebarSkeleton />}>
        <SidebarWithArtist slug={tattoo?.artistSlug} />
      </Suspense>

      <div className="flex flex-col gap-4">
        <Main className="ml-auto flex flex-col gap-4 p-4 w-full max-w-[700px]">
          {children}
          {recommended}
        </Main>
        <TattoosFooter />
      </div>
    </SidebarContainer>
  )
}
