export type TattooImage = {
  height: number
  width: number
  src: string
  blured: string
}

export type Tattoo = {
  id: string
  slug: string
  title: string
  images: {
    images: TattooImage[]
    card: TattooImage
  }
  type: 'single' | 'double' | 'quad'
  styles: string[]
  tags: string[]
  artistSlug: string
  createdAt: Date
  updatedAt: Date
  position: string
}

export type TattooWithIndex = Tattoo & { __number__: number }
