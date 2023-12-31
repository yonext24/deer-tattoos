import { SearchResponse } from '@/app/api/search/route'
import { Popover, PopoverContent } from '@/components/shadcn/ui/popover'

export function InputPopover({ items }: { items: SearchResponse }) {
  return (
    <Popover>
      <PopoverContent>{items.map((el) => el.content)}</PopoverContent>
    </Popover>
  )
}
