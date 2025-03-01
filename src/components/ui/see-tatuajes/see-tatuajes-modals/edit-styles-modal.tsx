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
import { ScalonatedInput } from '@/components/scalonated-input/scalonated-input'
import { PositionSelector } from '../../add-tatuajes/position-selector/position-selector'

const formSchema = z.object({
  styles: z.array(z.string().min(1)),
  tags: z.array(z.string().min(1)),
  position: z.string().min(1, 'La posición no es válida'),
})

export function EditStylesModal({
  initialStyles,
  initialTags,
  initialPosition,
  closeModal,
  id,
  onChangeData,
}: {
  onChangeData: (data: {
    tags?: string[]
    styles?: string[]
    position?: string
  }) => void
  id: string
  closeModal: () => void
  initialStyles?: string[]
  initialTags?: string[]
  initialPosition: string
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      styles: initialStyles ?? [],
      tags: initialTags ?? [],
      position: initialPosition ?? '',
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
      const res = await appFetch(`/api/tattoos`, {
        method: 'PATCH',
        body: JSON.stringify({ id, ...data }),
      })

      onChangeData(data)
      closeModal()
    } catch (error) {
      setError('root', { message: errorParser(error) })
    }
  })

  return (
    <div role="dialog" className={modalStyles({})}>
      <h3 className="font-semibold">Editar Propiedades</h3>
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
                    <ScalonatedInput
                      placeholder="Ingresa el tag"
                      onChange={onChange}
                      selectedValues={value}
                    />
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
            name="position"
            render={({ field: { onChange, value } }) => {
              return (
                <FormItem className="flex flex-col items-start max-w-[300px]">
                  <FormLabel>Posición</FormLabel>
                  <FormControl>
                    <PositionSelector onChange={onChange} value={value} />
                  </FormControl>
                  <FormDescription>
                    La posición donde está hecho el tatuaje.
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
