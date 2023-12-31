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
  return (
    <Pagination>
      <PaginationContent>
        <PaginationPrevious
          aria-disabled={page <= 1}
          tabIndex={(page <= 1 && -1) || undefined}
          data-disabled={page <= 1}
          className="data-[disabled=true]:pointer-events-none"
          href={`${path}?page=${page - 1}`}
          isActive={page > 1}
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
          aria-disabled={total < page}
          tabIndex={(total < page && -1) || undefined}
          data-disabled={total < page}
          className="data-[disabled=true]:pointer-events-none"
          href={`${path}?page=${page + 1}`}
          isActive={page < total}
        />
      </PaginationContent>
    </Pagination>
  )
}
