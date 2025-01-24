/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { RichEditor } from '@/components/rich-editor/rich-editor'
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormDescription,
  FormMessage,
  FormLabel,
} from '@/components/shadcn/ui/form'
import {
  HoverCardTrigger,
  HoverCard,
  HoverCardContent,
} from '@/components/shadcn/ui/hover-card'
import { Input } from '@/components/shadcn/ui/input'
import { Textarea } from '@/components/shadcn/ui/textarea'
import { SubmitButton } from '@/components/ui/common/submit-button'
import { createPageAction } from '@/lib/backend/utils/pages.actions'
import { createPageSchema } from '@/lib/schemas/page'
import { Page } from '@/lib/types/page'
import { modalStyles } from '@/lib/utils/styles'
import { cn } from '@/lib/utils/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { MessageCircleQuestionIcon, XIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

export function CreatePageModal({
  closeModal,
  onAdd,
}: {
  closeModal: () => void
  onAdd: (newData: Page) => void
}) {
  const [state, formAction] = useFormState(createPageAction, {
    message: '',
    status: 0,
  })

  const form = useForm<z.infer<typeof createPageSchema>>({
    defaultValues: {
      title: '',
      description: '',
      content: '<h2>Edita esto</h2>',
    },
    errors: state.fieldIssues,
    resolver: zodResolver(createPageSchema),
  })
  const { control } = form

  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.status === 1) {
      toast.success(state.message)
      onAdd(state.page as Page)
      closeModal()
    }
  }, [state.status])

  return (
    <div
      role="dialog"
      className={cn('w-[600px]', modalStyles({ size: 'large' }))}
    >
      <h3>Crear página dinámica</h3>
      <Form {...form}>
        <form
          action={formAction}
          className="flex flex-col gap-5"
          ref={formRef}
          onSubmit={(evt) => {
            evt.preventDefault()
            form.handleSubmit((data) => {
              const formData = new FormData(formRef.current!)
              formData.append('content', data.content)
              formAction(formData)
            })(evt)
          }}
        >
          <FormField
            control={control}
            name="title"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input {...field} className={'w-full'} spellCheck={false} />
                  </FormControl>
                  <FormDescription>
                    <span>Este es el título de la página</span>
                  </FormDescription>
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
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      {...field}
                      className={'w-full'}
                      spellCheck={false}
                    />
                  </FormControl>
                  <FormDescription>
                    <span>
                      Una descripción de la página, esto es lo que aparecerá en
                      google, idealmente tiene que tener entre 100 y 200
                      caracteres.
                    </span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={control}
            name="content"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <RichEditor {...field} />
                  </FormControl>
                  <FormDescription className="flex gap-2 items-center">
                    <span>
                      Este será el contenido de la página, no hace falta que
                      repitas el título porque este aparece aparte, recordá que
                      podes usar emojis.
                    </span>
                    <HoverCard>
                      <HoverCardTrigger>
                        <MessageCircleQuestionIcon
                          className=""
                          height={15}
                          width={15}
                        />
                      </HoverCardTrigger>
                      <HoverCardContent className="flex flex-col text-muted-foreground">
                        <span>
                          Ctrl + B: <strong>Negrita</strong>
                        </span>
                        <span>
                          Ctrl + I: <em>Italic</em>
                        </span>
                        <span>Ctrl + Alt + 2: Titulo 2</span>
                        <span>Ctrl + Alt + 3: Titulo 3</span>
                        <span>Ctrl + Alt + 4: Titulo 4</span>
                        <span>Ctrl + Alt + P: Párrafo</span>
                        <span>Ctrl + Z: Deshacer</span>
                        <span>Ctrl + Y: Rehacer</span>
                      </HoverCardContent>
                    </HoverCard>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <SubmitButton
            text="Crear"
            loading={form.formState.isSubmitting}
            className="self-start mt-4"
            type="submit"
          />
        </form>
      </Form>
    </div>
  )
}
