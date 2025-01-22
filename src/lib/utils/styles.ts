import { cn } from "./utils"

export const modalStyles = ({
  variant = 'default',
  size = 'default'
}: {
  variant?: 'default' | 'destructive'
  size?: 'large' | 'default'
}) => {
  if (variant === 'default')
    return cn('border border-border p-6 bg-black max-w-[500px] flex flex-col gap-2 rounded-xl max-h-[calc(100vh-1rem)] overflow-y-auto', size === 'large' && 'max-w-[860px]')

  return cn('border border-[hsl(var(--destructive))] p-6 bg-black max-w-[500px] flex flex-col gap-2 rounded-xl max-h-[calc(100vh-1rem)] overflow-y-auto', size === 'large' && 'max-w-[860px]')
}
