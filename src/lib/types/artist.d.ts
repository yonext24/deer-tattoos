export type Artist = {
  slug: string
  name: string
  description: string
  styles: string[]
  images: {
    background: {
      src: string
      blured: string
    }
    profile: {
      src: string
      blured: string
    }
  }
  medias: {
    instagram: null | string
    facebook: null | string
    website: null | string
  }
}
