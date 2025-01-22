'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../shadcn/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../shadcn/ui/popover'
import { cn } from '@/lib/utils/utils'
import { useCurrentEditor } from '@tiptap/react'
import { Button } from '../shadcn/ui/button'

export const FormatSelector = () => {
  const { editor } = useCurrentEditor()

  const options = [
    {
      args: { name: 'heading', attributes: { level: 2 } },
      title: 'Título 2',
      id: 'h2',
      func: () => {
        editor?.chain().focus().toggleHeading({ level: 2 }).run()
      },
    },
    {
      args: { name: 'heading', attributes: { level: 3 } },
      title: 'Título 3',
      id: 'h3',
      func: () => {
        editor?.chain().focus().toggleHeading({ level: 3 }).run()
      },
    },
    {
      args: { name: 'heading', attributes: { level: 4 } },
      title: 'Título 4',
      id: 'h4',
      func: () => {
        editor?.chain().focus().toggleHeading({ level: 4 }).run()
      },
    },
    {
      args: { name: 'paragraph' },
      title: 'Párrafo',
      id: 'p',
      func: () => {
        editor?.chain().focus().setParagraph().run()
      },
    },
  ]
  const currentValue = options.find((op) => {
    return editor?.isActive(op.args.name, op.args.attributes)
  })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          className="w-[140px] justify-between"
        >
          <div className="w-px h-full bg-border" />
          {currentValue?.title}
          <ChevronsUpDown className="opacity-50" />
          <div className="w-px h-full bg-border" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[140px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  onSelect={() => {
                    option.func()
                  }}
                  value={option.id}
                >
                  {option.title}
                  {option.id === currentValue?.id && (
                    <Check className={cn('ml-auto')} />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
