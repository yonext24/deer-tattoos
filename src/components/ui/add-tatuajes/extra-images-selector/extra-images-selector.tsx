/* eslint-disable react/display-name */
import { Button } from '@/components/shadcn/ui/button'
import { AddTatuajesFormValues } from '../use-add-tatuajes-form'
import { forwardRef } from 'react'
import { Dialog } from '@/components/shadcn/ui/dialog'
import { ExtraImagesModal } from './extra-images-modal'
import { useExtraImagesSelector } from './use-extra-images-selector'
import { GoldBadge } from '../../common/gold-badge'

export const ExtraImagesSelector = forwardRef(
  (
    {
      onChange,
    }: {
      value: AddTatuajesFormValues['extra_images']
      onChange: (data: any) => void
    },
    ref
  ) => {
    const {
      moveToLeft,
      moveToRight,
      deleteImage,
      handleImageAdd,
      modalOpen,
      setModalOpen,
      images,
    } = useExtraImagesSelector({ onChange, ref })

    return (
      <>
        <Button
          type="button"
          variant={'outline'}
          className="flex gap-2"
          onClick={() => {
            setModalOpen(true)
          }}
        >
          <label>Imágenes extra</label>
          {images.length > 0 && <GoldBadge>+{images.length}</GoldBadge>}
        </Button>

        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <ExtraImagesModal
            deleteImage={deleteImage}
            handleImageAdd={handleImageAdd}
            images={images}
            moveToLeft={moveToLeft}
            moveToRight={moveToRight}
          />
        </Dialog>
      </>
    )
  }
)
