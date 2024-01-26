import { Artist } from '@/lib/types/artist'

type AdminArtistState = Artist[]

export type EditPayload = {
  slug: string
  name?: string
  description?: string
  styles?: string[]
  // facebook?: string
  // instagram?: string
  // website?: string
}
type ImagesPayload = {
  slug: string
  profile?: File
  background?: File
}
export type EditMediasPayload = Artist['medias'] & {
  slug: string
}

export type AdminArtistAction =
  | { type: 'edit-styles'; payload: EditPayload }
  | { type: 'images-change'; payload: ImagesPayload }
  | { type: 'delete'; payload: string }
  | { type: 'edit-medias'; payload: EditMediasPayload }

export const AdminArtistReducer = (
  state: AdminArtistState,
  action: AdminArtistAction
): AdminArtistState => {
  if (action.type === 'delete') {
    return state.filter((artist) => artist.slug !== action.payload)
  }

  console.log('test', action.payload)
  if (action.type === 'edit-styles') {
    return state.map((artist) => {
      if (artist.slug === action.payload.slug) {
        return {
          ...artist,
          name: action.payload.name || artist.name,
          description: action.payload.description || artist.description,
          styles: action.payload.styles || artist.styles,
        }
      }
      return artist
    })
  }

  if (action.type === 'edit-medias') {
    return state.map((artist) => {
      if (artist.slug === action.payload.slug) {
        return {
          ...artist,
          medias: {
            facebook: action.payload.facebook,
            instagram: action.payload.instagram,
            website: action.payload.website,
          },
        }
      }
      return artist
    })
  }

  return state
}
