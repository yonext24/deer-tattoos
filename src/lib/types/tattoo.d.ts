export type Tattoo = {
  id: number
  images: {
    main: {
      height: number
      width: number
      src: string
    }
    bluredImg: string
  }
  type: 'single' | 'double' | 'quad'
  styles: string[]
  tags: string[]
  artist: {
    name: string
    slug: string
  }
}

export type TattooWithIndex = Tattoo & { __number__: number }
