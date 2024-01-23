import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/shadcn/ui/form'
import { useForm } from 'react-hook-form'
import { CategorySelector } from '../../add-tatuajes/category-selector/category-selector'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { modalStyles } from '@/lib/utils/styles'
import { errorParser } from '@/lib/utils/appFetch'
import { SubmitModal } from '../../common/submit-modal'
import { EditPayload } from '../admin-artist-reducer'

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'El nombre debe tener mínimo 3 caracteres' }),
  styles: z.array(z.string().min(1)),
  description: z
    .string()
    .min(15, { message: 'La descripción debe tener al menos 15 caracteres' })
    .max(200, { message: 'La descripción debe tener menos de 50 caracteres' }),
  media: z.object({
    instagram: z
      .string()
      .url('El instagram debe ser una url')
      .optional()
      .or(z.literal('')),
    facebook: z
      .string()
      .url('El facebook debe ser una url')
      .optional()
      .or(z.literal('')),
    website: z
      .string()
      .url('El website debe ser una url')
      .optional()
      .or(z.literal('')),
  }),
})

export function EditArtistModal({
  slug,
  styles,
  name,
  description,
  medias,
  closeModal,
  onChangeData,
}: {
  slug: string
  name: string
  description: string
  medias: {
    instagram: string | null
    facebook: string | null
    website: string | null
  }
  styles: string[]
  closeModal: () => void
  onChangeData: (props: EditPayload) => void
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      styles: styles ?? [],
      name: name ?? '',
      description: description ?? '',
      media: {
        instagram: medias.instagram ?? '',
        facebook: medias.facebook ?? '',
        website: medias.website ?? '',
      },
    },
    resolver: zodResolver(formSchema),
  })
  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting, errors },
  } = form
  const onSubmit = handleSubmit(async (data) => {
    try {
      // const res = await appFetch(`/api/tattoos`, {
      //   method: 'PATCH',
      //   body: JSON.stringify({ id, ...data }),
      // })

      onChangeData({ ...data, slug })
      closeModal()
    } catch (error) {
      setError('root', { message: errorParser(error) })
    }
  })

  return (
    <div role="dialog" className={modalStyles({})}>
      <h3 className="font-semibold">Editar estilos</h3>
      <Form {...form}>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <FormField
            control={control}
            name="styles"
            render={({ field: { onChange, value } }) => {
              return (
                <FormItem className="flex flex-col items-start">
                  <FormControl>
                    <CategorySelector
                      onChange={onChange}
                      selectedValues={value}
                    />
                  </FormControl>
                  <FormDescription className="text-[hsl(var(--muted-foreground))]">
                    Estos estilos son los que se utilizan para filtrar los
                    tatuajes después.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <SubmitModal
            closeModal={closeModal}
            loading={isSubmitting}
            error={errors.root?.message}
          />
        </form>
      </Form>
    </div>
  )
}
