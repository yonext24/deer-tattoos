'use client'

/* eslint-disable react/display-name */
import { cn } from '@/lib/utils/utils'
import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  forwardRef,
  useState,
} from 'react'
import Link, { LinkProps } from 'next/link'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  circleRadius?: `${number}px`
  href?: string
}

export const StylizedButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, onMouseMove, circleRadius = '50px', ...props },
    ref
  ) => {
    const [coords, setCoords] = useState<{ x: number; y: number }>({
      x: 0,
      y: 0,
    })

    const handleHover = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      const { offsetX, offsetY } = e.nativeEvent
      setCoords({ x: offsetX, y: offsetY })
    }

    return (
      <button
        ref={ref}
        className={cn(
          'rounded-xl text-lg px-6 py-2 w-max relative outline-1 outline outline-gold/90 hover:outline-transparent overflow-hidden group',
          'hover:[box-shadow:_0px_0px_50px_-12px_rgb(255_255_255_/_0.5);] transition-[box-shadow,outline-color] ml-px',
          'before:absolute before:top-px before:left-px before:w-[calc(100%-2px)] before:h-[calc(100%-2px)] before:z-[2] before:bg-black before:rounded-[inherit]',
          className
        )}
        onMouseMove={(e) => {
          handleHover(e)
          onMouseMove?.(e)
        }}
        {...props}
      >
        <div
          id="button_border"
          style={{
            backgroundImage: `radial-gradient(${circleRadius} at ${coords.x}px ${coords.y}px, rgb(195 151 3 / 0.9) 45%, rgba(255,255,255,.2), transparent)`,
          }}
          className="absolute left-0 top-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity"
        ></div>
        <span className="z-10 relative pointer-events-none">{children}</span>
      </button>
    )
  }
)

type AnchorProps = HTMLAttributes<HTMLAnchorElement> &
  LinkProps & {
    circleRadius?: `${number}px`
  }

export const StylizedLink = forwardRef<HTMLAnchorElement, AnchorProps>(
  (
    { children, className, onMouseMove, circleRadius = '50px', ...props },
    ref
  ) => {
    const [coords, setCoords] = useState<{ x: number; y: number }>({
      x: 0,
      y: 0,
    })

    const handleHover = (
      e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
      const { offsetX, offsetY } = e.nativeEvent
      setCoords({ x: offsetX, y: offsetY })
    }

    return (
      <Link
        ref={ref}
        className={cn(
          'rounded-xl text-lg px-6 py-2 w-max relative outline-1 outline outline-gold/90 hover:outline-transparent overflow-hidden group',
          'hover:[box-shadow:_0px_0px_50px_-12px_rgb(255_255_255_/_0.5);] transition-[box-shadow,outline-color] ml-px',
          'before:absolute before:top-px before:left-px before:w-[calc(100%-2px)] before:h-[calc(100%-2px)] before:z-[2] before:bg-black before:rounded-[inherit]',
          className
        )}
        onMouseMove={(e) => {
          handleHover(e)
          onMouseMove?.(e)
        }}
        {...props}
      >
        <div
          id="button_border"
          style={{
            backgroundImage: `radial-gradient(${circleRadius} at ${coords.x}px ${coords.y}px, rgb(195 151 3 / 0.9) 45%, rgba(255,255,255,.2), transparent)`,
          }}
          className="absolute left-0 top-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity"
        ></div>
        <span className="z-10 relative pointer-events-none">{children}</span>
      </Link>
    )
  }
)
