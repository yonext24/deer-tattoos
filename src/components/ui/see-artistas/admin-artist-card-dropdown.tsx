'use client'

import { Button } from '@/components/shadcn/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/shadcn/ui/dropdown-menu'
import { cn } from '@/lib/utils/utils'
import { Camera, EyeIcon, MoreHorizontal, Pen, Trash } from 'lucide-react'
import { useAdminActions } from './use-admin-artist-page'
import { useCallback } from 'react'
import { addModal } from 'react-modal-observer'
import DeleteArtistModal from './modals/delete-artist-modal'
import { Artist } from '@/lib/types/artist'
import { EditArtistModal } from './modals/edit-artist-modal'
import {
  EditMediasPayload,
  EditPayload,
  ImagesPayload,
} from './admin-artist-reducer'
import { EditMediasModal } from './modals/edit-medias-modal'
import { ChangeArtistImagesModal } from './modals/change-artist-images-modal'
import { useRouter } from 'next-nprogress-bar'

export function AdminArtistCardDropdown({
  name,
  slug,
  styles,
  description,
  medias,
}: Artist) {
  const { dispatch } = useAdminActions()
  const router = useRouter()

  const handleOpenDelete = useCallback(() => {
    const onRemove = () => {
      dispatch({ type: 'delete', payload: slug })
    }

    addModal(DeleteArtistModal, { slug, onRemove })
  }, [dispatch, slug])

  const handleOpenEdit = useCallback(() => {
    const onEdit = (props: EditPayload) => {
      dispatch({ type: 'edit-styles', payload: props })
    }

    addModal(EditArtistModal, {
      description,
      name,
      onChangeData: onEdit,
      slug,
      styles,
    })
  }, [dispatch, slug, name, description, styles])

  const handleOpenImages = useCallback(() => {
    const onEdit = (props: ImagesPayload) => {
      dispatch({ type: 'change-images', payload: props })
    }

    addModal(ChangeArtistImagesModal, { slug, onChangeData: onEdit })
  }, [slug, dispatch])

  const handleOpenMedias = useCallback(() => {
    const onEdit = (props: EditMediasPayload) => {
      dispatch({ type: 'edit-medias', payload: props })
    }

    addModal(EditMediasModal, {
      onChangeData: onEdit,
      slug,
      medias,
    })
  }, [dispatch, slug, medias])

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
      <DropdownMenuContent
        align="end"
        className="*:flex *:pl-1 *:gap-2 *:h-[auto] *:py-2 [&_svg]:h-4 [&_svg]:w-4 min-w-[200px]"
      >
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            router.push(`/admin/tatuajes?artist=${slug}`)
          }}
          role="link"
        >
          <EyeIcon />
          <span>Ver tatuajes</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleOpenEdit}>
          <Pen />
          <span>Editar</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleOpenMedias}>
          <Pen />
          <span>Editar Redes</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleOpenImages}>
          <Camera />
          <span>Cambiar imágenes</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="!py-0 !h-px" />
        <DropdownMenuItem
          onClick={handleOpenDelete}
          className={cn(
            'text-[hsl(var(--destructive))] hover:text-white hover:!bg-[hsl(var(--destructive))] transition-colors'
          )}
        >
          <Trash />
          <span>Eliminar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
