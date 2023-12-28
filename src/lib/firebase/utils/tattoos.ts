import { Tattoo } from '@lib/types/tattoo'
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

  const a = sortTats(
    tattoos
      .filter((el) => {
        const stack = []

        if (search) stack.push(searchInEvery(search, el.tags))
        if (style) stack.push(el.styles.includes(style))

        return stack.every((el) => el)
      })
      .map(
        (el, num): Tattoo => ({
          ...el,
          __number__: num,
          type: el.type as Tattoo['type'],
        }),
      ),
  )

  return a
}
