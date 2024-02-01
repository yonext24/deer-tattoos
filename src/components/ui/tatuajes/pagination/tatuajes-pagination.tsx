import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/shadcn/ui/pagination'

export function TatuajesPagination({
  total,
  page,
  path = '/tatuajes',
}: {
  total: number
  page: number
  path?: string
}) {
  const canPrevious = page > 1
  const canNext = page < total

  return (
    <Pagination>
      <PaginationContent>
        <PaginationPrevious
          aria-disabled={!canPrevious}
          tabIndex={(!canPrevious && -1) || undefined}
          data-disabled={!canPrevious}
          className="data-[disabled=true]:pointer-events-none"
          href={`${path}?page=${page - 1}`}
          isActive={false}
        />

        {Array.from({ length: total }).map((el, index) => {
          const isActive = page === index + 1
          return (
            <PaginationLink
              key={index}
              href={`${path}?page=${index + 1}`}
              isActive={page === index + 1}
              aria-disabled={page <= 1}
              tabIndex={(isActive && -1) || undefined}
              data-disabled={isActive}
              className="data-[disabled=true]:pointer-events-none"
            >
              {index + 1}
            </PaginationLink>
          )
        })}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationNext
          aria-disabled={!canNext}
          tabIndex={(!canNext && -1) || undefined}
          data-disabled={!canNext}
          className="data-[disabled=true]:pointer-events-none"
          href={`${path}?page=${page + 1}`}
          isActive={false}
        />
      </PaginationContent>
    </Pagination>
  )
}
