import { cn } from '@/lib/utils/utils'

type StylizedTextProps = {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  propsForElement?: any
  size?: number | string
}

export function StylizedText({
  text,
  as = 'h2',
  size = '3.75rem',
  propsForElement,
}: StylizedTextProps) {
  const Element = as as keyof JSX.IntrinsicElements

  return (
    <div
      style={{ fontSize: size }}
      className={cn('relative flex w-max h-max font-title')}
    >
      <span
        style={{
          right: '-6px',
          bottom: '-4px',
        }}
        className="absolute text-rblack h-full w-full select-none"
      >
        {text}
      </span>
      <Element
        className={cn('text-gold relative', propsForElement?.className)}
        {...propsForElement}
      >
        {text}
      </Element>
    </div>
  )
}
