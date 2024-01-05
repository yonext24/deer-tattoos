import { AdminSidebar } from '@/components/ui/admin-sidebar/admin-sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full grid grid-cols-[280px_1fr]">
      <AdminSidebar />
      {children}
    </div>
  )
}
