import { cache } from "react";
import { prisma } from '@backend/prisma'

export const getAllCategories = cache(async () => {
  return prisma.category.findMany()
})