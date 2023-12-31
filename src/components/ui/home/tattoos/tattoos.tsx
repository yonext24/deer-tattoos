import { Section } from '../../common/section'
import { Button } from '@/components/shadcn/ui/button'

export async function Tattoos({ children }: { children: React.ReactNode }) {
  return (
    <Section className="grid grid-cols-[1fr_1fr] gap-4">
      <div className="flex flex-col justify-center">
        <h3 className="text-6xl">Los mejores tatuajes de Lanús</h3>
        <span className="mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          incidunt ratione id labore fuga dignissimos ducimus sed eaque in
          laborum minima, at nulla impedit fugiat? Vitae quam magnam atque
          totam?
        </span>
        <Button
          variant={'outline'}
          className="mb-24 self-start mt-6 text-lg py-4 px-7 font-thin"
        >
          Ver más
        </Button>
      </div>
      <div className="h-full w-full flex">
        <div className="grid grid-cols-2 gap-4 py-2 pr-2 m-auto flex-1">
          {children}
        </div>
      </div>
    </Section>
  )
}
