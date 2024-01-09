import { ImageWithBlur } from '@/components/tattoo-card/image-with-blur'
import { Tattoos } from '@/components/ui/home/tattoos/tattoos'
import { getRankedTattoos } from '@/lib/backend/utils/tattoos'
import { Tattoo } from '@/lib/types/tattoo'
import { cn } from '@/lib/utils/utils'

const NECESARY_AMOUNT_OF_TATTOOS = 18
const NECESARY_AMOUNT_OF_TATTOOS_TO_DUPLICATE = 9
// Es necesario duplicar los ultimos 9 tatuajes de la lista, para que la transición de la animación
// sea fluida.
// en total se necesitan 27 tatuajes, pero en la animación de css se especifican que se necesitan 24
// para que nunca se vea el borde del carousel

// Esta función se encarga de generar la cantidad de tatuajes que necesita el carousel para verse bien
// Si no hay suficientes tatuajes, duplica los que hay
const transformTattoosToCarousel = (tattoos: Tattoo[]) => {
  const copy = [...tattoos]

  if (copy.length < NECESARY_AMOUNT_OF_TATTOOS) {
    while (copy.length < NECESARY_AMOUNT_OF_TATTOOS) {
      const randomIndex = Math.floor(Math.random() * copy.length)
      const randomTattoo = copy[randomIndex]
      copy.push(randomTattoo)
    }
  }

  const firstDuplicate = copy.slice(0, NECESARY_AMOUNT_OF_TATTOOS_TO_DUPLICATE)
  const result = [...copy, ...firstDuplicate]
  // los bordes tienen que ser: el de arriba: las imagenes numero 25 y 26, y el de abajo las imagenes 5 y 6

  return result.map((el, i) => ({ ...el, id: i }))
}

export default async function Page() {
  const tattoos = await getRankedTattoos()
  const parsed = transformTattoosToCarousel(tattoos)
  console.log(parsed.length)

  return (
    <Tattoos>
      {parsed.map((tattoo) => {
        return (
          <article
            key={tattoo.id}
            className={cn(
              'rounded w-[var(--tattoo-width)] h-[var(--tattoo-height)] transition-opacity duration-300 relative overflow-hidden group cursor-pointer'
            )}
          >
            <ImageWithBlur
              src={tattoo.images.card.src}
              blurDataURL={tattoo.images.card.blured}
              alt="image"
              className="h-full object-cover"
              loading="lazy"
              quality={16}
              height={tattoo.images.card.height}
              width={tattoo.images.card.width}
            />
            <div
              className="absolute top-0 left-0 w-full h-full z-10 opacity-0 flex items-center justify-center duration-300
              bg-green-dark/50 text-white backdrop-blur-md transition-opacity group-hover:opacity-100 font-thin"
            >
              <span>Ver más</span>
            </div>
          </article>
        )
      })}
    </Tattoos>
  )
}
