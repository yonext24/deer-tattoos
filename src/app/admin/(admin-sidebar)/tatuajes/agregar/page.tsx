'use client'

import { Main } from '@/components/ui/common/main'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shadcn/ui/form'
import { useAddTatuajesForm } from '@/components/ui/add-tatuajes/use-add-tatuajes-form'
import { CategorySelector } from '@/components/ui/add-tatuajes/category-selector/category-selector'
import { Separator } from '@/components/shadcn/ui/separator'
import { TagsSelector } from '@/components/ui/add-tatuajes/tags-selector/tags-selector'
import { ImageSelector } from '@/components/ui/add-tatuajes/image-selector/image-selector'
import { Input } from '@/components/shadcn/ui/input'
import { ArtistSelector } from '@/components/ui/add-tatuajes/artist-selector/artist-selector'
import { SubmitButton } from '@/components/ui/common/submit-button'
import { ExtraImagesSelector } from '@/components/ui/add-tatuajes/extra-images-selector/extra-images-selector'

export default function Page() {
  const { form, onSubmit, imageRef, extraImagesRef } = useAddTatuajesForm()
  const { handleSubmit, control } = form

  return (
    <Main withAnalytics={false} className="max-w-[800px] px-3 py-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-extralight">Agregar tatuaje</h1>
      </div>

      <Separator className="my-4" />

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <FormField
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => {
              return (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Titulo</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="w-auto min-w-[400px]"
                      value={value}
                      onChange={onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Este título es el que aparecerá en la pestaña del navegador
                    en la página del tatuaje, por ejemplo: {value || '<Título>'}{' '}
                    | {'<Marca>'} Tattoos, también se utiliza para formar la
                    url.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
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

          <FormField
            control={control}
            name="styles"
            render={({ field: { onChange, value } }) => {
              return (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Estilos del tatuaje</FormLabel>
                  <FormControl>
                    <CategorySelector
                      onChange={onChange}
                      selectedValues={value}
                    />
                  </FormControl>
                  <FormDescription>
                    Estos estilos son los que se utilizan para filtrar los
                    tatuajes después.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={control}
            name="tags"
            render={({ field: { onChange, value } }) => {
              return (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Tags del tatuaje</FormLabel>
                  <FormControl>
                    <TagsSelector onChange={onChange} selectedValues={value} />
                  </FormControl>

                  <FormDescription>
                    Estos tags son utilizados para filtrar los tatuajes, a
                    diferencia de los estilos, los tags nunca son visibles, y
                    también se utilizan para generar la url del tatuaje.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            control={control}
            name="image"
            render={({ field: { onChange, value } }) => {
              return (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Imágen principal del tatuaje</FormLabel>
                  <FormControl>
                    <ImageSelector
                      ref={imageRef}
                      value={value}
                      onChange={onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    La imágen del tatuaje que aparecerá primero, y la que
                    aparecerá en la galería.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={control}
            name="extra_images"
            render={({ field: { value, onChange } }) => {
              return (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Imágen principal del tatuaje</FormLabel>
                  <FormControl>
                    <ExtraImagesSelector
                      ref={extraImagesRef}
                      value={value}
                      onChange={onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    La imágen del tatuaje que aparecerá primero, y la que
                    aparecerá en la galería.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <SubmitButton
            loading={form.formState.isSubmitting}
            type="submit"
            className="self-start"
            text="Agregar"
          />
        </form>
      </Form>
    </Main>
  )
}
