'use client'

import { FilterIcon } from 'lucide-react'
import { FilterButton } from '../filter-button'
import { Separator } from '@/components/shadcn/ui/separator'
import { GoldBadge } from '@/components/ui/common/gold-badge'
import { forwardRef, HTMLAttributes } from 'react'

const AMOUNT_TRESHOLD = 3

type Props = HTMLAttributes<HTMLButtonElement> & {
  selectedValues: string[]
}

export const CategoriesFilterMainButton = forwardRef<HTMLButtonElement, Props>(
  ({ selectedValues, ...props }, ref) => {
    return (
      <FilterButton ref={ref} Icon={FilterIcon} {...props}>
        <>
          Estilo
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
                      selectedValues.slice(
                        AMOUNT_TRESHOLD,
                        selectedValues.length
                      ).length
                    }
                  </GoldBadge>
                )}
              </div>
            </>
          )}
        </>
      </FilterButton>
    )
  }
)

CategoriesFilterMainButton.displayName = 'CategoriesFilterMainButton'
