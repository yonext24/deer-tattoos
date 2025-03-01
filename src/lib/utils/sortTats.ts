import { Tattoo, TattooWithIndex } from '@lib/types/tattoo'

const isPair = (num: number) => num % 2 === 0

export const sortTats = (tats: Tattoo[]): Tattoo[] => {
  let sorted: TattooWithIndex[] = [...tats].map((el, index) => ({
    ...el,
    __number__: index,
  }))

  sorted.sort((a, b) => {
    if (!isPair(a.__number__) && !isPair(b.__number__)) return +1
    return 0
  })

  return sorted.map(({ __number__, ...rest }) => rest)
}
