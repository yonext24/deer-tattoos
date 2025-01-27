import { DecoratedTitle } from '@/components/decorated-title/decorated-title'
import { TextWithLineJumps } from '@/components/text-with-linejumps/text-with-linejumps'
import { Section } from '@/components/ui/common/section'
import { getAllPageData } from '@/lib/backend/utils/data'
import Image from 'next/image'

export default async function Page() {
  const data = await getAllPageData()

  return (
    <Section className="min-h-[auto] flex w-full my-16">
      <div className="grid grid-cols-[40%,60%] w-full max-[850px]:flex max-[850px]:flex-col">
        <div className="flex flex-col">
          <DecoratedTitle className="min-[850px]:hidden">
            Quienes <br /> Somos?
          </DecoratedTitle>
          <div className="relative w-full max-[850px]:mx-auto after:top-0 after:left-0 after:absolute after:z-10 after:w-full after:h-full after:[background:_radial-gradient(circle,_rgba(10,10,10,0)_0%,_rgba(0,0,0,1)_100%)]">
            <Image
              loading="eager"
              src="/local.webp"
              className="w-full max-w-auto max-h-auto"
              alt="local"
              height={500}
              width={500}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex h-full flex-col justify-center">
            <h3
              className="font-thin text-end text-6xl max-[850px]:hidden"
              //   className="bg-gradient-to-bl pb-1 from-white from-[69%] to-neutral-600 bg-clip-text bg-right-bottom
              // text-6xl supports-[background-clip:text]:text-transparent relative z-10 w-max ml-auto max-[850px]:hidden"
            >
              Quienes somos?
            </h3>
            <div className="">
              <TextWithLineJumps
                text={data?.who_we_are || ''}
                className="text-end mt-4 max-[850px]:text-center"
              ></TextWithLineJumps>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
