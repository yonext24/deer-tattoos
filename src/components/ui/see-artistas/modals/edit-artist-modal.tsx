import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shadcn/ui/form'
import { useForm } from 'react-hook-form'
import { CategorySelector } from '../../add-tatuajes/category-selector/category-selector'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { modalStyles } from '@/lib/utils/styles'
import { appFetch, errorParser } from '@/lib/utils/appFetch'
import { SubmitModal } from '../../common/submit-modal'
import { EditPayload } from '../admin-artist-reducer'
import { Input } from '@/components/shadcn/ui/input'
import { Textarea } from '@/components/shadcn/ui/textarea'
import { getDirtyData } from '@/lib/utils/utils'

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'El nombre debe tener mínimo 3 caracteres' }),
  styles: z.array(z.string().min(1)),
  description: z
    .string()
    .min(15, { message: 'La descripción debe tener al menos 15 caracteres' })
    .max(200, { message: 'La descripción debe tener menos de 50 caracteres' }),
})

export function EditArtistModal({
  slug,
  styles,
  name,
  description,
  closeModal,
  onChangeData,
}: {
  slug: string
  name: string
  description: string
  styles: string[]
  closeModal: () => void
  onChangeData: (props: EditPayload) => void
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      styles: styles ?? [],
      name: name ?? '',
      description: description ?? '',
    },
    resolver: zodResolver(formSchema),
  })
  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting, errors, dirtyFields, isDirty },
  } = form
  const onSubmit = handleSubmit(async (data) => {
    if (!isDirty) return closeModal()

    try {
      // @ts-expect-error
      const dataToSend = getDirtyData(data, dirtyFields)

      await appFetch(`/api/artists`, {
        method: 'PATCH',
        body: JSON.stringify({ slug, ...dataToSend }),
      })

      onChangeData({ ...dataToSend, slug })
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
            name="name"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription className="text-[hsl(var(--muted-foreground))]">
                    El nombre del artista.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={control}
            name="description"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription className="text-[hsl(var(--muted-foreground))]">
                    La descripción del artista.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={control}
            name="styles"
            render={({ field: { onChange, value } }) => {
              return (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Estilos</FormLabel>
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
