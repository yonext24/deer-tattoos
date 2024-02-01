import { SingleTatuajeRecommendedSection } from '@/components/ui/see-single-tatuaje/recommended-section/single-tatuaje-recommended-section'
import { getTattooBySlug } from '@backend/utils/tattoos-utils'
import { Suspense } from 'react'

export default async function Page({ params }: { params: { slug: string } }) {
  const tattoo = await getTattooBySlug(params.slug).catch(() => null)

  return (
    <Suspense>
      <SingleTatuajeRecommendedSection
        tattoo={tattoo}
      ></SingleTatuajeRecommendedSection>
    </Suspense>
  )
}
