import { cn } from '@/lib/utils/utils'
import React, { forwardRef } from 'react'

export const DecoratedTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ children, className, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn(
        'bg-gradient-to-bl pb-1 from-white from-[69%] to-neutral-600 bg-clip-text bg-right-bottom',
        'text-4xl supports-[background-clip:text]:text-transparent relative z-10 w-max mx-auto',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
})

DecoratedTitle.displayName = 'DecoratedTitle'
