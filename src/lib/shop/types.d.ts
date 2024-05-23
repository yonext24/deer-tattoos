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
  category: ShopCategory
}

export type ShopCategory = {
  name: string,
  slug: string
} 