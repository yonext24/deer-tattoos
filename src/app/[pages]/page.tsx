import { Prose } from '@/components/prose/prose'
import { Main } from '@/components/ui/common/main'
import { Section } from '@/components/ui/common/section'
import { getPageBySlug } from '@/lib/backend/utils/pages'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata(props: {
  params: Promise<{ pages: string }>
}): Promise<Metadata> {
  const params = await props.params
  const page = await getPageBySlug(params.pages)

  if (!page) return notFound()

  return {
    title: page?.title || page.title,
    description: page?.description,
    openGraph: {
      type: 'article',
    },
  }
}

export default async function Page({ params }: { params: { pages: string } }) {
  const page = await getPageBySlug(params.pages)
  if (!page) return notFound()

  return (
    <Main>
      <Section className="min-h-[65vh] py-12 flex flex-col justify-center">
        <h1 className="mb-8 text-5xl font-bold text-gold">{page.title}</h1>
        <Prose html={page.content} />
      </Section>
    </Main>
  )
}
