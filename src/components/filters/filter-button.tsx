/* eslint-disable react/display-name */
'use client'

import { Button } from '@/components/shadcn/ui/button'
import { cn } from '@/lib/utils/utils'
import { LucideIcon } from 'lucide-react'
import { HTMLAttributes, forwardRef } from 'react'

type Props = HTMLAttributes<HTMLButtonElement> & {
  Icon: LucideIcon
  children: React.ReactNode
}

export const FilterButton = forwardRef<HTMLButtonElement, Props>(
  ({ Icon, children, className, ...props }, ref) => {
    return (
      <Button
        variant="outline"
        size="default"
        className={cn(
          'h-8 border-border hover:border-gold hover:bg-black transition-colors flex gap-2',
          className
        )}
        ref={ref}
        {...props}
      >
        <Icon height="14" width="14" />
        {children}
      </Button>
    )
  }
)
