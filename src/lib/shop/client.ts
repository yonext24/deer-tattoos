import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'i5b4kwg3',
  dataset: 'production',
  token: process.env.CLIENT_TOKEN,
  useCdn: false,
  apiVersion: '2024-11-04'
})