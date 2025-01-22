import { forwardRef } from 'react'
import { Button, ButtonProps } from '../shadcn/ui/button'
import { cn } from '@/lib/utils/utils'

export const MenuButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, type, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        type="button"
        variant={variant || 'ghost'}
        className={cn('data-[is-active=true]:bg-green rounded w-10', className)}
        {...props}
      >
        {children}
      </Button>
    )
  }
)

MenuButton.displayName = 'MenuButton'
