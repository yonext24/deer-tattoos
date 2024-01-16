export type Tattoo = {
  id: string
  slug: string
  title: string
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
  artistSlug: string
}

export type TattooWithIndex = Tattoo & { __number__: number }
