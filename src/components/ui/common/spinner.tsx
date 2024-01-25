/* eslint-disable react/display-name */
import { cn } from '@/lib/utils/utils'
import React, { forwardRef, HTMLAttributes, Ref } from 'react'

const Spinner = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref: Ref<HTMLDivElement>) => (
    <div
      ref={ref}
      className={cn(
        'w-4 h-4 border border-solid border-current border-b-transparent rounded-full block box-border animate-rotation',
        className
      )}
      {...props}
    ></div>
  )
)

export default Spinner
