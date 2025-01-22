/* eslint-disable react/jsx-key */
import { PolymorphicProps } from '@/lib/types/common'
import { cn } from '@/lib/utils/utils'
import { ElementType } from 'react'

type Props = {
  text: string
  linesClassName?: string
  className?: string
}

const defaultElement = 'p'

type TextProps<E extends ElementType = typeof defaultElement> =
  PolymorphicProps<E> & Props

export function TextWithLineJumps<
  E extends ElementType = typeof defaultElement,
>({ text, linesClassName, as, ...props }: TextProps<E>) {
  const Element = as ?? defaultElement
  const lines = text.split('\\n')

  return (
    <Element {...props}>
      {lines.map((el) => (
        <span className={cn('block', linesClassName)}>{el}</span>
      ))}
    </Element>
  )
}

TextWithLineJumps.displayName = 'TextWithLineJumps'
