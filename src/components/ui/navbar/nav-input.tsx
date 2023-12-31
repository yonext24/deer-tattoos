/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Button } from '@/components/shadcn/ui/button'
import { Input } from '@/components/shadcn/ui/input'
import { createUrl } from '@/lib/utils/createUrl'
import { cn } from '@/lib/utils/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useDeferredValue, useEffect, useState } from 'react'
import debounce from 'just-debounce-it'
import { SearchResponse } from '@/app/api/search/route'
import { InputPopover } from './input-popover'

const matchPathname = (pathname: string) => {
  const acceptedPathnames = ['/tatuajes', '/tatuador/*/tatuajes']
  const accepted =
    acceptedPathnames.find((path) => {
      const reg = new RegExp(`^${path}`.replace('*', '[a-zA-Z]+'))
      return reg.test(pathname)
    }) !== undefined

  if (accepted) return pathname

  return accepted
}

type NavInputProps = {} & React.InputHTMLAttributes<HTMLInputElement>

export const NavInput = (props: NavInputProps) => {
  const [value, setValue] = useState<string>('')
  const [search, setSearch] = useState<SearchResponse>([])

  const router = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!value && !params.get('search') && !params.get('style')) return

    const newParams = new URLSearchParams(params)

    if (value) {
      newParams.set('search', value)
    }

    const pathToUse = matchPathname(pathname) || '/tatuajes'

    router.push(createUrl(pathToUse, newParams))
  }

  const deferred = useDeferredValue(value)
  const debouncedGetSearch = useCallback(
    debounce(async (search: string) => {
      fetch('/api/search?q=' + search)
        .then((res) => res.json())
        .then((data: SearchResponse) => {
          setSearch(data)
        })
    }, 250),
    [],
  )

  useEffect(() => {
    if (!deferred) return setSearch([])
    debouncedGetSearch(deferred)
  }, [deferred, setSearch, debouncedGetSearch])

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
      <InputPopover items={search} />
    </form>
  )
}
