/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Button } from '@/components/shadcn/ui/button'
import { Input } from '@/components/shadcn/ui/input'
import { cn } from '@/lib/utils/utils'
import { InputPopover } from './input-popover'
import { useNavInput } from './use-nav-input'

type NavInputProps = {} & React.InputHTMLAttributes<HTMLInputElement>

export const NavInput = (props: NavInputProps) => {
  const {
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
  } = useNavInput()

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
      className="flex items-center max-w-[600px] w-full col-span-2 relative"
    >
      <Input
        ref={inputRef}
        {...props}
        value={value}
        onFocus={() => {
          if (search.length > 0) setOpen(true)
        }}
        onBlur={() => {
          setTimeout(() => {
            setOpen(false)
          }, 100)
        }}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        className={cn(props.className, 'rounded-r-none')}
      />
      <Button disabled={props.disabled} className="rounded-l-none">
        Buscar
      </Button>
      {search.length > 0 && open && (
        <InputPopover
          handleOptionClick={handleOptionClick}
          formRef={formRef}
          open={open}
          items={search}
          closeSelf={() => {
            setOpen(false)
          }}
          currentIndex={currentIndex}
        />
      )}
    </form>
  )
}
