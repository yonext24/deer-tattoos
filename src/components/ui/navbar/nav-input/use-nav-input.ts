'use client'

/* eslint-disable react-hooks/exhaustive-deps */
import { SearchResponse } from '@/app/api/search/route'
import { useClickOutside } from '@/hooks/useClickOutside'
import { createUrl, matchPathname } from '@/lib/utils/createUrl'
import debounce from 'just-debounce-it'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from 'react'

export function useNavInput() {
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')
  const [search, setSearch] = useState<SearchResponse>([])
  const [currentIndex, setCurrentIndex] = useState<number>(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (open) return
    setCurrentIndex(-1)
  }, [open])

  const router = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | number) => {
    if (typeof e !== 'number') {
      e.preventDefault?.()
    }

    if (
      !value &&
      !params.get('search') &&
      !params.get('style') &&
      currentIndex === -1
    )
      return

    const newParams = new URLSearchParams(params)

    const indexToUse = typeof e === 'number' ? e : currentIndex

    if (indexToUse > -1) {
      const item = search[indexToUse]
      setValue('')

      if (item.type === 'search') {
        newParams.set('search', item.content)
      } else if (item.type === 'category') {
        newParams.set('style', item.content)
      } else if (item.type === 'artist') {
        router.push(item.href)
        return
      }
    } else if (value) {
      newParams.set('search', value)
    }

    setOpen(false)
    setSearch([])
    inputRef.current?.blur?.()

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
          if (data.length > 0) setOpen(true)
        })
    }, 100),
    [],
  )

  useEffect(() => {
    if (!deferred) return setSearch([])
    debouncedGetSearch(deferred)
  }, [deferred, setSearch, debouncedGetSearch])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (['Escape', 'ArrowDown', 'ArrowUp'].includes(e.key)) e.preventDefault()

      if (e.key === 'Escape') {
        setOpen(false)
      } else if (e.key === 'ArrowDown') {
        setCurrentIndex((prev) => {
          if (prev === search.length - 1) return 0
          return prev + 1
        })
      } else if (e.key === 'ArrowUp') {
        setCurrentIndex((prev) => {
          if (prev === 0) return search.length - 1
          return prev - 1
        })
      }
    },
    [search.length],
  )

  const handleOptionClick = (index: number) => {
    handleSubmit(index)
    setCurrentIndex(index)
  }

  return {
    search,
    open,
    value,
    setValue,
    handleSubmit,
    handleKeyDown,
    currentIndex,
    setOpen,
    inputRef,
    handleOptionClick,
    formRef,
  }
}
