export type ShopProduct = {
  description: string,
  name: string,
  slug: string,
  images: {
    url: string
  }[],
  variations: {
    stock: number,
    name: string
  }[]
  price: string,
  _id: string
}

export type ShopCategory = {
  name: string,
  slug: string
} 