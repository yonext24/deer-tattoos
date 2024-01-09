export async function SidebarMediaSection({
  medias,
}: {
  medias: { text: string; url: string }[]
}) {
  return (
    <div className="flex flex-col mt-auto w-full">
      {medias.map(({ url, text }) => {
        return (
          <a
            href={url}
            key={url}
            className="w-full px-4 py-3 border-t border-border font-extralight hover:bg-green-darker transition-colors capitalize"
          >
            {text}
          </a>
        )
      })}
    </div>
  )
}
