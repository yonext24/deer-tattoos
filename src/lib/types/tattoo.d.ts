export type Tattoo = {
  id: number
  image: string
  type: 'single' | 'double' | 'quad'
  styles: string[]
  bluredImg: string
  tags: string[]
  __number__: number
}
