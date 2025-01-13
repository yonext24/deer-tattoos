import { ImageResponse } from 'next/og'
import { MARCA } from '@/lib/utils/consts'
import { goldShades } from '../../../tailwind.config'

export type Props = {
  title?: string
}

export async function OpengraphImage(props?: Props): Promise<ImageResponse> {
  const { title } = {
    ...{
      title: MARCA,
    },
    ...props,
  }

  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col items-center justify-center bg-black">
        <p tw="mt-12 text-7xl font-bold" style={{ color: goldShades.DEFAULT }}>
          {title}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: await fetch(
            new URL(
              '../../../public/fonts/FiraSans-Medium.ttf',
              import.meta.url
            ).pathname
          ).then((res) => res.arrayBuffer()),
          style: 'normal',
          weight: 700,
        },
      ],
    }
  )
}
