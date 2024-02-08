import { Button } from '@/components/shadcn/ui/button'
import { AddTatuajesFormValues } from '../use-add-tatuajes-form'
import { useState } from 'react'
import {
  DialogHeader,
  Dialog,
  DialogContent,
} from '@/components/shadcn/ui/dialog'

export function ExtraImagesSelector({
  value,
  onChange,
}: {
  value: AddTatuajesFormValues['extra_images']
  onChange: (data: any) => void
}) {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  return (
    <>
      <Button
        type="button"
        variant={'outline'}
        onClick={() => {
          setModalOpen(true)
        }}
      >
        Ver tatuajes
      </Button>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>Imágenes extra</DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
