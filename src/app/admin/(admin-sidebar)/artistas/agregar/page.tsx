/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '@/components/shadcn/ui/form'
import { Input } from '@/components/shadcn/ui/input'
import { Separator } from '@/components/shadcn/ui/separator'
import { Textarea } from '@/components/shadcn/ui/textarea'
import { BackgroundPicker } from '@/components/ui/add-artists/images-picker/background-picker'
import { ProfilePicker } from '@/components/ui/add-artists/images-picker/profile-picker'
import { MediaPicker } from '@/components/ui/add-artists/media-picker'
import { CategorySelector } from '@/components/ui/add-tatuajes/category-selector/category-selector'
import { Main } from '@/components/ui/common/main'
import { SubmitButton } from '@/components/ui/common/submit-button'
import { errorParser } from '@/lib/utils/appFetch'
import { imageTypeValidation, imageValidation } from '@/lib/utils/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

const artistFormSchema = z.object({
  name: z
    .string({ required_error: 'El nombre es obligatorio.' })
    .min(1, 'El nombre es requerido')
    .max(24, 'El nombre debe tener menos de 24 caracteres.')
    .refine((val) => !val.startsWith(' '), {
      message: 'El nombre no puede empezar con un espacio',
    }),
  description: z
    .string({ required_error: 'La descripción es obligatoria.' })
    .min(15, 'La descripción debe tener al menos 15 caracteres.')
    .max(80, 'El máximo de caracteres es 80'),
  user: z
    .string()
    .refine((val) => !val.includes(' '), {
      message: 'El usuario no puede tener espacios',
    })
    .optional()
    .or(z.literal('')),

  images: z.object({
    profile: z
      .any()
      .refine(imageValidation, {
        message: 'La imágen de perfil debe ser un archivo y es obligatoria',
      })
      .refine(imageTypeValidation, {
        message:
          'El formato de la imágen de perfil debe ser png, jpg, jpeg o webp',
      }),
    background: z
      .any()
      .refine(imageValidation, {
        message: 'La imágen de fondo debe ser un archivo',
      })
      .refine(imageTypeValidation, {
        message:
          'La imágen de fondo debe ser un archivo de tipo png, jpg, jpeg o webp',
      })
      .optional(),
  }),

  media: z.object({
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
  }),

  styles: z.array(z.string().min(1)),
})

type MediaTypes = Array<keyof z.infer<typeof artistFormSchema>['media']>
const initialValues = {
  name: '',
  description: '',
  user: '',
  images: {
    profile: '',
    background: '',
  },
  media: {
    instagram: '',
    facebook: '',
    website: '',
  },
  styles: [],
}

export default function Page() {
  const form = useForm<z.infer<typeof artistFormSchema>>({
    resolver: zodResolver(artistFormSchema),
    defaultValues: initialValues,
  })

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
    setError,
  } = form

  const profileRef = useRef<any>(null)
  const backgroundRef = useRef<any>(null)

  useEffect(() => {
    if (isSubmitSuccessful) {
      profileRef.current?.reset()
      backgroundRef.current?.reset()
      form.reset(initialValues)
    }
  }, [isSubmitSuccessful])

  const onSubmit = async (data: z.infer<typeof artistFormSchema>) => {
    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('styles', JSON.stringify(data.styles))
    formData.append('profile', data.images.profile)
    formData.append('background', data.images.background)

    data.user && formData.append('user', data.user)
    data.media.instagram && formData.append('instagram', data.media.instagram)
    data.media.facebook && formData.append('facebook', data.media.facebook)
    data.media.website && formData.append('website', data.media.website)

    const toastId = 'creating-artist'
    toast.loading('Creando artista', { id: toastId })
    try {
      await fetch('/api/artists', {
        method: 'POST',
        body: formData,
      })
      profileRef.current?.reset()
      backgroundRef.current?.reset()
      toast.success('Artista creado')
    } catch (err) {
      const message = `Algo salió mal al crear el tatuaje :( ${errorParser(
        err
      )})`
      setError('root', { message })
      toast.error('Algo salió mal al crear el artista :(')
    } finally {
      toast.dismiss(toastId)
    }
  }
  return (
    <Main withAnalytics={false} className="max-w-[800px] px-3 py-5">
      <h1 className="text-2xl font-extralight">Agregar artista</h1>
      <Separator className="my-4" />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input autoFocus className="md:max-w-[300px]" {...field} />
                  </FormControl>
                  <FormDescription>El nombre del artista.</FormDescription>
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
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      className="md:max-w-[350px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    La descripción del artista, esta aparece en el inicio de la
                    página al presentar a los artistas.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={control}
            name="user"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Usuario (opcional)</FormLabel>
                  <FormControl>
                    <Input className="md:max-w-[300px]" {...field} />
                  </FormControl>
                  <FormDescription>
                    El usuario del artista, esto es lo que va a aparecer en la
                    url, por ejemplo: deer.com/artista/ejemplo. Por defecto la
                    url del artista se va a generar a partir de el nombre, si
                    querés modificar ese comportamiento podés hacerlo poniendo
                    algo acá. Esto puede ser útil si el artista tiene un
                    pseudónimo famoso, para aparecer más alto en las búsquedas
                    de google con ese pseudónimo
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
                  <FormLabel>Estilos del artista</FormLabel>
                  <FormControl>
                    <CategorySelector
                      onChange={onChange}
                      selectedValues={value}
                    />
                  </FormControl>
                  <FormDescription>
                    Los estilos en los que se especializa el artista, puede
                    quedar vacío.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={control}
            name="images.profile"
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
            name="images.background"
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
          <div className="flex flex-col">
            {(['instagram', 'facebook', 'website'] as MediaTypes).map(
              (media) => {
                return (
                  <FormField
                    key={media}
                    name={`media.${media}`}
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <FormItem>
                          <FormLabel className="capitalize">{media}</FormLabel>
                          <FormControl>
                            <MediaPicker
                              onAccept={onChange}
                              extValue={value!}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />
                )
              }
            )}
            <FormDescription className="mt-2">
              Los links a las redes del artista, ninguna opción es obligatoria.
            </FormDescription>
          </div>

          <SubmitButton
            loading={isSubmitting}
            className="self-start"
            text="Guardar artista"
          />
        </form>
      </Form>
    </Main>
  )
}
