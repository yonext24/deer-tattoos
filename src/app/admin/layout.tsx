'use client'

import { Modals } from 'react-modal-observer'
import { SessionProvider } from 'next-auth/react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Modals animationType="fade-with-scale" noScroll={true} zIndex={30} />
    </SessionProvider>
  )
}
