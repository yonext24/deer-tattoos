import { getPages } from '@/lib/backend/utils/pages'
import { Link } from 'next-view-transitions'

const staticPages = [
  { text: 'Tatuajes', href: '/tatuajes' },
  { text: 'Artistas', href: '#artistas' },
  { text: 'Tienda', href: '/shop' },
]

export async function PageLinks() {
  const serverPages = await getPages().catch((err) => [])
  const pages = [
    ...staticPages,
    ...serverPages.map((el) => ({ text: el.title, href: `/${el.slug}` })),
  ]

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
