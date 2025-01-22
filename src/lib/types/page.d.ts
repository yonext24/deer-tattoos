export type PageWithoutId = {
  slug: string
  content: string
  title: string
  description: string
}

export type Page = PageWithoutId & {
  id: string
}