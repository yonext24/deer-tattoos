import { Section } from '../../common/section'
import { Button } from '@/components/shadcn/ui/button'

export async function Tattoos({ children }: { children: React.ReactNode }) {
  return (
    <Section className="flex [&>*]:flex-1 gap-4 relative overflow-hidden py-0 max-h-[510px] min-h-[auto]">
      <div className="flex flex-col justify-center">
        <h3
          className="select-none bg-gradient-to-bl from-white from-[69%] to-neutral-600 bg-clip-text bg-right-bottom
        text-6xl text-transparent"
        >
          Los mejores tatuajes de Lanús
        </h3>
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
      <div className="h-[510px] w-full overflow-hidden" id="carousel_wrapper">
        <div
          className="absolute right-[35%] -top-full z-10 flex-1 [transform:rotate3d(6,-4,2,45deg)_translateZ(-50px)]
        [transform-origin:bottom] [transform-style:preserve-3d] [perspective:200px]"
        >
          <div id="carousel">{children}</div>
        </div>
      </div>
    </Section>
  )
}
