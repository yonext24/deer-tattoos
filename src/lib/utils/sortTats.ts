import { Tattoo } from '@lib/types/tattoo'

const isPair = (num: number) => num % 2 === 0

export const sortTats = (tats: Tattoo[]) => {
  let sorted: Tattoo[] = []

  const stackOfNotAdded = []

  for (let i = 0; i < tats.length; i++) {
    const currentTat = tats[i]

    if (currentTat.type === 'single') {
      sorted.push(currentTat)
      continue
    }

    if (isPair(i)) {
      sorted.push(currentTat)
      continue
    }

    stackOfNotAdded.push({ ...currentTat, ind: i })
  }

  let shouldAddBefore: boolean = true

  stackOfNotAdded.forEach((el) => {
    if (!shouldAddBefore) {
      el.ind++
    }

    const sortedTotal = sorted.length
    const sortedTillCurrentIndex = sorted.slice(0, el.ind - 1)
    const sortedCurrentIndexTillTotal = sorted.slice(el.ind - 1, sortedTotal)

    sortedTillCurrentIndex.push(el)
    sorted = sortedTillCurrentIndex.concat(sortedCurrentIndexTillTotal)

    shouldAddBefore = !shouldAddBefore
  })

  return sorted
}
