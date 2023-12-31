import { CategoriesFilter } from '@/components/filters/categories-filter/categories-filter'
import { Main } from '@/components/ui/common/main'
import { Section } from '@/components/ui/common/section'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Main>
      <Section className="w-full">
        <div className="p-4 py-2">
          <CategoriesFilter />
        </div>

        <div className="grid grid-cols-2 gap-4 p-4">{children}</div>
      </Section>
    </Main>
  )
}
