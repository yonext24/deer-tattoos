import { Tattoo } from '@/lib/types/tattoo'

type TatuajesState = Tattoo[]

type TatuajesAction =
  | { type: 'remove'; payload: number }
  | { type: 'change-page'; payload: Tattoo[] }
  | {
      type: 'change-artist'
      payload: { artistSlug: string | null; index: number }
    }
  | {
      type: 'change-data'
      payload: { index: number; tags?: string[]; styles?: string[] }
    }

export const TatuajesReducer = (
  state: TatuajesState,
  action: TatuajesAction
): TatuajesState => {
  if (action.type === 'remove') {
    return state.filter((_, i) => i !== action.payload)
  }
  if (action.type === 'change-page') {
    return action.payload
  }

  if (action.type === 'change-artist') {
    const { index, artistSlug } = action.payload

    return state.map((el, i) => {
      if (i !== index) return el
      return {
        ...el,
        artistSlug: artistSlug,
      }
    }) as Tattoo[]
  }

  if (action.type === 'change-data') {
    const { index, tags, styles } = action.payload

    return state.map((el, i) => {
      if (i !== index) return el
      return {
        ...el,
        tags: tags || el.tags,
        styles: styles || el.styles,
      }
    }) as Tattoo[]
  }

  return state
}
