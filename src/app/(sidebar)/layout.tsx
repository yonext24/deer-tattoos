import { TattoosFooter } from '@/components/ui/footers/tattoos-footer'
import { Sidebar } from '@/components/ui/sidebar/sidebar'
import { getStyles } from '@/lib/backend/utils/styles'
import { Metadata } from 'next'

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
    <div className="w-full grid grid-cols-[300px_1fr]">
      <Sidebar artist={null} />
      <div className="flex flex-col gap-4">
        {children}
        <TattoosFooter />
      </div>
    </div>
  )
}
