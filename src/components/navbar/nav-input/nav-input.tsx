/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Button } from '@/components/shadcn/ui/button'
import { cn } from '@/lib/utils/utils'
import { InputPopover } from './input-popover'
import { useNavInput } from './use-nav-input'
import { GoldBadge } from '@/components/ui/common/gold-badge'

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
    handleOptionClick,
    formRef,
    styles,
    showingCategories,
    handleBlur,
    handleFocus,
    handleDeleteStyle,
    handleDeleteArtist,
    artist,
  } = useNavInput()

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
      className="flex items-center max-w-[600px] w-full col-span-2 relative"
    >
      <div
        className={cn(
          'grid grid-cols-1 w-full relative pl-2 bg-black/30 backdrop-blur',
          showingCategories && 'grid-cols-[auto_1fr]'
        )}
      >
        {showingCategories && (
          <div className="flex gap-px">
            {artist && (
              <GoldBadge onClick={handleDeleteArtist}>De: {artist}</GoldBadge>
            )}
            {styles.map((el) => (
              <GoldBadge
                onClick={() => {
                  handleDeleteStyle(el)
                }}
                key={el}
                variant={'outline'}
              >
                {el}
              </GoldBadge>
            ))}
          </div>
        )}
        <input
          type="text"
          {...props}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          className={cn(
            props.className,
            'rounded-r-none !outline-none bg-transparent h-full py-2 px-2 w-full [&:focus~#input-brother]:ring-ring'
          )}
        />
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none border border-border cursor-text ring-1 ring-transparent"
          id="input-brother"
        />
      </div>
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
