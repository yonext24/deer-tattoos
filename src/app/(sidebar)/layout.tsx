import { TattoosFooter } from '@/components/footers/tattoos-footer'
import { Sidebar } from '@/components/sidebar/sidebar'
import { Metadata } from 'next'
import { SidebarContainer } from '../../components/sidebar/sidebar'
import { getAllCategories } from '@/lib/backend/utils/categories'

export const revalidate = 0
export async function generateMetadata(): Promise<Metadata> {
  const styles = (await getAllCategories()).slice(0, 10)

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
