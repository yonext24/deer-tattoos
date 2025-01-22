'use client'

import './rich-editor.css'

import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import Heading from '@tiptap/extension-heading'
import React from 'react'
import { Bold, Italic, Redo, Strikethrough, Undo } from 'lucide-react'
import { FormatSelector } from './format-selector'
import { MenuButton } from './menu-button'

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <div className="">
      <div className="flex gap-px bg-secondary flex-wrap [&>button]:!p-1 [&>button]:!h-auto">
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          data-is-active={editor.isActive('bold')}
        >
          <Bold height={20} width={20} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          data-is-active={editor.isActive('italic')}
        >
          <Italic height={20} width={20} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          data-is-active={editor.isActive('strike')}
        >
          <Strikethrough height={20} width={20} />
        </MenuButton>
        <FormatSelector />

        <MenuButton
          className="ml-auto"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo height={20} width={20} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo height={20} width={20} />
        </MenuButton>
      </div>
    </div>
  )
}

const extensions = [
  TextStyle.configure({}),
  StarterKit.configure({}),
  Heading.configure({ levels: [2, 3, 4] }),
]

export const RichEditor = ({
  onChange,
  value,
}: {
  onChange: (value: string) => void
  value: string
}) => {
  return (
    <div className="rounded-lg border-border border has-[.ProseMirror-focused]:border-white overflow-hidden w-full">
      <EditorProvider
        onUpdate={({ editor }) => {
          onChange(editor.getHTML())
        }}
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={value}
        autofocus
        injectCSS
      ></EditorProvider>
    </div>
  )
}
