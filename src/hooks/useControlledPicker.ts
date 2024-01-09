import { useEffect, useRef, useState } from 'react'

export function useControlledPicker({
  onChange,
}: {
  onChange: (blob: Blob) => void
}) {
  const [open, setOpen] = useState<boolean>(false)
  const [originalFile, setOriginalFile] = useState<File>()
  const [croppedUrl, setCroppedUrl] = useState<string>('')

  const hasImageBeenInitialized = useRef(false)

  useEffect(() => {
    if (originalFile && !hasImageBeenInitialized.current) {
      hasImageBeenInitialized.current = true
      setOpen(true)
    }
  }, [originalFile])

  const onCompleted = ({
    previewUrl,
    blob,
  }: {
    previewUrl: string
    blob: Blob
  }) => {
    setCroppedUrl(previewUrl)
    onChange(blob)
    setOpen(false)
    hasImageBeenInitialized.current = false
  }

  return {
    open,
    setOpen,
    setOriginalFile,
    originalFile,
    croppedUrl,
    setCroppedUrl,
    onCompleted,
  }
}
