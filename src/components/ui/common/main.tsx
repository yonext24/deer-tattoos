/* eslint-disable react/display-name */
import { cn } from '@/lib/utils/utils'
import { ForwardedRef, HTMLAttributes, forwardRef } from 'react'

type MainProps = {
  withMarginOnTop?: boolean
} & HTMLAttributes<HTMLElement>

export const Main = forwardRef<HTMLElement, MainProps>(
  ({ withMarginOnTop, ...props }, ref: ForwardedRef<HTMLElement>) => {
    return (
      <main
        ref={ref}
        className={cn(
          'flex-1 flex flex-col w-full gap-4',
          withMarginOnTop && 'mt-1',
          props.className,
        )}
        {...props}
      >
        {props.children}
      </main>
    )
  },
)
