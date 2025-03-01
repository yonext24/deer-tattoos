import { Style } from '@/lib/types/style'
import { ParsedRequest } from '@backend/middlewares/helpers'
import { prisma } from '@backend/prisma'
import { NextResponse } from 'next/server'

export const CATEGORIES_CONTROLLER = {
  getAllCategories: async () => {
    const categories = await prisma.category.findMany()

    return NextResponse.json(categories)
  },
  addCategory: async (req: ParsedRequest) => {
    const category = (await req.parsedBody()) as Style

    await prisma.category.create({ data: category })

    return NextResponse.json(category)
  },
  deleteCategory: async (req: ParsedRequest) => {
    const { name } = (await req.parsedBody()) as Style

    const allTattoosWithCategory = await prisma.tattoo.findMany({
      where: { styles: { has: name } },
    })
    allTattoosWithCategory.forEach(async (el) => {
      await prisma.tattoo.update({
        where: { id: el.id },
        data: { styles: { set: el.styles.filter((el) => el !== name) } },
      })
    })

    await prisma.category.delete({ where: { name } })

    return NextResponse.json({ name })
  },
}
