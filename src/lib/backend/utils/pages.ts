import { Page, PageWithoutId } from '@/lib/types/page'
import { TAGS } from '@/lib/utils/consts'
import { prisma } from '@backend/prisma'
import { unstable_cache } from 'next/cache'

export const uncachedGetPages = async () => {
  return prisma.page.findMany()
}

export const uncachedGetPageBySlug = async (slug: string) => {
  return prisma.page.findFirst({ where: { slug } })
}

export const updatePage = async (page: Omit<Omit<Page, 'slug'>, 'title'>) => {
  return prisma.page.update({
    where: { id: page.id },
    data: { content: page.content, description: page.description },
  })
}

export const deletePage = async (id: string) => {
  return prisma.page.delete({ where: { id } })
}

export const createPage = async (page: PageWithoutId) => {
  return prisma.page.create({ data: page })
}

export const getPages = unstable_cache(uncachedGetPages, ['pages', 'all'], {
  tags: [TAGS.pages],
})
export const getPageBySlug = unstable_cache(
  uncachedGetPageBySlug,
  ['pages', 'slug'],
  { tags: [TAGS.pages] }
)
