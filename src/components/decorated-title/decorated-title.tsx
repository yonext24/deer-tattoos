import { cn } from '@/lib/utils/utils'
import type {
  ComponentPropsWithoutRef,
  ElementType,
  PropsWithChildren,
} from 'react'

type PolymorphicAsProp<E extends ElementType> = {
  as?: E
}

type PolymorphicProps<E extends ElementType> = PropsWithChildren<
  ComponentPropsWithoutRef<E> & PolymorphicAsProp<E>
>

const defaultElement = 'h3'

type TextProps<E extends ElementType = typeof defaultElement> =
  PolymorphicProps<E>

export function DecoratedTitle<E extends ElementType = typeof defaultElement>({
  as,
  children,
  className,
  ...restProps
}: TextProps<E>) {
  const Component = as ?? defaultElement

  return (
    <Component
      {...restProps}
      className={cn(
        'bg-gradient-to-bl pb-1 from-white from-[69%] to-neutral-600 bg-clip-text bg-right-bottom',
        'text-4xl supports-[background-clip:text]:text-transparent relative z-10 w-max mx-auto',
        className
      )}
    >
      {children}
    </Component>
  )
}
