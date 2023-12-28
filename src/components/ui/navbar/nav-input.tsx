'use client'

import { Button } from '@/components/shadcn/ui/button'
import { Input } from '@/components/shadcn/ui/input'
import { createUrl } from '@/lib/utils/createUrl'
import { cn } from '@/lib/utils/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

type NavInputProps = {} & React.InputHTMLAttributes<HTMLInputElement>

export const NavInput = (props: NavInputProps) => {
  const [value, setValue] = useState<string>('')

  const router = useRouter()
  const params = useSearchParams()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!value && !params.get('search') && !params.get('style')) return

    const newParams = new URLSearchParams(params)

    if (value) {
      newParams.set('search', value)
    }

    router.push(createUrl('/tatuajes', newParams))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center max-w-[600px] w-full col-span-2"
    >
      <Input
        {...props}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        className={cn(props.className, 'rounded-r-none')}
      />
      <Button disabled={props.disabled} className="rounded-l-none">
        Buscar
      </Button>
    </form>
  )
}
