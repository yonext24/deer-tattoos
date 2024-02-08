import { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & {
  className?: string
}

export function NavIcon({ className, ...props }: IconProps) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={`w-5 h-5 ${className ?? ''}`}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  )
}
