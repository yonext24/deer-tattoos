'use client'

import { PinIcon } from 'lucide-react'
import { FilterButton } from '../filter-button'
import { HTMLAttributes, forwardRef } from 'react'

type Props = HTMLAttributes<HTMLButtonElement> & {
  currentPositions: string[]
}

export const PositionFilterMainButton = forwardRef<HTMLButtonElement, Props>(
  ({ currentPositions, ...props }, ref) => {
    return (
      <FilterButton ref={ref} Icon={PinIcon} {...props}>
        <p>Posición</p>
        {currentPositions.map((el, i, arr) => {
          const isLastOne = i === arr.length - 1
          return (
            <>
              {el}
              {!isLastOne && <span className="text-border">|</span>}
            </>
          )
        })}
      </FilterButton>
    )
  }
)

PositionFilterMainButton.displayName = 'PositionFilterMainButton'
