import { storage } from '@backend/firebase/config'
import { NextResponse } from 'next/server'
import { prisma } from '@backend/prisma'
import { filterAndPaginateTattoos } from '@backend/utils/tattoos-utils'
import fs from 'node:fs'
import { NECESARY_AMOUNT_OF_TATTOOS_IN_HOMEPAGE } from '@/lib/utils/consts'

const getStorageFiles = () => {
  return storage
    .bucket()
    .getFiles({ prefix: `/tattoos`, autoPaginate: false })
    .then(([files]) => files.map((file) => file.name))
}

const getMongoFiles = async () => {
  const docs = await prisma.tattoo.findMany()
  return docs
    .map((doc) => [
      doc.images.card.src,
      ...doc.images.images.map((el) => el.src),
    ])
    .flat() as string[]
}

const compareFiles = (storageFiles: string[], mongoFiles: string[]) => {
  const notInMongo: string[] = []

  const parsedMongoUrls = mongoFiles.map((url) =>
    decodeURIComponent(url.split('.com/')[2])
  )

  storageFiles.forEach((file) => {
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

const getRankedTattoosAndStylesAndWriteThem = async () => {
  const { data: mostRankedTattoos } = await filterAndPaginateTattoos(
    { sortByRanking: true },
    { page: 1, size: NECESARY_AMOUNT_OF_TATTOOS_IN_HOMEPAGE }
  )
  const mostRankedStyles = mostRankedTattoos.flatMap((el) => {
    return el.styles as string[]
  })
  const artists = Array.from<string>(
    new Set(mostRankedTattoos.map((el) => el.artist.name))
  )

  const result = {
    tattoos: mostRankedTattoos,
    styles: mostRankedStyles,
    artists,
  }

  fs.writeFileSync('public/ranked-tattoos.json', JSON.stringify(result))
}

export const GET = async (req: Request) => {
  console.log('STARTING TATTOO CLEANUP')
  const auth = req.headers.get('authorization')
  console.log({ auth })
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    console.error('CLEANUP INTERRUPTED DUE TO UNAUTHORIZED REQUEST')
    return Response.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const storageFiles = await getStorageFiles()
    const mongoFiles = await getMongoFiles()
    const filesToDelete = compareFiles(storageFiles, mongoFiles)

    for (const file of filesToDelete) {
      await deleteImage(file)
    }

    await getRankedTattoosAndStylesAndWriteThem()

    return NextResponse.json({ success: true })
  } catch (err) {
    const errMessage = err instanceof Error ? err.message : 'An error occurred'
    console.error(err)
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    )
  }
}
