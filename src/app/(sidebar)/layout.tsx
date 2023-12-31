import { Sidebar } from '@/components/ui/sidebar/sidebar'

export const revalidate = 0

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full grid grid-cols-[300px_1fr]">
      <Sidebar />
      {children}
    </div>
  )
}
