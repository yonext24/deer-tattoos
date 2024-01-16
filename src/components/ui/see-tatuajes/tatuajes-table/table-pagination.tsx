import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNextButton,
  PaginationPreviousButton,
} from '@/components/shadcn/ui/pagination'
import { Tattoo } from '@/lib/types/tattoo'
import { Table } from '@tanstack/react-table'

export function TablePagination({
  total,
  page,
  table,
}: {
  total: number
  page: number
  table: Table<Tattoo>
}) {
  const canPrevious = table.getCanPreviousPage()
  const canNext = table.getCanNextPage()

  console.log(canPrevious)

  return (
    <Pagination>
      <PaginationContent>
        <PaginationPreviousButton
          aria-disabled={!canPrevious}
          tabIndex={(!canPrevious && -1) || undefined}
          data-disabled={!canPrevious}
          className="data-[disabled=true]:pointer-events-none"
          onClick={() => table.previousPage()}
          isActive={false}
        />

        {Array.from({ length: total }).map((el, fakeIndex) => {
          const index = fakeIndex + 1
          const isActive = page === fakeIndex

          return (
            <PaginationButton
              key={index}
              isActive={isActive}
              tabIndex={(isActive && -1) || undefined}
              data-disabled={isActive}
              className="data-[disabled=true]:pointer-events-none"
              onClick={() => table.setPageIndex(fakeIndex)}
            >
              {index}
            </PaginationButton>
          )
        })}

        <PaginationNextButton
          aria-disabled={!canNext}
          tabIndex={(!canNext && -1) || undefined}
          data-disabled={!canNext}
          className="data-[disabled=true]:pointer-events-none"
          onClick={() => table.nextPage()}
          isActive={false}
        />
      </PaginationContent>
    </Pagination>
  )
}
