/* eslint-disable react-hooks/exhaustive-deps */
import { appFetch } from '@/lib/utils/appFetch'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
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
    .regex(
      /^[a-zA-Z\s]+$/,
      'El título solo puede contener letras (sin acentos)'
    )
    .min(1, 'El título es obligatorio y debe tener como mínimo un caracter')
    .max(70, 'El título no puede tener más de 70 caracteres'),
  styles: zod
    .array(zod.string().min(1))
    .nonempty({ message: 'Tenés que elegir al menos un estilo' }),
  tags: zod.array(zod.string().min(1)),
  image: zod
    .object({
      card: zod.any(),
      card_height: zod.any(),
      card_width: zod.any(),
      original: zod.any(),
    })
    .refine(({ card, original }) => Boolean(card) && Boolean(original), {
      message: 'Tenés que elegir una imágen para el tatuaje',
    })
    .refine(({ original }) => original?.size <= MAX_FILE_SIZE, {
      message: `El tamaño máximo permitido es 15MB`,
    })
    .refine(
      ({ card_height, card_width }) =>
        !isNaN(Number(card_height)) && !isNaN(Number(card_width)),
      {
        message: 'Algo salió mal al subir la imágen, volvé a intenarlo.',
      }
    ),
  // .refine(
  //   ({ card }) => card?.type,
  //   'Algo salió mal al subir la imágen, volvé a intenarlo.',
  // ),
  artist: zod.object({
    slug: zod.string().min(1),
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
    slug: '',
  },
}
export function useAddTatuajesForm() {
  const form = useForm<AddTatuajesFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  })

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset(formDefaultValues)
    }
  }, [form.formState.isSubmitSuccessful])

  const onSubmit = (data: zod.infer<typeof formSchema>) => {
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

    appFetch('/api/tattoos', { method: 'POST', body: formData }).then((res) => {
      toast.success('El tatuaje se creó correctamente')
    })
  }

  return { form, onSubmit }
}
