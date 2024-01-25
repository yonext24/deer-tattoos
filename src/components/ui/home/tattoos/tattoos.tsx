import { StylizedLink } from '@/components/stylized-button/stylized-button'
import { Section } from '../../common/section'

export async function Tattoos({ children }: { children: React.ReactNode }) {
  return (
    <Section className="flex [&>*]:flex-1 gap-4 relative overflow-hidden py-0 max-h-[510px] min-h-[auto]">
      <div className="flex flex-col justify-center">
        <h3
          className="bg-gradient-to-bl from-white from-[69%] to-neutral-600 bg-clip-text bg-right-bottom
        text-6xl supports-[background-clip:text]:text-transparent"
        >
          Los mejores tatuajes de Lanús
        </h3>
        <span className="mt-4 relative z-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          incidunt ratione id labore fuga dignissimos ducimus sed eaque in
          laborum minima, at nulla impedit fugiat? Vitae quam magnam atque
          totam?
        </span>
        <StylizedLink href="/tatuajes" className="mt-2" circleRadius="70px">
          Ver más
        </StylizedLink>
      </div>
      <div className="h-[510px] w-full overflow-hidden" id="carousel_wrapper">
        <div
          className="absolute right-[32%] -top-[90%] flex-1 [transform:rotate3d(-3,4,-2,320deg)_translateZ(-50px)]
        [transform-origin:bottom] [transform-style:preserve-3d] [perspective:200px]"
        >
          <div id="carousel">{children}</div>
        </div>
      </div>
    </Section>
  )
}
