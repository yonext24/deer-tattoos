import { CategoriesFilter } from './categories-filter/categories-filter'
import { ClearFilterButton } from './position-filter/clear-filters/clear-filter-button'
import PositionFilter from './position-filter/position-filter'

export function Filters() {
  return (
    <div className="flex gap-4">
      <CategoriesFilter />
      <PositionFilter />
      <ClearFilterButton />
    </div>
  )
}
