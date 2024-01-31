export const modalStyles = ({
  variant = 'default',
}: {
  variant?: 'default' | 'destructive'
}) => {
  if (variant === 'default')
    return 'border border-border p-6 bg-black max-w-[500px] flex flex-col gap-2 rounded-xl max-h-[calc(100vh-1rem)] overflow-y-auto'

  return 'border border-[hsl(var(--destructive))] p-6 bg-black max-w-[500px] flex flex-col gap-2 rounded-xl max-h-[calc(100vh-1rem)] overflow-y-auto'
}
