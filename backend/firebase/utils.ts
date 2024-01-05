import { bucket } from './config'

export const uploadImage = async (file: File, path: string) => {
  const blobStream = bucket.file(path).createWriteStream({
    metadata: {
      contentType: file.type,
    },
  })

  const arr = new Uint8Array(await file.arrayBuffer())
  blobStream.end(arr)

  return await new Promise((resolve, reject) => {
    blobStream.on('finish', () => {
      bucket
        .file(path)
        .makePublic()
        .then(() => {
          const imageUrl = bucket.file(path).publicUrl()
          resolve(imageUrl)
        })
    })

    blobStream.on('error', (error) => {
      reject(error)
    })
  })
}
