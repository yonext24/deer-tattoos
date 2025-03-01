export function wordMatch(s1: string, s2: string): number {
  // Devuelve un valor entre 0 y 1, 1 siendo match total
  if (s1 === s2) return 1.0

  const len1: number = s1.length
  const len2: number = s2.length

  const max_dist: number = Math.floor(Math.max(len1, len2) / 2) - 1

  let match: number = 0

  const hash_s1: number[] = new Array(len1).fill(0)
  const hash_s2: number[] = new Array(len2).fill(0)

  for (let i = 0; i < len1; i++) {
    for (
      let j = Math.max(0, i - max_dist);
      j < Math.min(len2, i + max_dist + 1);
      j++
    ) {
      if (s1[i] === s2[j] && hash_s2[j] === 0) {
        console.log(s1[i], s2[j], i, j)
        hash_s1[i] = 1
        hash_s2[j] = 1
        match++
        break
      }
    }
  }

  if (match === 0) return 0.0

  let t: number = 0
  let point: number = 0

  for (let i = 0; i < len1; i++) {
    if (hash_s1[i]) {
      while (hash_s2[point] === 0) {
        point++
      }
      if (s1[i] !== s2[point++]) t++
    }
  }

  t /= 2

  return (match / len1 + match / len2 + (match - t) / match) / 3.0
}

export function matchWordToArray(
  s: string,
  arr: string[],
  threshold: number = 0.7
): string | false {
  let matchedWord: false | string = false
  for (let i = 0; i < arr.length; i++) {
    const result = wordMatch(s, arr[i])
    if (result >= threshold) {
      matchedWord = arr[i]
      break
    }
  }

  return matchedWord
}
