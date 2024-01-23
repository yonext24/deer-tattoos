import { Artist } from '@/lib/types/artist'

type AdminArtistState = Artist[]

export type EditPayload = {
  slug: string
  name?: string
  description?: string
  styles?: string[]
  facebook?: string
  instagram?: string
  website?: string
}
type ImagesPayload = {
  slug: string
  profile?: File
  background?: File
}

export type AdminArtistAction =
  | { type: 'edit'; payload: EditPayload }
  | { type: 'images-change'; payload: ImagesPayload }
  | { type: 'delete'; payload: string }

export const AdminArtistReducer = (
  state: AdminArtistState,
  action: AdminArtistAction
): AdminArtistState => {
  if (action.type === 'delete') {
    return state.filter((artist) => artist.slug !== action.payload)
  }

  return state
}
