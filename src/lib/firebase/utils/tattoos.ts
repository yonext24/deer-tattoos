import { Tattoo, TattooWithIndex } from '@lib/types/tattoo'
import { sortTats } from '@/lib/utils/sortTats'
import tattoos from '../../../../public/tattoos.json'
import { searchInEvery } from '@/lib/utils/utils'

export const getTattoos = async ({
  search,
  style,
}: {
  search?: string
  style?: string
}): Promise<Tattoo[]> => {
  await new Promise((res) => {
    setTimeout(res, 300)
  })

  const filtered = (tattoos as Tattoo[]).filter((el) => {
    const stack = []

    if (search) stack.push(searchInEvery(search, el.tags))
    if (style) stack.push(el.styles.includes(style))

    return stack.every((el) => el)
  })

  const filteredWithIndex: TattooWithIndex[] = filtered.map(
    (el, num): TattooWithIndex => ({
      ...el,
      __number__: num,
      type: el.type as TattooWithIndex['type'],
    }),
  )

  const a = sortTats(filteredWithIndex)

  return a
}
