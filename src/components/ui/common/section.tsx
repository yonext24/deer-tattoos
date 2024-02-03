/* eslint-disable react/display-name */
import { cn } from '@/lib/utils/utils'
import React, { forwardRef, ForwardedRef, HTMLAttributes } from 'react'

type SectionProps = HTMLAttributes<HTMLElement>

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, ...props }, ref: ForwardedRef<HTMLElement>) => (
    <section
      ref={ref}
      className={cn(
        'min-h-[var(--section-min-height)] max-w-[var(--content-max-width)] mx-auto px-2',
        className
      )}
      {...props}
    >
      {props.children}
    </section>
  )
)
