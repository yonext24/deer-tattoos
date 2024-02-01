import { Badge } from '@/components/shadcn/ui/badge'
import { cn } from '@/lib/utils/utils'
import { ComponentProps } from 'react'

export type GoldBadgeProps = ComponentProps<typeof Badge>

export function GoldBadge({
  children,
  className,
  variant,
  ...props
}: GoldBadgeProps) {
  return (
    <Badge
      variant={'outline'}
      className={cn(
        'flex flex-nowrap border-gold/50 text-gold/80 self-center cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </Badge>
  )
}
