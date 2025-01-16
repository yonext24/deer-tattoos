/* eslint-disable react/display-name */
'use client'

import { Button } from '@/components/shadcn/ui/button'
import { Separator } from '@/components/shadcn/ui/separator'
import { GoldBadge } from '@/components/ui/common/gold-badge'
import { cn } from '@/lib/utils/utils'
import { FilterIcon } from 'lucide-react'
import { HTMLAttributes, forwardRef } from 'react'

type Props = HTMLAttributes<HTMLButtonElement> & {
  selectedValues: string[]
}

const AMOUNT_TRESHOLD = 3

export const CategoriesFilterMainButton = forwardRef<HTMLButtonElement, Props>(
  ({ selectedValues, className, ...props }, ref) => {
    return (
      <Button
        variant="outline"
        size="default"
        className={cn(
          'h-8 border-border hover:border-gold transition-colors flex gap-2',
          className
        )}
        ref={ref}
        {...props}
      >
        <FilterIcon height={14} width={14} />
        Estilos
        {selectedValues?.length > 0 && (
          <>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <GoldBadge variant="outline" className="lg:hidden">
              {selectedValues.length}
            </GoldBadge>
            <div className="hidden space-x-1 lg:flex">
              {selectedValues.slice(0, AMOUNT_TRESHOLD).map((option) => (
                <GoldBadge variant="outline" key={option}>
                  {option}
                </GoldBadge>
              ))}
              {selectedValues.length > AMOUNT_TRESHOLD && (
                <GoldBadge variant="outline">
                  +
                  {
                    selectedValues.slice(AMOUNT_TRESHOLD, selectedValues.length)
                      .length
                  }
                </GoldBadge>
              )}
            </div>
          </>
        )}
      </Button>
    )
  }
)
