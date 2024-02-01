/* eslint-disable react-hooks/exhaustive-deps */
import { appFetch } from '@/lib/utils/appFetch'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as zod from 'zod'

const MAX_FILE_SIZE = 15000000

const formSchema = zod.object({
  type: zod.enum(['single', 'double', 'quad']),
  title: zod
    .string({
      required_error:
        'El título es obligatorio y debe tener como mínimo un caracter',
    })
    .min(1, 'El título es obligatorio y debe tener como mínimo un caracter')
    .max(70, 'El título no puede tener más de 70 caracteres'),
  styles: zod
    .array(zod.string().min(1))
    .nonempty({ message: 'Tenés que elegir al menos un estilo' }),
  tags: zod.array(zod.string().min(1)),
  image: zod
    .object({
      card: zod.any(),
      original: zod.any(),
      card_height: zod.number(),
      card_width: zod.number(),
    })
    .refine(({ card, original }) => Boolean(card) && Boolean(original), {
      message: 'Tenés que elegir una imágen para el tatuaje',
    })
    .refine(({ original }) => original?.size <= MAX_FILE_SIZE, {
      message: `El tamaño máximo permitido es 15MB`,
    }),
  // .refine(
  //   ({ card }) => card?.type,
  //   'Algo salió mal al subir la imágen, volvé a intenarlo.',
  // ),
  artist: zod.object({
    slug: zod.string().min(1).nullable(),
  }),
})

export type AddTatuajesFormValues = zod.infer<typeof formSchema>

const formDefaultValues = {
  title: '',
  type: 'single' as 'single' | 'double' | 'quad',
  styles: [],
  tags: [],
  image: {
    card: undefined,
    card_height: undefined,
    card_width: undefined,
    original: undefined,
  },
  artist: {
    slug: null,
  },
}
export function useAddTatuajesForm() {
  const form = useForm<AddTatuajesFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  })

  const imageRef = useRef<any>(null)

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      imageRef?.current?.reset()
      form.reset(formDefaultValues)
    }
  }, [form.formState.isSubmitSuccessful])

  const onSubmit = async (data: zod.infer<typeof formSchema>) => {
    const formData = new FormData()

    formData.append('card', data.image.card as Blob)
    formData.append('card_height', data.image.card_height.toString())
    formData.append('card_width', data.image.card_width.toString())
    formData.append('original', data.image.original as File)
    formData.append('type', data.type)
    formData.append('styles', JSON.stringify(data.styles))
    formData.append('tags', JSON.stringify(data.tags))
    formData.append('artist', JSON.stringify(data.artist))
    formData.append('title', data.title)

    const toastId = 'add-tatuaje-loading-toast'
    toast.loading('El tatuaje se está creando', { id: toastId })
    try {
      await appFetch('/api/tattoos', { method: 'POST', body: formData })
      toast.success('El tatuaje se creó correctamente')
    } catch (err) {
      toast.error(
        'Algo salió mal al crear el tatuaje, porfavor inténtalo denuevo :('
      )
    } finally {
      toast.dismiss(toastId)
    }
  }

  return { form, onSubmit, imageRef }
}
