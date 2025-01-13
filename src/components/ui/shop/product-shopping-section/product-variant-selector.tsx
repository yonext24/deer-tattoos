import { ProductOption, ProductVariant } from '@/lib/shopify/types'
import { useProductShopping, useUpdateURL } from './product-shopping-context'
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/shadcn/ui/toggle-group'
import { Label } from '@/components/shadcn/ui/label'

type Combination = {
  id: string
  availableForSale: boolean
  [key: string]: string | boolean
}

export function ProductVariantSelector({
  variants,
  options,
}: {
  variants: ProductVariant[]
  options: ProductOption[]
}) {
  const { state, updateOption } = useProductShopping()
  const updateURL = useUpdateURL()
  const hasNoOptionsOrJustOneOption =
    !options.length || (options.length === 1 && options[0]?.values.length === 1)

  if (hasNoOptionsOrJustOneOption) {
    return null
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({
        ...accumulator,
        [option.name.toLowerCase()]: option.value,
      }),
      {}
    ),
  }))

  return options.map((option) => {
    return (
      <form key={option.id} className="w-full flex flex-col">
        <Label className="mb-1 text-neutral-200">{option.name}</Label>
        <ToggleGroup
          className="w-full justify-start"
          type="single"
          variant="outline"
          defaultValue={state[option.name.toLocaleLowerCase()]}
        >
          {option.values.map((value) => {
            const optionNameLowerCase = option.name.toLocaleLowerCase()
            const optionParams = { ...state, [optionNameLowerCase]: value }

            // Filter out invalid options and check if the option combination is available for sale.
            const filtered = Object.entries(optionParams).filter(
              ([key, value]) =>
                options.find(
                  (option) =>
                    option.name.toLowerCase() === key &&
                    option.values.includes(value)
                )
            )
            const isAvailableForSale = combinations.find((combination) =>
              filtered.every(
                ([key, value]) =>
                  combination[key] === value && combination.availableForSale
              )
            )

            // The option is active if it's in the selected options.
            const isActive = state[optionNameLowerCase] === value

            return (
              <ToggleGroupItem
                type="submit"
                data-is-active={isActive}
                className="data-[is-active=true]:!opacity-100 py-4 sm:py-2 h-auto"
                formAction={() => {
                  const newState = updateOption(optionNameLowerCase, value)
                  updateURL(newState)
                }}
                key={value}
                value={value}
                disabled={!isAvailableForSale || isActive}
              >
                {value}
              </ToggleGroupItem>
            )
          })}
        </ToggleGroup>
      </form>
    )
  })
}
