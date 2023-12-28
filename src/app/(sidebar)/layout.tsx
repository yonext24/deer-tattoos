import { Sidebar } from '@/components/ui/sidebar/sidebar'
import { headers } from 'next/headers'

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = headers()
  const isTatuajes = headersList.get('x-url')?.includes('/tatuajes') ?? false

  return (
    <div className="w-full grid grid-cols-[300px_1fr]">
      <Sidebar isTatuajes={isTatuajes} />
      {children}
    </div>
  )
}
