import { buttonVariants } from '@/components/shadcn/ui/button'
import { cn } from '@/lib/utils/utils'
import { useId } from 'react'

export function ImageSelectorButton({
  onChange,
  className,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}) {
  const id = useId()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const areAllCorrecType = e.target.files?.[0].type.includes('image')
    if (!areAllCorrecType) return

    onChange(e)
    e.currentTarget.value = ''
  }
  return (
    <label
      className={cn(
        buttonVariants({ variant: 'outline', size: 'sm' }),
        'cursor-pointer',
        className
      )}
      htmlFor={id}
    >
      Seleccionar imágen
      <input
        type="file"
        accept="image/png,image/jpg,image/jpeg,image/webp"
        className="hidden"
        id={id}
        onChange={handleChange}
      />
    </label>
  )
}
