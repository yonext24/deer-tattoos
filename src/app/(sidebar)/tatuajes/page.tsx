import { Main } from '@/components/ui/common/main'
import { Section } from '@/components/ui/common/section'
import tattoos from '../../../../public/tattoos.json'
import { TattooCard } from '@/components/tattoo-card/tattoo-card'

export type Tattoo = {
  id: number
  image: string
  type: 'single' | 'double' | 'quad'
  __number__: number
}
const getTattoos = async (): Promise<Tattoo[]> => {
  const a = tattoos
    .map((el, num) => ({ ...el, __number__: num }))
    .sort((a, b) => {
      if (a.type === 'single' && a.__number__ % 2 !== 0) return -1
      return 0
    })
  return a
}

export default async function Page() {
  const tattoos = await getTattoos()

  return (
    <Main>
      <Section className="w-full">
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
