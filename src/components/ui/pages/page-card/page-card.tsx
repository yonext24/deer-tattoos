'use client'

import { Button } from '@/components/shadcn/ui/button'
import { Page } from '@/lib/types/page'
import { EditIcon, TrashIcon } from 'lucide-react'
import { addModal } from 'react-modal-observer'
import { UpdatePageModal } from '../modals/update-page-modal'
import { DeletePageModal } from '../modals/delete-page-modal'
import { usePagesContext } from '../context/pages-context'
import { UpdatePayload } from '../context/pages-reducer'

export function PageCard({ page }: { page: Page }) {
  const { dispatch } = usePagesContext()

  const handleEdit = () => {
    const onEdit = (newData: UpdatePayload) => {
      dispatch({ type: 'update', payload: newData })
    }
    addModal(UpdatePageModal, { ...page, onEdit }, {})
  }
  const handleDelete = () => {
    const onDelete = (id: string) => {
      dispatch({ type: 'delete', payload: id })
    }
    addModal(DeletePageModal, { id: page.id, onDelete }, {})
  }

  return (
    <article className="w-full py-4 px-2 flex justify-between rounded-sm border border-border">
      <h3 className="font-thin text-xl">
        {page.title}
        <span className="text-muted-foreground text-sm">
          {'  '}/{page.slug}
        </span>
      </h3>

      <div className="flex gap-2">
        <Button variant="ghost" size="icon" onClick={handleEdit}>
          <EditIcon width={18} />
        </Button>
        <Button variant="destructive-ghost" size="icon" onClick={handleDelete}>
          <TrashIcon width={18} />
        </Button>
      </div>
    </article>
  )
}
