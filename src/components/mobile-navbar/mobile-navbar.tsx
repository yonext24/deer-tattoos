'use client'
import { XIcon } from 'lucide-react'
import { navEntrys } from '../navbar/navbar'
import { MobileNavbarLink } from './mobile-navbar-link'
import { StylizedText } from '../stylized-text/stylized-text'

export default function MobileNavbar({
  closeModal,
}: {
  closeModal: () => void
}) {
  return (
    <div className="w-screen h-screen backdrop-blur-lg supports-[backdrop-filter]:bg-[rgba(7,14,7,0.5)] bg-black/80  flex items-center justify-center">
      <div className="absolute left-0 top-0 flex w-full justify-between">
        <button className="p-4" onClick={closeModal}>
          <XIcon className="h-6 w-6" />
        </button>
        <div className="mr-2">
          <StylizedText
            text="LOGO"
            size={'2rem'}
            offSetBottom="-2px"
            offSetRight="-3px"
          />
        </div>
      </div>
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
