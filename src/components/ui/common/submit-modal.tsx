import { Button, buttonVariants } from '@/components/shadcn/ui/button'
import { SubmitButton } from './submit-button'
import { VariantProps } from 'class-variance-authority'

export function SubmitModal({
  closeModal,
  loading,
  error,
  onClick,
  text = 'Modificar',
  ...props
}: {
  text?: string
  closeModal: () => void
  loading: boolean
  error?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
} & VariantProps<typeof buttonVariants>) {
  return (
    <div className="flex gap-4 mt-3">
      <div className="flex-1 text-destructive text-sm">
        <span>{error}</span>
      </div>
      <Button variant="secondary" type="button" onClick={closeModal}>
        Cancelar
      </Button>
      <SubmitButton
        onClick={onClick}
        text={text}
        loading={loading}
        {...props}
      ></SubmitButton>
    </div>
  )
}
