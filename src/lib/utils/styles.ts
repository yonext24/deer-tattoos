import { cn } from './utils'

export const modalStyles = ({
  type = 'window',
  variant = 'default',
  size = 'default',
}: {
  type?: 'window' | 'title' | 'footer' | 'text'
  variant?: 'default' | 'destructive'
  size?: 'large' | 'default'
}) => {
  if (type === 'title') return 'font-semibold'
  if (type === 'text') return 'text-[hsl(var(--muted-foreground))]'
  if (type === 'footer') return 'flex w-full justify-end'

  if (variant === 'default')
    return cn(
      'border border-border p-6 bg-black max-w-[500px] flex flex-col gap-2 rounded-xl max-h-[calc(100vh-1rem)] overflow-y-auto',
      size === 'large' && 'max-w-[860px]'
    )

  return cn(
    'border border-[hsl(var(--destructive))] p-6 bg-black max-w-[500px] flex flex-col gap-2 rounded-xl max-h-[calc(100vh-1rem)] overflow-y-auto',
    size === 'large' && 'max-w-[860px]'
  )
}
