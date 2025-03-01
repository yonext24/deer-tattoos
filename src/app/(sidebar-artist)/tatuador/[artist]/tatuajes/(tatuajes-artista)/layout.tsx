import { Filters } from '@/components/filters/filters'
import { Main } from '@/components/ui/common/main'
import { Section } from '@/components/ui/common/section'

export default function Layout({
  children,
  pagination,
}: {
  children: React.ReactNode
  pagination: React.ReactNode
}) {
  return (
    <Main>
      <Section className="w-full">
        <div className="p-4 py-2">
          <Filters />
        </div>

        {children}
        {pagination}
      </Section>
    </Main>
  )
}
