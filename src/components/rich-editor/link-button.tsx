'use client'

import { useCurrentEditor } from '@tiptap/react'
import { LinkIcon } from 'lucide-react'
import { MenuButton } from './menu-button'

export function LinkButton() {
  const { editor } = useCurrentEditor()

  if (!editor) return null

  console.log(editor.state.selection.empty)

  return (
    <MenuButton
      onClick={() => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt(
          'Link (debe empezar con https://) dejar vacío si se quiere eliminar',
          previousUrl
        )

        // cancelled
        if (url === null) {
          return
        }

        // empty
        if (url === '') {
          editor.chain().focus().extendMarkRange('link').unsetLink().run()

          return
        }

        // update link
        try {
          editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .setLink({ href: url })
            .run()
        } catch (e) {
          alert(e instanceof Error ? e.message : e)
        }
      }}
      disabled={
        (editor.state.selection.empty && !editor.isActive('link')) ||
        !editor
          .can()
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: 'https://google.com' })
          .run()
      }
      data-is-active={editor.isActive('link')}
    >
      <LinkIcon height={20} width={20} />
    </MenuButton>
  )
}
