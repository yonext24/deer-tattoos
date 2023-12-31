import { Skeleton } from '@/components/shadcn/ui/skeleton'
import { TattooCard } from '@/components/tattoo-card/tattoo-card'
import { getTattoos } from '@/lib/firebase/utils/tattoos'
import { Suspense, cache } from 'react'

const localeGetTattoos = cache((style?: string | string[], search?: string) => {
  return getTattoos({ style, search })
})

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const paramsToString = JSON.stringify(searchParams)

  return (
    <Suspense key={paramsToString} fallback={<Skeletons />}>
      <Children searchParams={searchParams} />
    </Suspense>
  )
}

const Children = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) => {
  const tattoos = await localeGetTattoos(
    searchParams?.style,
    searchParams?.search as string | undefined,
  )

  return (
    <>
      {tattoos.map((tat, index) => (
        <TattooCard
          key={tat.id}
          {...tat}
          withAnimation
          delay={`${index * 80}ms`}
        />
      ))}
    </>
  )
}

const Skeletons = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => {
        return <Skeleton key={index} className="w-full h-[400px]" />
      })}
    </>
  )
}
