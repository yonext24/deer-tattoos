import { Main } from '@/components/ui/common/main'
import { Artists } from '@/components/ui/home/artists'
import { HomeHeader } from '@/components/ui/home/header'
import { Tattoos } from '@/components/ui/home/tattoos'

export default function Home() {
  return (
    <Main withMarginOnTop>
      <HomeHeader />
      <Tattoos />
      <Artists />
    </Main>
  )
}
