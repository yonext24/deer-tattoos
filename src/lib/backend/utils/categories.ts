import { prisma } from '@backend/prisma'

export const getAllCategories = async () => {
  return prisma.category.findMany()
}
