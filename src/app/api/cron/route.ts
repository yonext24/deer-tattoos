import { storage } from '@backend/firebase/config'
import { NextResponse } from 'next/server'
import { prisma } from '@backend/prisma';

const getStorageFiles = () => {
  return storage.bucket().getFiles({ prefix: `/tattoos`, autoPaginate: false }).then(([files]) => files.map(file => file.name))
}

const getMongoFiles = async () => {
  const docs = await prisma.tattoo.findMany()
  return docs.map(doc => [doc.images.card.src, ...doc.images.images.map(el => el.src)]).flat() as string[]
}

const compareFiles = (storageFiles: string[], mongoFiles: string[]) => {
  const notInMongo: string[] = []

  const parsedMongoUrls = mongoFiles.map(url => decodeURIComponent(url.split('.com/')[2]))

  storageFiles.forEach(file => {
    if (!parsedMongoUrls.includes(file)) {
      notInMongo.push(file)
    }
  })

  return notInMongo
}

const deleteImage = async (url: string) => {
  const file = storage.bucket().file(url)
  return await file.delete()
}

export const GET = async (req: Request) => {
  console.log('STARTING TATTOO CLEANUP')
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    console.error('CLEANUP INTERRUPTED DUE TO UNAUTHORIZED REQUEST')
    return Response.json({success: false, error: 'Unauthorized'}, { status: 401 })
  }
  
  const storageFiles = await getStorageFiles()
  const mongoFiles = await getMongoFiles()
  const filesToDelete = compareFiles(storageFiles, mongoFiles)

  for (const file of filesToDelete) {
    await deleteImage(file)
  }

  return NextResponse.json({ success: true  })
}