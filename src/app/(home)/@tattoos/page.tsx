import { SmallerTattooCard } from '@/components/tattoo-card/smaller-tattoo-card'
import { Tattoos } from '@/components/ui/home/tattoos/tattoos'
import { getRankedTattoos } from '@/lib/backend/utils/tattoos'
import { Tattoo } from '@/lib/types/tattoo'
import { NECESARY_AMOUNT_OF_TATTOOS_IN_HOMEPAGE } from '@/lib/utils/consts'

export const revalidate = 3600

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

// Esta función se encarga de generar la cantidad de tatuajes que necesita el carousel para verse bien
// Si no hay suficientes tatuajes, duplica los que hay
// Es necesario duplicar los ultimos 9 tatuajes de la lista, para que la transición de la animación
// sea fluida.
// en total se necesitan 27 tatuajes, pero en la animación de css se especifican que se necesitan 24
// para que nunca se vea el borde del carousel
const transformTattoosToCarousel = (tattoos: Tattoo[]): Tattoo[] => {
  const copy = [...tattoos]
  const pickedIds: string[] = []

  while (copy.length < NECESARY_AMOUNT_OF_TATTOOS_IN_HOMEPAGE) {
    const randomIndex = Math.floor(Math.random() * copy.length)
    const randomTattoo = copy[randomIndex]

    const isAcceptable =
      tattoos.length <= 1 || isAcceptableToPick(pickedIds, randomTattoo.id)
    if (!isAcceptable) continue

    pickedIds.push(randomTattoo.id)

    copy.push(randomTattoo)
  }

  const firstDuplicate = copy.slice(0, NECESARY_AMOUNT_OF_TATTOOS_TO_DUPLICATE)
  const result = [...copy, ...firstDuplicate]
  // los bordes tienen que ser: el de arriba: las imagenes numero 25 y 26, y el de abajo las imagenes 5 y 6

  return result.map((el, i) => ({ ...el, id: String(i) }))
}

export default async function Page() {
  const parsed = transformTattoosToCarousel(await getRankedTattoos())

  return (
    <Tattoos>
      {parsed.map((tattoo) => {
        return <SmallerTattooCard key={tattoo.id} tattoo={tattoo} />
      })}
    </Tattoos>
  )
}
