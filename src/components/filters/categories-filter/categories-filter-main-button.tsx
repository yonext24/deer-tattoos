/* eslint-disable react/display-name */
'use client'

import { Badge } from '@/components/shadcn/ui/badge'
import { Button } from '@/components/shadcn/ui/button'
import { Separator } from '@/components/shadcn/ui/separator'
import { cn } from '@/lib/utils/utils'
import { HTMLAttributes, forwardRef } from 'react'

type Props = HTMLAttributes<HTMLButtonElement> & {
  selectedValues: string[]
}

export const CategoriesFilterMainButton = forwardRef<HTMLButtonElement, Props>(
  ({ selectedValues, className, ...props }, ref) => {
    return (
      <Button
        variant="outline"
        size="default"
        className={cn('h-8 border-dashed', className)}
        ref={ref}
        {...props}
      >
        Estilos
        {selectedValues?.length > 0 && (
          <>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <Badge
              variant="secondary"
              className="rounded-sm px-1 font-normal lg:hidden"
            >
              {selectedValues.length}
            </Badge>
            <div className="hidden space-x-1 lg:flex">
              {selectedValues.map((option) => (
                <Badge
                  variant="outline"
                  key={option}
                  className="rounded-sm px-1 font-normal text-gold border-gold/20"
                >
                  {option}
                </Badge>
              ))}
            </div>
          </>
        )}
      </Button>
    )
  },
)
