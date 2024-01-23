import {
  ForwardedRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

export type onCompletedFuncProps = {
  cropped: Blob
  original?: File
  previewUrl: string
  height: number
  width: number
}

export function useControlledPicker({
  onChange,
  ref,
}: {
  onChange: (blob: any) => void
  ref: ForwardedRef<unknown>
}) {
  const [open, setOpen] = useState<boolean>(false)
  const [originalFile, setOriginalFile] = useState<File>()
  const [croppedUrl, setCroppedUrl] = useState<string>('')

  const hasImageBeenInitialized = useRef(false)

  useImperativeHandle(ref, () => ({
    reset: () => {
      setOpen(false)
      setOriginalFile(undefined)
      hasImageBeenInitialized.current = false
      setCroppedUrl('')
    },
  }))

  useEffect(() => {
    if (originalFile && !hasImageBeenInitialized.current) {
      hasImageBeenInitialized.current = true
      setOpen(true)
    }
  }, [originalFile])

  const onCompleted = ({ previewUrl, cropped }: onCompletedFuncProps) => {
    setCroppedUrl(previewUrl)
    onChange(cropped)
    setOpen(false)
    hasImageBeenInitialized.current = false
  }

  return {
    open,
    setOpen,
    setOriginalFile,
    hasImageBeenInitialized,
    originalFile,
    croppedUrl,
    setCroppedUrl,
    onCompleted,
  }
}
