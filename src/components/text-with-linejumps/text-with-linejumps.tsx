/* eslint-disable react/jsx-key */
import { cn } from '@/lib/utils/utils'
import { forwardRef } from 'react'

type Props = {
  text: string
  linesClassName?: string
  className?: string
}

export const TextWithLineJumps = forwardRef<HTMLParagraphElement, Props>(
  ({ text, linesClassName, ...props }, ref) => {
    const lines = text.split('\n')

    return (
      <p {...props} ref={ref}>
        {lines.map((el) => (
          <span className={cn('block', linesClassName)}>{el}</span>
        ))}
      </p>
    )
  }
)

TextWithLineJumps.displayName = 'TextWithLineJumps'
