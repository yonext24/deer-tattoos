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
import { appFetch, errorParser } from '@/lib/utils/appFetch'
import { SubmitModal } from '../../common/submit-modal'
import { ImagesPayload } from '../admin-artist-reducer'
import { imageTypeValidation } from '@/lib/utils/validations'
import { ProfilePicker } from '../../add-artists/images-picker/profile-picker'
import { BackgroundPicker } from '../../add-artists/images-picker/background-picker'
import { useRef } from 'react'
import { getDirtyData } from '@/lib/utils/utils'

const formSchema = z.object({
  profile: z
    .any()
    .refine(imageTypeValidation, {
      message:
        'El formato de la imágen de perfil debe ser png, jpg, jpeg o webp',
    })
    .optional(),
  background: z
    .any()
    .refine(imageTypeValidation, {
      message:
        'La imágen de fondo debe ser un archivo de tipo png, jpg, jpeg o webp',
    })
    .optional(),
})

export function ChangeArtistImagesModal({
  slug,
  closeModal,
  onChangeData,
}: {
  slug: string
  closeModal: () => void
  onChangeData: (props: ImagesPayload) => void
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      profile: undefined,
      background: undefined,
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

    const dirtyData = getDirtyData(data, dirtyFields)

    const dataToSend = new FormData()
    dirtyData.profile && dataToSend.append('profile', dirtyData.profile)
    dirtyData.background &&
      dataToSend.append('background', dirtyData.background)
    dataToSend.append('slug', slug)

    try {
      const res = await appFetch(`/api/artists`, {
        method: 'PUT',
        body: dataToSend,
      })

      onChangeData({ ...res, slug })
      closeModal()
    } catch (error) {
      setError('root', { message: errorParser(error) })
    }
  })

  const profileRef = useRef<any>(null)
  const backgroundRef = useRef<any>(null)

  return (
    <div role="dialog" className={modalStyles({})}>
      <h3 className="font-semibold">Cambiar Imágenes</h3>
      <Form {...form}>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <FormField
            control={control}
            name="profile"
            render={({ field: { value, onChange } }) => {
              return (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Imagen de perfil</FormLabel>
                  <FormControl>
                    <ProfilePicker
                      ref={profileRef}
                      value={value}
                      onChange={onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    La imagen de perfil del artista, esta aparece en el inicio
                    de la página al presentar a los artistas.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={control}
            name="background"
            render={({ field: { value, onChange } }) => {
              return (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Imagen de fondo</FormLabel>
                  <FormControl>
                    <BackgroundPicker
                      ref={backgroundRef}
                      value={value}
                      onChange={onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    La portada del artista, esta es la imágen que aparece en la
                    sidebar cuando entras a ver sus tatuajes.
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
