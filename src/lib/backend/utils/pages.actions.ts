"use server"

import { createPageSchema, updatePageSchema } from '@/lib/schemas/page'
import { TAGS } from '@/lib/utils/consts';
import { revalidateTag } from 'next/cache';
import { ZodError } from 'zod';
import { createPage, deletePage, updatePage } from './pages';
import { normalizeValue } from '@backend/utils/utils';
import { prisma } from '@backend/prisma'
import { Page } from '@/lib/types/page';

export type FormState = {
  message: string
  fieldIssues?: Record<string, { message: string }>
  status: number
};

// Im doing this because revalidateTag rerenders the entire page, closing the modals
const delayRevalidate = async () => {
  await new Promise(res => setTimeout(res, 5000))
  revalidateTag(TAGS.pages)
}

const formatErrors = <T extends { [key: string]: string }>(error: ZodError<T>) => {
  const formatedErrors = error.format()
  const fieldIssues: { [key: string]: { message: string } } = {}

  for (const key in formatedErrors) {
    if (key === '_errors') continue
    const issue = formatedErrors[key as keyof Omit<typeof formatedErrors, '_errors'>]

    if (issue) fieldIssues[key] = { message: issue?._errors[0] }
  }

  return fieldIssues
}

export const createPageAction = async (prevState: FormState, page: FormData): Promise<FormState & { page?: Page }> => {
  const formData = Object.fromEntries(page)
  const parsed = createPageSchema.safeParse(formData)

  if (!parsed.success) {
    const fieldIssues = formatErrors(parsed.error)

    return {
      status: -1,
      message: "Invalid form data",
      fieldIssues
    };
  }

  const slug = await generatePageSlug(parsed.data.title)
  try {

    const newPage = await createPage({ content: parsed.data.content, title: parsed.data.title, slug, description: parsed.data.description })
    delayRevalidate()
    return { message: 'La página se creó correctamente', status: 1, page: newPage }
  } catch (err) {
    console.error(err)
    return { message: 'Ocurrió un error al intentar crear la página', status: -1 }
  }

}

export const updatePageAction = async (prevState: FormState, page: FormData): Promise<FormState> => {
  const formData = Object.fromEntries(page)
  const parsed = updatePageSchema.safeParse(formData)


  if (!parsed.success) {
    const fieldIssues = formatErrors(parsed.error)

    return {
      status: -1,
      message: "Invalid form data",
      fieldIssues
    };
  }

  try {
    const newPage = await updatePage({ content: parsed.data.content, id: parsed.data.id, description: parsed.data.description })
    console.log({ newPage })
    delayRevalidate()
    return { message: 'La página se editó correctamente', status: 1 }
  } catch (err) {
    console.error(err)
    return { message: 'Ocurrió un error al intentar editar la página', status: -1 }
  }

}

export const deletePageAction = async (prevState: FormState, id: string): Promise<FormState> => {
  if (!id) return {
    message: 'Algo salió mal al obtener la página, porfavor inténtalo denuevo o contacta a soporte',
    status: -1,
    fieldIssues: {}
  }

  try {

    const deleted = await deletePage(id)
    delayRevalidate()
    return { message: 'La página se borró correctamente.', status: 1 }
  } catch (err) {
    console.error(err)
    return { message: 'Ocurrió un error al intentar borrar la página, porfavor inténtalo denuevo o contacta a soporte (h)', status: -1 }
  }

}

const generatePageSlug = async (title: string) => {
  const words = ['page', 'tattoo']
  let treatedTitle = normalizeValue(title.trim())
  let isValid = false
  let count = 0

  while (isValid) {
    isValid = Boolean(await prisma.page.findFirst({ where: { slug: treatedTitle } }))
    if (!isValid && count < words.length) {
      treatedTitle += words[count]
    } else if (!isValid && count >= words.length) {
      treatedTitle += count
    }
    count++
  }

  return treatedTitle
}