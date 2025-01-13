import { Artist } from '@/lib/types/artist'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/shadcn/ui/dropdown-menu'
import { Link } from 'next-view-transitions'

export function ArtistCardMedia({
  children,
  medias,
}: {
  children: React.ReactNode
  medias: Artist['medias']
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Redes</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {Object.entries(medias)
            .filter(([key, value]) => Boolean(value))
            .map(([key, value]) => (
              <DropdownMenuItem key={value}>
                <Link href={value as string}>{key}</Link>
              </DropdownMenuItem>
            ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
