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
import { Button } from '@/components/shadcn/ui/button'
import { TagsSelector } from '../../add-tatuajes/tags-selector/tags-selector'
import { modalStyles } from '@/lib/utils/styles'

const formSchema = z.object({
  styles: z.array(z.string().min(1)),
  tags: z.array(z.string().min(1)),
})

export function EditStylesModal({
  initialStyles,
  initialTags,
  closeModal,
  id,
  onChangeData,
}: {
  onChangeData: (data: {
    tags?: string[]
    styles?: string[]
  }) => void
  id: string
  closeModal: () => void
  initialStyles?: string[]
  initialTags?: string[]
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      styles: initialStyles ?? [],
      tags: initialTags ?? [],
    },
    resolver: zodResolver(formSchema),
  })
  const { handleSubmit, control } = form
  const onSubmit = handleSubmit((data) => {
    onChangeData(data)
    closeModal()
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

          <div className="flex justify-end gap-4 mt-3">
            <Button variant="secondary" type="button" onClick={closeModal}>
              Cancelar
            </Button>
            <Button variant="default">Modificar</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
