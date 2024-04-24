import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectGroup,
  SelectItem,
} from '@/components/shadcn/ui/select'
import { ShopProduct } from '@/lib/shop/types'

export function ProductVariantSelector({
  variations,
  onChange,
}: {
  variations: ShopProduct['variations']
  onChange: (variation: string | null) => void
}) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecciona una variante"></SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {variations.map((variation) => {
            return (
              <SelectItem
                data-available={variation.stock >= 1}
                className="data-[available=false]:text-red-500 data-[available=false]:cursor-not-allowed"
                key={variation.name}
                value={variation.name}
              >
                <div className="flex gap-2">
                  <span>{variation.name}</span>
                  <span className="text-neutral-600">({variation.stock})</span>
                </div>
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
