'use client'

import { addModal } from 'react-modal-observer'
import { Button } from '@/components/shadcn/ui/button'
import { PlusIcon } from 'lucide-react'
import { CreatePageModal } from './modals/create-page-modal'
import { usePagesContext } from './context/pages-context'
import { Page } from '@/lib/types/page'

export function AddPageButton() {
  const { dispatch } = usePagesContext()

  const onClick = () => {
    const onAdd = (newData: Page) => {
      dispatch({ type: 'add', payload: newData })
    }
    addModal(CreatePageModal, { onAdd }, {})
  }

  return (
    <>
      <Button className="self-start" onClick={onClick}>
        <PlusIcon height={18} width={18} className="mr-2" strokeWidth={1} />
        <span>Agregar página dinámica</span>
      </Button>
    </>
  )
}
