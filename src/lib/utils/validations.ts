export const acceptedTypes = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/jpg',
]

export const imageValidation = (image: File | Blob) => {
  if (!(image instanceof File || image instanceof Blob)) {
    return false
  }
  return true
}
export const imageTypeValidation = (
  image: File | Blob,
  customAcceptedTypes?: string[]
) => {
  const typesToUse = customAcceptedTypes?.length
    ? customAcceptedTypes
    : acceptedTypes

  if (!typesToUse.includes(image?.type)) {
    return false
  }

  return true
}
