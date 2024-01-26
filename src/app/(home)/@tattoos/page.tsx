import { ImageWithBlur } from '@/components/tattoo-card/image-with-blur'
import { Tattoos } from '@/components/ui/home/tattoos/tattoos'
import { getRankedTattoos } from '@/lib/backend/utils/tattoos'
import { Tattoo } from '@/lib/types/tattoo'
import { cn } from '@/lib/utils/utils'
import Link from 'next/link'

export const revalidate = 180

const NECESARY_AMOUNT_OF_TATTOOS = 18
const NECESARY_AMOUNT_OF_TATTOOS_TO_DUPLICATE = 9

// Funcion para calcular el promedio de aparición del tatuaje y ver si es aceptable
const isAcceptableToPick = (arr: string[], element: string) => {
  const total = arr.length
  const amount = arr.filter((el) => el === element).length

  if (amount <= 0) return true

  const inverseProportion = total / amount

  const amountOfDiferentElements = Array.from(new Set(arr)).length
  const normalRatio = total / amountOfDiferentElements

  return inverseProportion > normalRatio
}

// Es necesario duplicar los ultimos 9 tatuajes de la lista, para que la transición de la animación
// sea fluida.
// en total se necesitan 27 tatuajes, pero en la animación de css se especifican que se necesitan 24
// para que nunca se vea el borde del carousel

// Esta función se encarga de generar la cantidad de tatuajes que necesita el carousel para verse bien
// Si no hay suficientes tatuajes, duplica los que hay
const transformTattoosToCarousel = (tattoos: Tattoo[]) => {
  const copy = [...tattoos]
  const pickedIds: string[] = []

  while (copy.length < NECESARY_AMOUNT_OF_TATTOOS) {
    const randomIndex = Math.floor(Math.random() * copy.length)
    const randomTattoo = copy[randomIndex]

    const isAcceptable = isAcceptableToPick(pickedIds, randomTattoo.id)
    if (!isAcceptable) continue

    pickedIds.push(randomTattoo.id)

    copy.push(randomTattoo)
  }

  const firstDuplicate = copy.slice(0, NECESARY_AMOUNT_OF_TATTOOS_TO_DUPLICATE)
  const result = [...copy, ...firstDuplicate]
  // los bordes tienen que ser: el de arriba: las imagenes numero 25 y 26, y el de abajo las imagenes 5 y 6

  return result.map((el, i) => ({ ...el, id: i }))
}

export default async function Page() {
  const tattoos = await getRankedTattoos()
  const parsed = transformTattoosToCarousel(tattoos)

  return (
    <Tattoos>
      {parsed.map((tattoo) => {
        return (
          <Link
            href={`/tatuajes/${tattoo.slug}`}
            role="article"
            key={tattoo.id}
            className={cn(
              'rounded w-[var(--tattoo-width)] h-[var(--tattoo-height)] transition-opacity duration-300 relative overflow-hidden group cursor-pointer',
              'hover:scale-110 hover:z-10 transition-[transform,border-color] duration-300 border border-transparent hover:border-gold'
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
              bg-green-darker/60 backdrop-blur-md transition-opacity group-hover:opacity-100 font-extralight text-gold"
            >
              <span>Ver más</span>
            </div>
          </Link>
        )
      })}
    </Tattoos>
  )
}
