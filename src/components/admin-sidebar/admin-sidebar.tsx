import { auth } from '@/app/api/auth/[...nextauth]/utils'
import { UserDropdown } from './user-entry/user-dropdown'
import { UserEntry } from './user-entry/user-entry'
import { BackHomeLink } from './back-home-link'
import { Separator } from '@/components/shadcn/ui/separator'
import { buttonVariants } from '@/components/shadcn/ui/button'
import { Link } from 'next-view-transitions'
import { cn } from '@/lib/utils/utils'

const entrys = [
  { text: 'Panel de administración', href: '/admin' },
  { text: 'Datos de la página', href: '/admin/data' },
  { text: 'Agregar Tatuaje', href: '/admin/tatuajes/agregar' },
  { text: 'Ver Tatuajes', href: '/admin/tatuajes' },
  { text: 'Agregar Artista', href: '/admin/artistas/agregar' },
  { text: 'Ver Artistas', href: '/admin/artistas' },
  { text: 'Estilos', href: '/admin/estilos' },
  { text: 'Páginas dinámicas', href: '/admin/paginas' },
]

export async function AdminSidebar() {
  const session = await auth()

  return (
    <aside className="border-r border-border flex flex-col relative">
      <div className="absolute top-[calc(0px-1px)] z-20 h-px w-full bg-black" />
      <div className="flex flex-col sticky h-[var(--section-min-height)] top-[var(--navbar-height)] left-0">
        <BackHomeLink />
        <Separator className="mx-2 w-auto mb-1" />
        <div className="flex flex-col px-2">
          {entrys.map(({ text, href }) => (
            <Link
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'lg' }),
                'rounded-md text-start justify-start'
              )}
              href={href}
              key={href}
            >
              {text}
            </Link>
          ))}
        </div>
        <div className="border-t border-border mt-auto">
          <UserDropdown
            name={session?.user.name ?? ''}
            role={session?.user.role ?? ''}
          >
            <UserEntry
              name={session?.user.name ?? ''}
              image={session?.user.image ?? ''}
            />
          </UserDropdown>
        </div>
      </div>
    </aside>
  )
}
