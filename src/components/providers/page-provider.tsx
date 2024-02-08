'use client'

import { AppProgressBar } from 'next-nprogress-bar'
import { Modals } from 'react-modal-observer'

export function PageProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <AppProgressBar
        height="2px"
        color="#FFFFFF"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <Modals animationType="fade-with-scale" noScroll={true} zIndex={30} />
    </>
  )
}
