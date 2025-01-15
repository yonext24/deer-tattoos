import { Link } from 'next-view-transitions'
import { NavInput } from './nav-input/nav-input'
import { Suspense } from 'react'
import { MARCA } from '@/lib/utils/consts'
import { MobileNavbarButton } from '../mobile-navbar/mobile-navbar-button/mobile-navbar-button'
import { NavCartButton } from './nav-cart-button/nav-cart-button'

export const navEntrys = [
  { text: 'Inicio', href: '/' },
  { text: 'Tienda', href: '/shop' },
  { text: 'Tatuajes', href: '/tatuajes' },
  { text: 'Artistas', href: '/#artistas' },
]

export function Navbar() {
  return (
    <nav
      className="bg-black/80 supports-[backdrop-filter]:bg-black/50 backdrop-blur border-b border-border min-h-[var(--navbar-height)] font-sans w-full shadow-lg sticky top-0 z-20
    flex justify-center"
    >
      <div className="w-full max-w-[var(--content-max-width)] mx-[var(--content-margin)] flex justify-between items-center gap-4">
        <MobileNavbarButton />
        <Link
          href="/"
          className="font-title text-gold text-2xl h-full hidden md:flex flex-grod-[.5]"
        >
          <div className="h-full flex items-center">{MARCA}</div>
        </Link>
        <div className="flex-grow flex w-full justify-center">
          <Suspense>
            <NavInput />
          </Suspense>
        </div>
        <div className="hidden sm:flex flex-grow-[.5] gap-2 col-span-3 row-span-1 h-full">
          {navEntrys.map(({ text, href }) => (
            <Link
              key={href}
              href={href}
              className="hover:text-green-light transition-colors hover:underline h-full py-2 text-sm px-px md:px-2 md:text-base"
            >
              <div className="flex items-center h-full">{text}</div>
            </Link>
          ))}
        </div>
        <NavCartButton />
      </div>
    </nav>
  )
}
