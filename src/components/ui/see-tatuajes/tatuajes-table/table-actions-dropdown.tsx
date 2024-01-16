import { Button } from '@/components/shadcn/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/shadcn/ui/dropdown-menu'
import DeleteModal from '@/components/ui/see-tatuajes/see-tatuajes-modals/delete-tatuaje-modal'
import { cn } from '@/lib/utils/utils'
import { MoreHorizontal, Pen, Trash } from 'lucide-react'
import { addModal } from 'react-modal-observer'
import { EditStylesModal } from '../see-tatuajes-modals/edit-styles-modal'
import { Row, Table } from '@tanstack/react-table'
import { Tattoo } from '@/lib/types/tattoo'
import { PersonIcon } from '@radix-ui/react-icons'
import { ChangeArtistModal } from '../see-tatuajes-modals/change-artist-modal'

export function TableActionsDropdown({
  row,
  table,
}: {
  row: Row<Tattoo>
  table: Table<Tattoo>
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-end">
          <Button variant="ghost" className="h-8 w-8 p-0 ml-auto">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() =>
            addModal(
              EditStylesModal,
              {
                initialStyles: row.getValue('styles'),
                initialTags: row.original.tags,
                id: row.original.id,
                onChangeData: (data) => {
                  table.options.meta?.changeData({
                    index: row.index,
                    styles: data.styles,
                    tags: data.tags,
                  })
                },
              },
              {}
            )
          }
          className={cn('flex pl-1 gap-2 h-[auto] py-2')}
        >
          <Pen className="h-4 w-4" />
          <span>Editar</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            addModal(
              ChangeArtistModal,
              {
                artistSlug: row.original.artistSlug,
                onArtistChange: (slug) => {
                  table.options.meta?.changeArtist({
                    index: row.index,
                    artistSlug: slug,
                  })
                },
              },
              {}
            )
          }
          className={cn('flex pl-1 gap-2 h-[auto] py-2')}
        >
          <PersonIcon className="h-4 w-4" />
          <span>Cambiar artista</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            addModal(
              DeleteModal,
              {
                id: row.original.id,
                onRemove: () => {
                  table.options.meta?.deleteTattoo(row.index)
                },
              },
              {}
            )
          }
          className={cn(
            'flex pl-1 gap-2 h-[auto] py-2 text-[hsl(var(--destructive))] hover:text-white hover:!bg-[hsl(var(--destructive))] transition-colors'
          )}
        >
          <Trash className="h-4 w-4" />
          <span>Eliminar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
