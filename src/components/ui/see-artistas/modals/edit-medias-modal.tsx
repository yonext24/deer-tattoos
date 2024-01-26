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
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { modalStyles } from '@/lib/utils/styles'
import { errorParser } from '@/lib/utils/appFetch'
import { SubmitModal } from '../../common/submit-modal'
import { EditMediasPayload } from '../admin-artist-reducer'
import { Artist } from '@/lib/types/artist'
import { MediaPicker } from '../../add-artists/media-picker'

const formSchema = z.object({
  instagram: z
    .string()
    .url('El instagram debe ser una url')
    .or(z.literal(''))
    .transform((value) => (value === '' ? null : value)),
  facebook: z
    .string()
    .url('El facebook debe ser una url')
    .or(z.literal(''))
    .transform((value) => (value === '' ? null : value)),
  website: z
    .string()
    .url('El website debe ser una url')
    .or(z.literal(''))
    .transform((value) => (value === '' ? null : value)),
})

type FormType = z.infer<typeof formSchema>
type MediaTypes = Array<'instagram' | 'facebook' | 'website'>

export function EditMediasModal({
  slug,
  medias,
  closeModal,
  onChangeData,
}: {
  slug: string
  medias: Artist['medias']
  closeModal: () => void
  onChangeData: (props: EditMediasPayload) => void
}) {
  console.log({ medias })

  const form = useForm<FormType>({
    defaultValues: {
      instagram: medias.instagram ?? '',
      facebook: medias.facebook ?? '',
      website: medias.website ?? '',
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
      <h3 className="font-semibold mb-4">Editar redes</h3>
      <Form {...form}>
        <form onSubmit={onSubmit} className="flex flex-col gap-2">
          {(['instagram', 'facebook', 'website'] as MediaTypes).map((type) => {
            return (
              <FormField
                key={type}
                control={control}
                name={type}
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="capitalize">{type}</FormLabel>
                      <FormControl>
                        <MediaPicker
                          onAccept={field.onChange}
                          extValue={field.value ?? ''}
                        />
                      </FormControl>
                      {/* <FormDescription className="text-[hsl(var(--muted-foreground))]"></FormDescription> */}
                      <FormMessage className="!mt-1" />
                    </FormItem>
                  )
                }}
              />
            )
          })}

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
