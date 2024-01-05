export interface RawTattoo {
  id: number
  slug: string
  type: 'single' | 'double' | 'quad'
  styles: string[]
  tags: string[]

  images: RawTattooImages
  imagesId: number

  artist: RawArtist
  artistSlug: string
}

export interface RawTattooImages {
  id: number

  main_src: string
  main_width: number
  main_height: number
  main_blured: string

  card_src: string
  card_width: number
  card_height: number
  card_blured: string

  tattoo: RawTattoo | null
}

export interface RawArtist {
  slug: string
  name: string
  tattoos: RawTattoo[]
}
