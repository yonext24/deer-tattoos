'use client'
import { XIcon } from 'lucide-react'
import { navEntrys } from '../navbar/navbar'
import { MobileNavbarLink } from './mobile-navbar-link'

export default function MobileNavbar({
  closeModal,
}: {
  closeModal: () => void
}) {
  return (
    <div className="w-screen h-screen backdrop-blur-lg bg-green-dark/50 flex items-center justify-center">
      <button className="absolute left-0 top-0 p-4" onClick={closeModal}>
        <XIcon className="h-6 w-6" />
      </button>
      <nav>
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
    </div>
  )
}
