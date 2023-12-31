export type Artist = {
  slug: string
  name: string
  age: number
  description: string
  styles: string[]
  images: {
    background: string
    profile: string
  }
  media: {
    instagram: string
    facebook: string
    twitter: string
    web: string
  }
}
