import { StylizedLink } from '@/components/stylized-button/stylized-button'
import { Section } from '../../common/section'
import { getAllPageData } from '@/lib/backend/utils/data'
import { TextWithLineJumps } from '@/components/text-with-linejumps/text-with-linejumps'
import { DecoratedTitle } from '@/components/decorated-title/decorated-title'

export async function Tattoos({ children }: { children: React.ReactNode }) {
  const data = await getAllPageData().then((res) => res?.main_data)
  return (
    <Section className="grid min-[800px]:grid-cols-[60%_1fr] grid-cols-[100%_1fr] gap-4 relative overflow-hidden py-0 max-h-[510px] min-h-[auto] w-full">
      <div className="flex flex-col justify-center text-center items-center md:items-start md:text-start">
        <DecoratedTitle className="text-6xl w-auto">
          Los mejores tatuajes de Lanús
        </DecoratedTitle>
        <TextWithLineJumps className="mt-4 relative z-10" text={data ?? ''} />
        <StylizedLink href="/tatuajes" className="mt-2" circleRadius="70px">
          Ver más
        </StylizedLink>
      </div>
      <div className="h-[510px] w-full overflow-hidden" id="carousel_wrapper">
        <div
          className="absolute pointer-events-none md:pointer-events-auto right-[70%] md:right-[32%] -top-[90%] flex-1 [transform:rotate3d(-3,4,-2,320deg)_translateZ(-50px)]
        [transform-origin:bottom] [transform-style:preserve-3d] [perspective:200px]"
        >
          <div
            id="carousel"
            className="opacity-20 min-[770px]:opacity-50 min-[900px]:opacity-100"
          >
            {children}
          </div>
        </div>
      </div>
    </Section>
  )
}
