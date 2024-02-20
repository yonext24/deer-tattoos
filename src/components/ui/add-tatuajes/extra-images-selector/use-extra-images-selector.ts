/* eslint-disable react-hooks/exhaustive-deps */
import {
  ForwardedRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'

export type Image = {
  url: string
  file: File
}

export function useExtraImagesSelector({
  onChange,
  ref,
}: {
  onChange: (props: any) => void
  ref: ForwardedRef<any>
}) {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [images, setImages] = useState<Image[]>([])

  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setImages((prev) => [...prev, { url, file }])
  }

  useImperativeHandle(ref, () => ({
    reset: () => {
      setImages([])
      setModalOpen(false)
      onChange([])
    },
  }))

  useEffect(() => {
    onChange(images.map((image) => image.file))

    // return () => {
    //   images.forEach((image) => URL.revokeObjectURL(image.url))
    // }
  }, [JSON.stringify(images)])

  const { moveToLeft, moveToRight, deleteImage } = useMemo(() => {
    const moveToLeft = (index: number) => {
      setImages((prev) => {
        const copy = [...prev]

        const temp = copy[index - 1]
        copy[index - 1] = copy[index]
        copy[index] = temp

        return copy
      })
    }

    const moveToRight = (index: number) => {
      setImages((prev) => {
        const copy = [...prev]

        const temp = copy[index + 1]
        copy[index + 1] = copy[index]
        copy[index] = temp

        return copy
      })
    }

    const deleteImage = (index: number) => {
      setImages((prev) => prev.filter((_, i) => i !== index))
    }

    return { moveToLeft, moveToRight, deleteImage }
  }, [setImages])

  return {
    moveToLeft,
    moveToRight,
    deleteImage,
    handleImageAdd,
    modalOpen,
    setModalOpen,
    images,
  }
}
