/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { DoubleLeftIcon } from '@/components/icons'
import { cn } from '@/lib/utils/utils'
import { useRouter } from 'next-nprogress-bar'
import { HTMLAttributes } from 'react'
import { useHistoryStore } from '@/store/history-store'

export function Back({
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement>) {
  const router = useRouter()
  const { prevPath } = useHistoryStore()

  const handleClick = () => {
    router.replace(prevPath || '/')
  }

  return (
    <button
      role="link"
      aria-label="Volver a la pagina anterior"
      onClick={handleClick}
      className={cn(
        'flex gap-2 items-center group text-white transition-colors hover:text-green-lighter font-extralight',
        className
      )}
      {...props}
    >
      <DoubleLeftIcon className="h-5 w-5" />
      <span className="group-hover:underline">Volver</span>
    </button>
  )
}
