'use client'

import { useHistory } from '@/store/history-store'
import { AppProgressBar } from 'next-nprogress-bar'
import { Modals } from 'react-modal-observer'

export function PageProvider({ children }: { children: React.ReactNode }) {
  useHistory()

  return (
    <>
      {children}
      <AppProgressBar
        height="0px"
        color="#FFFFFF"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <Modals animationType="fade-with-scale" noScroll={true} zIndex={30} />
    </>
  )
}
