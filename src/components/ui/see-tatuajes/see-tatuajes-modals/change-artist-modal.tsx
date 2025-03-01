import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/shadcn/ui/form'
import { modalStyles } from '@/lib/utils/styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { ArtistSelector } from '../../add-tatuajes/artist-selector/artist-selector'
import { appFetch, errorParser } from '@/lib/utils/appFetch'
import { SubmitModal } from '../../common/submit-modal'

const formSchema = z.object({
  artist: z.object({
    slug: z
      .string()
      .min(1)
      .transform((val) => (val === 'Ninguno' ? null : val))
      .nullable(),
  }),
})

export function ChangeArtistModal({
  id,
  artistSlug,
  onArtistChange,
  closeModal,
}: {
  id: string
  artistSlug: string | null
  closeModal: () => void
  onArtistChange: (slug: string | null) => void
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      artist: {
        slug: artistSlug,
      },
    },
  })

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = form

  const onSubmit = handleSubmit(async (data) => {
    if (data.artist.slug === artistSlug) {
      closeModal()
      return
    }

    try {
      await appFetch('/api/tattoos', {
        method: 'PATCH',
        body: JSON.stringify({ id, artistSlug: data.artist.slug }),
      })

      onArtistChange(data.artist.slug)
      closeModal()
    } catch (err) {
      setError('root', { message: errorParser(err) })
    }
  })

  return (
    <div role="dialog" className={modalStyles({})}>
      <Form {...form}>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <h3 className="font-semibold">Editar artista</h3>
          <FormField
            control={control}
            name="artist.slug"
            render={({ field: { onChange, value } }) => {
              return (
                <FormItem className="flex flex-col items-start max-w-[300px]">
                  <FormLabel>Artista</FormLabel>
                  <FormControl>
                    <ArtistSelector onChange={onChange} value={value} />
                  </FormControl>
                  <FormDescription>
                    El artista del que va a ser el tatuaje, si no se elige uno
                    simplemente pertenecerá a la galería.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <SubmitModal
            loading={isSubmitting}
            error={errors?.root?.message}
            closeModal={closeModal}
          />
        </form>
      </Form>
    </div>
  )
}
