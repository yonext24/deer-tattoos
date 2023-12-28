import { Main } from '@/components/ui/common/main'
import { Section } from '@/components/ui/common/section'
import { TattooCard } from '@/components/tattoo-card/tattoo-card'
import { getTattoos } from '@/lib/firebase/utils/tattoos'
import { CategoriesFilter } from '@/components/filters/categories-filter/categories-filter'
import { cache } from 'react'

export const revalidate = 3600

const localeGetTattoos = cache(getTattoos)

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const tattoos = await localeGetTattoos(searchParams!)

  return (
    <Main>
      <Section className="w-full">
        <div className="p-4 py-2">
          <CategoriesFilter searchParams={searchParams} />
        </div>

        <div className="grid grid-cols-2 gap-4 p-4">
          {tattoos.map((tat, index) => (
            <TattooCard
              key={tat.id}
              {...tat}
              withAnimation
              delay={`${index * 80}ms`}
            />
          ))}
        </div>
      </Section>
    </Main>
  )
}
