import { TattoosFooter } from '@/components/footers/tattoos-footer'
import { Sidebar } from '@/components/sidebar/sidebar'
import { Metadata } from 'next'
import { SidebarContainer } from '../../components/sidebar/sidebar'
import { getAllCategories } from '@/lib/backend/utils/categories'
import { unstable_cache } from 'next/cache'

const cachedGetAllCategories = unstable_cache(
  getAllCategories,
  ['get-all-categories'],
  { revalidate: 604800 }
)

export async function generateMetadata(): Promise<Metadata> {
  const styles = (await cachedGetAllCategories()).slice(0, 10)

  return {
    title: 'Tatuajes',
    keywords: styles.map(({ name }) => {
      return `tatuajes ${name}`
    }),
  }
}

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarContainer>
      <Sidebar artist={null} />
      <div className="flex flex-col gap-4">
        {children}
        <TattoosFooter />
      </div>
    </SidebarContainer>
  )
}
