import { cache } from "react";
import fs from 'node:fs/promises'
import path from 'path'

const relativePath = 'public/data.json'
const getPath = () => path.join(process.cwd(), relativePath)

export type pageData = {
  main_data: string
  footer_data: string,
  who_we_are: string,
  instagram: string,
  facebook: string,
  twitter: string
}

export const getAllPageData = cache(async (): Promise<pageData> => {
  const file = await fs.readFile(getPath(), { encoding: 'utf-8' })
  const data = JSON.parse(file)
  return data
})

export const saveAllPageData = async (pageData: pageData) => {
  return await fs.writeFile(getPath(), JSON.stringify(pageData))
}
