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

export function ArtistCard({
  name,
  intersected,
  delay,
  description,
}: {
  name: string
  description: string
  intersected: boolean
  delay: number
}) {
  return (
    <Link href="/" className="max-w-[350px] w-full">
      <Card
        className="data-[intersected=false]:opacity-0 duration-300 transition-[opacity,border-color] group hover:border-green"
        style={{
          transitionDelay: `${delay}ms`,
        }}
        data-intersected={intersected}
      >
        <CardHeader>
          <div className="h-[200px] bg-white w-full rounded-xl"></div>
        </CardHeader>
        <CardContent>
          <CardTitle className="font-light text-3xl group-hover:text-green-light transition-colors duration-300">
            {name}
          </CardTitle>
          <p className="group-hover:text-green-light transition-colors duration-300">
            {description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex text-green-light items-center gap-2">
            <div className="max-w-[0] overflow-hidden group-hover:max-w-4 transition-[max-width] duration-300">
              <DoubleLeftIcon className="h-4 w-4" />
            </div>
            <span className="hover:underline">Ver Tatuajes</span>
          </div>
          <ArtistCardMedia>
            <Button variant={'outline'}>Redes</Button>
          </ArtistCardMedia>
        </CardFooter>
      </Card>
    </Link>
  )
}
