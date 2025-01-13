import { OpengraphImage as OpengraphImageComponent } from '@/components/opengraph-image/opengraph-image'

export const runtime = 'edge'

export default async function OpengraphImage() {
  return await OpengraphImageComponent()
}
