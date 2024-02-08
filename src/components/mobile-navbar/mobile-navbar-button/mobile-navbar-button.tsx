'use client'

import { NavIcon } from '@/components/icons/nav-icon'
import dynamic from 'next/dynamic'
import { addModal } from 'react-modal-observer'

const LazyMobileNavbar = dynamic(
  () => import('@/components/mobile-navbar/mobile-navbar')
)

export function MobileNavbarButton() {
  return (
    <button
      className="sm:hidden"
      onClick={() => {
        addModal(
          // @ts-ignore
          LazyMobileNavbar,
          {},
          {
            backgroundColor: 'transparent',
            animationType: 'fade',
            duration: 200,
          },
          'mobile-navbar'
        )
      }}
    >
      <NavIcon className="h-6 w-6" />
    </button>
  )
}
