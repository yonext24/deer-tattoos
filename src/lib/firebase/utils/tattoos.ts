import { Tattoo, TattooWithIndex } from '@lib/types/tattoo'
import { sortTats } from '@/lib/utils/sortTats'
import tattoos from '../../../../public/tattoos.json'
import { removeAccents, searchInEvery } from '@/lib/utils/utils'

export const getTattoos = async ({
  search,
  style,
}: {
  search?: string
  style?: string | string[]
}): Promise<Tattoo[]> => {
  await new Promise((res) => {
    setTimeout(res, 2000)
  })

  const filtered = (tattoos as Tattoo[]).filter((el) => {
    const stylesOfTattoo = el.styles
    const normalizedStylesOfTattoo = stylesOfTattoo.map((el) =>
      removeAccents(el),
    )

    const stack = []

    if (search) stack.push(searchInEvery(search, el.tags))
    if (Array.isArray(style)) {
      const normalizedPropStyles = style.map((el) => removeAccents(el))

      normalizedPropStyles.forEach((style) => {
        stack.push(normalizedStylesOfTattoo.includes(style))
      })
    }
    if (typeof style === 'string') {
      stack.push(normalizedStylesOfTattoo.includes(removeAccents(style)))
    }

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

export const getRankedTattoos = async (): Promise<Tattoo[]> => {
  await new Promise((res) => {
    setTimeout(res, 500)
  })

  return tattoos
    .map(({ type, ...el }) => ({ ...el, type: type as Tattoo['type'] }))
    .slice(0, 4)
}
