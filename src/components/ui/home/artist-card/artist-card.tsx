import { Button } from '@/components/shadcn/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/ui/card'
import { ArtistCardMedia } from './artist-card-media'
import Link from 'next/link'
import { DoubleLeftIcon } from '@/components/icons'
import { Artist } from '@/lib/types/artist'
import Image from 'next/image'
import { ImageWithBlur } from '@/components/tattoo-card/image-with-blur'

export function ArtistCard({
  name,
  intersected,
  delay,
  description,
  slug,
  images,
  medias,
}: Artist & { intersected: boolean; delay: number }) {
  return (
    <Link
      href={`/tatuador/${slug}/tatuajes`}
      className="max-w-[350px] w-full h-full"
    >
      <Card
        className="data-[intersected=false]:opacity-0 duration-300 transition-[opacity,border-color] group hover:border-green"
        style={{
          transitionDelay: `${delay}ms`,
        }}
        data-intersected={intersected}
      >
        <CardHeader>
          {images.profile && (
            <div className="relative">
              <ImageWithBlur
                width={300}
                height={200}
                alt={`Imágen de ${name}`}
                src={images.profile.src}
                blurDataURL={images.profile.blured}
              />
            </div>
          )}
        </CardHeader>
        <CardContent>
          <CardTitle className="font-light text-3xl group-hover:text-green-light transition-colors duration-300">
            {name}
          </CardTitle>
          <p className="group-hover:text-green-light transition-colors duration-300">
            {description}
          </p>
        </CardContent>
        <CardFooter className="flex flex-col-reverse gap-y-4 sm:flex-row justify-between">
          <div className="flex text-green-light items-center gap-2">
            <div className="max-w-[0] overflow-hidden group-hover:max-w-4 transition-[max-width] duration-300">
              <DoubleLeftIcon className="h-4 w-4" />
            </div>
            <span className="hover:underline">Ver Tatuajes</span>
          </div>
          <ArtistCardMedia medias={medias}>
            <Button variant={'outline'} className="self-start">
              Redes
            </Button>
          </ArtistCardMedia>
        </CardFooter>
      </Card>
    </Link>
  )
}
