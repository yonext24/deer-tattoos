import { TAGS } from '@/lib/utils/consts'
import { prisma } from '@backend/prisma'
import { unstable_cache } from 'next/cache'

export type pageData = {
  id?: string,
  main_data: string
  footer_data: string,
  who_we_are: string,
  instagram: string,
  facebook: string,
  twitter: string

  email: string,
  address: string
}

const uncachedGetAllPageData = async (): Promise<pageData | null> => {
  const pageData = prisma.pageData.findFirst()

  return pageData
}

export const saveAllPageData = async (pageData: pageData) => {
  const actualPageData = await prisma.pageData.findFirst()

  try {

    if (actualPageData) {
      return await prisma.pageData.update({ where: { id: actualPageData.id }, data: pageData })
    }

    return await prisma.pageData.create({ data: pageData })
  } catch (err) {
    console.error(err)
    throw new Error('Ocurrió un error al intentar cambiar los datos.')

  }
}

export const getAllPageData = unstable_cache(uncachedGetAllPageData, ['page-data-cached'], { tags: [TAGS.data] })