import { Main } from '@/components/ui/common/main'

type LayoutProps = {
  children: React.ReactNode
  tattoos: React.ReactNode
  artists: React.ReactNode
}

export default function HomeLayout({
  children,
  tattoos,
  artists,
}: LayoutProps) {
  return (
    <Main withMarginOnTop>
      {children}
      {tattoos}
      {artists}
    </Main>
  )
}
