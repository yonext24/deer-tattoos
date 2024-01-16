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

export default function Page() {
  const { form, onSubmit } = useAddTatuajesForm()
  const { handleSubmit, control, watch } = form

  return (
    <Main className="max-w-[800px] px-3 py-5">
      <h1 className="text-2xl font-extralight">Agregar tatuaje</h1>

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
                    Este título se utiliza para formar la url, debería ser algo
                    descriptivo del tatuaje como {'"mariposa"'}.
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
                  <FormLabel>Imágen del tatuaje</FormLabel>
                  <FormControl>
                    <ImageSelector value={value} onChange={onChange} />
                  </FormControl>
                  <FormDescription>
                    La imágen del tatuaje, al subirla, se crearán dos versiones
                    de ella, la recortada y la original.
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
