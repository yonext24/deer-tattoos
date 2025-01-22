import '@components/rich-editor/rich-editor.css'

export const Prose = ({
  html,
  className,
}: {
  html: string
  className?: string
}) => {
  return <div className="tiptap" dangerouslySetInnerHTML={{ __html: html }} />
}
