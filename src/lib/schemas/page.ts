import * as z from 'zod'

export const createPageSchema = z.object({
  title: z.string().min(1, 'Este campo es obligatorio').max(40, 'Este campo puede tener como máximo 40 caracteres.'),
  content: z.string().min(1, 'Este campo es obligatorio'),
  description: z.string().min(1, 'Este campo es obligatorio.'),
})

export const updatePageSchema = z.object({
  content: z.string().min(1, 'Este campo es obligatorio'),
  description: z.string().min(1, 'Este campo es obligatorio.'),
  id: z.string().min(1, 'Algo salió mal')
})