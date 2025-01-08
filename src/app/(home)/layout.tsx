import { Main } from '@/components/ui/common/main'
import { MainFooter } from '@/components/footers/main-footer'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Inicio',
}

type LayoutProps = {
  children: React.ReactNode
  tattoos: React.ReactNode
  artists: React.ReactNode
  who: React.ReactNode
  where: React.ReactNode
}

export default function HomeLayout({
  children,
  tattoos,
  artists,
  who,
  where,
}: LayoutProps) {
  return (
    <>
      <Main withMarginOnTop>
        {children}
        {tattoos}
        {who}
        {artists}
        {/* {where} */}
      </Main>
      <MainFooter />
    </>
  )
}
