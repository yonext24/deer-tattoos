export const modalStyles = ({
  variant = 'default',
}: {
  variant?: 'default' | 'destructive'
}) => {
  if (variant === 'default')
    return 'border border-border p-6 bg-black max-w-[500px] flex flex-col gap-2 rounded-xl'

  return 'border border-[hsl(var(--destructive))] p-6 bg-black max-w-[500px] flex flex-col gap-2 rounded-xl'
}
