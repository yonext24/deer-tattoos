'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn/ui/table'
import { Tattoo } from '@/lib/types/tattoo'
import { flexRender } from '@tanstack/react-table'
import { useTatuajesTable } from './use-tatuajes-table'
import { TablePagination } from './table-pagination'

export function TatuajesTable({
  initial,
  total,
}: {
  initial: Tattoo[]
  total: number
}) {
  const { table, pagination } = useTatuajesTable({ initial, total })

  return (
    <>
      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((head) => {
                  return (
                    <TableHead key={head.id}>
                      {flexRender(
                        head.column.columnDef.header,
                        head.getContext()
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="h-24 text-center">No results.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        table={table}
        total={total}
        page={pagination.pageIndex}
      />
    </>
  )
}
