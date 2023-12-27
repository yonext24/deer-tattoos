'use client'

import { DoubleLeftIcon } from '@/components/icons'
import { cn } from '@/lib/utils/utils'
import { useRouter } from 'next/navigation'
import { HTMLAttributes } from 'react'

export function Back({
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement>) {
  const router = useRouter()

  const handleClick = () => {
    router.back()
  }

  return (
    <button
      role="link"
      onClick={handleClick}
      className={cn(
        'flex gap-2 items-center group text-white transition-colors hover:text-green-lighter font-extralight',
        className,
      )}
      {...props}
    >
      <DoubleLeftIcon className="h-5 w-5" />
      <span className="group-hover:underline">Volver</span>
    </button>
  )
}
