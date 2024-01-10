import Link from 'next/link'
import { NavInput } from './nav-input/nav-input'

const navEntrys = [
  { text: 'Inicio', href: '/' },
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
        <Link
          href="/"
          className="font-title text-gold text-2xl h-full flex flex-grod-[.5]"
        >
          <div className="h-full flex items-center">DEER</div>
        </Link>
        <div className="flex-grow flex w-full justify-center">
          <NavInput />
        </div>
        <div className="flex flex-grow-[.5] gap-2 col-span-3 row-span-1 h-full">
          {navEntrys.map(({ text, href }) => (
            <Link
              key={href}
              href={href}
              className="hover:text-green-light transition-colors hover:underline h-full p-2"
            >
              <div className="flex items-center h-full">{text}</div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
