'use client'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shadcn/ui/form'
import { pageData } from '@/lib/backend/utils/data'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { MediaPicker } from '../add-artists/media-picker'
import { SubmitButton } from '../common/submit-button'
import { appFetch } from '@/lib/utils/appFetch'
import { toast } from 'sonner'
import { useEffect } from 'react'

const dataFormSchema = z.object({
  main_data: z
    .string({ required_error: 'Este campo requiere al menos 100 caracteres' })
    .max(230, 'Este campo como maximo puede tener 230 caracteres')
    .min(100, 'Este campo requiere al menos 100 caracteres'),
  footer_data: z
    .string({ required_error: 'Este campo requiere al menos 50 caracteres' })
    .max(165, 'Este campo puede tener como maximo 165 caracteres')
    .min(50, 'Este campo requiere al menos 50 caracteres'),
  who_we_are: z
    .string()
    .min(250, 'Este campo requiere al menos 250 caracteres')
    .max(400, 'Este campo puede tener como maximo 400 caracteres'),
  instagram: z
    .string()
    .url(
      'Este campo tiene que ser una url válida, por ejemplo: "https://google.com"'
    )
    .or(z.literal('')),
  facebook: z
    .string()
    .url(
      'Este campo tiene que ser una url válida, por ejemplo: "https://google.com"'
    )
    .or(z.literal('')),
  twitter: z
    .string()
    .url(
      'Este campo tiene que ser una url válida, por ejemplo: "https://google.com"'
    )
    .or(z.literal('')),
})

export function EditDataForm({ data }: { data: pageData }) {
  const form = useForm<z.infer<typeof dataFormSchema>>({
    defaultValues: data,
    resolver: zodResolver(dataFormSchema),
  })

  const {
    resetField,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, isSubmitSuccessful },
    control,
  } = form

  const onSubmit = handleSubmit(async (data) => {
    if (!isDirty) return

    await appFetch('/api/data', { method: 'POST', body: JSON.stringify(data) })
      .then(() => {
        toast.success('Los datos se cambiaron correctamente.')
        reset(data)
      })
      .catch((err) => {
        toast.error(err)
      })
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <FormField
          control={control}
          name="main_data"
          render={({ field: { onChange, value } }) => {
            return (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Descripción principal</FormLabel>
                <FormControl>
                  <MediaPicker
                    isTextarea
                    withCancelButton
                    rows={4}
                    className={'w-full'}
                    spellCheck={false}
                    allowEmpty
                    onAccept={onChange}
                    reset={() => resetField('main_data')}
                    extValue={value}
                    initializeSaved
                  />
                </FormControl>
                <FormDescription>
                  <span>
                    Esta es la primer que aparece en el inicio de la página, lo
                    primero que leen los usuarios al entrar:
                  </span>
                  <Image
                    className="max-w-[260px] border-neutral-900 rounded border"
                    src="/main_title.webp"
                    height={305}
                    width={605}
                    alt="imagen"
                  />
                </FormDescription>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={control}
          name="who_we_are"
          render={({ field: { onChange, value } }) => {
            return (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Quienes somos</FormLabel>
                <FormControl>
                  <MediaPicker
                    isTextarea
                    withCancelButton
                    rows={4}
                    className={'w-full'}
                    spellCheck={false}
                    allowEmpty
                    onAccept={onChange}
                    reset={() => resetField('main_data')}
                    extValue={value}
                    initializeSaved
                  />
                </FormControl>
                <FormDescription>
                  <span>
                    Este es el texto que aparece en la página principal
                    explicando cosas sobre el local.
                  </span>
                  <Image
                    className="max-w-[260px] border-neutral-900 rounded border"
                    src="/who_we_are.webp"
                    height={305}
                    width={605}
                    alt="imagen"
                  />
                </FormDescription>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={control}
          name="footer_data"
          render={({ field: { onChange, value } }) => {
            return (
              <FormItem className="flex flex-col items-start mt-4">
                <FormLabel>Descripción de pie</FormLabel>
                <FormControl>
                  <MediaPicker
                    isTextarea
                    withCancelButton
                    rows={4}
                    className={'w-full'}
                    spellCheck={false}
                    allowEmpty
                    onAccept={onChange}
                    reset={() => resetField('footer_data')}
                    extValue={value}
                    initializeSaved
                  />
                </FormControl>
                <FormDescription>
                  <span>Este es el texto que aparece en el pie de página</span>
                  <Image
                    className="max-w-[260px] border-neutral-900 rounded border"
                    src="/footer_data.webp"
                    height={305}
                    width={605}
                    alt="imagen"
                  />
                </FormDescription>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <div className="flex flex-col mt-4 gap-2">
          {(
            ['instagram', 'facebook', 'twitter'] as Array<
              'instagram' | 'facebook' | 'twitter'
            >
          ).map((type) => {
            return (
              <FormField
                key={type}
                control={control}
                name={type}
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col items-start [&>div]:!w-full">
                      <FormLabel className="capitalize">{type}</FormLabel>
                      <FormControl>
                        <MediaPicker
                          initializeSaved
                          allowEmpty
                          reset={() => {
                            resetField(type)
                          }}
                          className="w-full"
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
        </div>
        <SubmitButton
          text="Cambiar"
          loading={isSubmitting}
          className="self-start mt-4"
          type="submit"
        />
      </form>
    </Form>
  )
}
