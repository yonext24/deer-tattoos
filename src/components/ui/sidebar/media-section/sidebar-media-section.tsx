export async function SidebarMediaSection({
  medias,
}: {
  medias: { text: string; href: string }[]
}) {
  return (
    <div className="flex flex-col mt-auto w-full">
      {medias.map(({ href, text }) => {
        return (
          <a
            href={href}
            key={href}
            className="w-full px-4 py-3 border-t border-border font-extralight hover:bg-green-darker transition-colors capitalize"
          >
            {text}
          </a>
        )
      })}
    </div>
  )
}
