export type TattooWithoutArtist = {
  id: number
  slug: string
  images: {
    main: {
      height: number
      width: number
      src: string
      blured: string
    }
    card: {
      height: number
      width: number
      src: string
      blured: string
    }
  }
  type: 'single' | 'double' | 'quad'
  styles: string[]
  tags: string[]
}

export type Tattoo = TattooWithoutArtist & {
  artist: {
    slug: string
  }
}

export type TattooWithIndex = Tattoo & { __number__: number }
