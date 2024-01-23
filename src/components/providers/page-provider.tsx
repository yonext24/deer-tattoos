'use client'

import { AppProgressBar } from 'next-nprogress-bar'

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
    </>
  )
}
