import { TattoosFooter } from '@/components/footers/tattoos-footer'
import { Sidebar } from '@/components/sidebar/sidebar'
import { getStyles } from '@/lib/backend/utils/styles'
import { Metadata } from 'next'
import { SidebarContainer } from '../../components/sidebar/sidebar'

export const revalidate = 0
export async function generateMetadata(): Promise<Metadata> {
  const styles = (await getStyles()).slice(0, 10)

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
