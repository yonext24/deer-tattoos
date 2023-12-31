import {
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenu,
} from '@/components/shadcn/ui/dropdown-menu'
import { Artist } from '@/lib/types/artist'
import Link from 'next/link'

export function ArtistDropdown({
  children,
  name,
  media,
  slug,
}: {
  children: React.ReactNode
  slug: string
  name: string
  media: Artist['media']
}) {
  const parsedMedias = Object.entries(media).map(([key, value]) => {
    return {
      text: key,
      href: value,
    }
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={`/artista/${slug}`}>Ver más tatuajes</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Redes</DropdownMenuLabel>
          {parsedMedias.map((el) => {
            return (
              <DropdownMenuItem key={el.href}>
                <span className="capitalize">{el.text}</span>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
