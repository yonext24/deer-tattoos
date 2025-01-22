import { MainFooter } from '@/components/footers/main-footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <MainFooter />
    </>
  )
}
