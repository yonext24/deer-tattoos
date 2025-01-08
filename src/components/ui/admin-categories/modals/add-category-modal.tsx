import { Input } from '@/components/shadcn/ui/input'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormMessageGlobal,
} from '@/components/shadcn/ui/form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ScalonatedInput } from '@/components/scalonated-input/scalonated-input'
import { appFetch } from '@/lib/utils/appFetch'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/shadcn/ui/dialog'
import { Button } from '@/components/shadcn/ui/button'
import { SubmitButton } from '../../common/submit-button'
import { useAdminCategoriesActions } from '../use-admin-categories-page'

const formSchema = z.object({
  name: z.string().min(1, 'El nombre debe tener al menos un caracter'),
  variants: z.array(
    z.string().min(1, 'Las variantes deben tener al menos un caracter.')
  ),
})

export function AddCategoryModal({}: {}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      variants: [],
    },
  })
  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { isSubmitting },
  } = form
  const { state, dispatch } = useAdminCategoriesActions()
  const onSubmit = handleSubmit(async (style) => {
    if (state.findIndex((el) => el.name === style.name) !== -1)
      setError(
        'name',
        { message: 'Ya existe un estilo con ese nombre' },
        { shouldFocus: true }
      )
    if (
      style.variants.some((el1) =>
        state.some((el2) => el2.variants.some((el3) => el3 === el1))
      )
    ) {
      setError(
        'variants',
        {
          message: 'Una de esas variantes ya existe en otro estilo',
        },
        { shouldFocus: true }
      )
    }
    await appFetch('/api/categories', {
      method: 'POST',
      body: JSON.stringify(style),
    })
      .then(() => {
        dispatch({ type: 'add-category', payload: style })
        reset()
      })
      .catch((err) => {
        setError('root', { message: 'Ocurrió un error' })
      })
  })
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} className="self-start">
          Agregar estilo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <FormField
              control={control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel>Nombre de la categoría</FormLabel>
                    <Input {...field} type="text" autoFocus />
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={control}
              name="variants"
              render={({ field: { onChange, value } }) => {
                return (
                  <FormItem className="flex flex-col items-start mt-4">
                    <FormLabel>Variaciones</FormLabel>
                    <ScalonatedInput
                      placeholder="Ingresa la variacion"
                      onChange={onChange}
                      selectedValues={value}
                    />
                    <FormDescription>
                      Estas variaciones se utilizan para la búsqueda, si un
                      estilo de tatuaje se suele utilizar tanto en inglés como
                      en español es preferible utilizar una sola categoría y
                      agregar el otro idioma como variación. También se puede
                      utilizar en los casos en los que un estilo de tatuaje
                      tiene distintos nombres.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormMessageGlobal />
            <div className="flex items-end justify-end gap-2 mt-2 w-full">
              <DialogClose>
                <Button variant="secondary" type="button">
                  Cerrar
                </Button>
              </DialogClose>
              <SubmitButton
                type="submit"
                loading={isSubmitting}
                text="Agregar"
              />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
