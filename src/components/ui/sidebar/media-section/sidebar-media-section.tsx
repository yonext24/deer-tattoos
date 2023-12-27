const deerMedia = [
  { text: 'Instagram', href: 'https://www.instagram.com/deer_tattoos/' },
  { text: 'Twitter', href: 'https://www.instagram.com/deer_tattoosj/' },
]

const getMedia = async (isTatuajes: boolean) => {
  return deerMedia
}

export async function SidebarMediaSection({
  isTatuajes,
}: {
  isTatuajes: boolean
}) {
  const medias = await getMedia(isTatuajes)

  return (
    <div className="flex flex-col mt-auto w-full">
      {medias.map(({ href, text }) => {
        return (
          <a
            href={href}
            key={href}
            className="w-full px-4 py-3 border-t border-border font-extralight hover:bg-green-darker transition-colors"
          >
            {text}
          </a>
        )
      })}
    </div>
  )
}
