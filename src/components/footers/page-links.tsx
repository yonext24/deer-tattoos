import Link from 'next/link'

const pages = [
  { text: 'Tatuajes', href: '/tatuajes' },
  { text: 'Artistas', href: '#artistas' },
  { text: 'Tienda', href: '/shop' },
]

export function PageLinks() {
  return (
    <div className="flex justify-end items-center">
      <ul className="flex flex-col">
        {pages.map(({ href, text }) => (
          <Link
            key={href}
            href={href}
            className="text-end text-muted-foreground text-sm hover:underline hover:text-green-lighter"
          >
            {text}
          </Link>
        ))}
      </ul>
    </div>
  )
}
