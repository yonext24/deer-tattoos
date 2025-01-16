'use client'

import { NavIcon } from '@/components/icons/nav-icon'
import { navEntrys } from '@/components/navbar/navbar'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/shadcn/ui/sheet'
import { useState } from 'react'
import { MobileNavbarLink } from './mobile-navbar-link'
import { useSwipe } from '@/hooks/useSwipe'

export function MobileNavbarButton() {
  const [open, setOpen] = useState<boolean>(false)

  const closeModal = () => {
    setOpen(false)
  }

  useSwipe({ onSwipeRight: closeModal })

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="sm:hidden">
          <NavIcon className="h-6 w-6" />
        </button>
      </SheetTrigger>

      <SheetContent className="bg-transparent w-full border-l-0 flex">
        <SheetHeader>
          <SheetClose />
        </SheetHeader>
        <nav className="m-auto">
          <ul className="flex flex-col gap-y-2 [&_#item:hover]:text-green [&_#item]:transition-colors">
            {navEntrys.map((el, i) => (
              <MobileNavbarLink
                closeModal={closeModal}
                index={i}
                key={el.href}
                href={el.href}
                text={el.text}
              />
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
