import { Back } from '@/components/ui/common/back'
import { notFound } from 'next/navigation'
import { Artist } from '@/components/ui/tatuajes/artist/artist'
import { getArtistForCard } from '@/lib/backend/utils/artists'
import { tattooController } from '@backend/controllers/tattoo-controller'
import { getTattooBySlug } from '@/lib/backend/utils/tattoos'
import { Metadata } from 'next'
import { TattooImages } from '@/components/ui/see-single-tatuaje/tattoo-images/tattoo-images'
import { APP_URL, MARCA } from '@/lib/utils/consts'

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> => {
  const tattoo = await getTattooBySlug(params.slug)

  if (!tattoo) return {}

  return {
    title: tattoo.title,
    description: `Tatuaje de <MARCA> hecho por ${tattoo.artistSlug}${
      tattoo.styles.length > 0
        ? ` manejando los estilos ${tattoo.styles.join(', ')}`
        : ''
    }`,
    openGraph: {
      images: [
        {
          url: tattoo.images.card.src,
          width: tattoo.images.card.width,
          height: tattoo.images.card.height,
          alt: tattoo.title,
        },
      ],
    },
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const tattoo = await getTattooBySlug(params.slug)
  if (!tattoo) {
    return notFound()
  }

  const artist = await getArtistForCard(tattoo.artistSlug).catch(() => null)
  tattooController.addRanking({ slug: params.slug })

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: tattoo.title,
    image: tattoo.images.images.map((el) => el.src),
    datePublished: tattoo.createdAt,
    dateModified: tattoo.updatedAt,
    author: tattoo.artistSlug
      ? [
          {
            type: 'Person',
            name: artist?.name,
            url: `${APP_URL}/tatuador/${tattoo.artistSlug}/tatuajes`,
          },
        ]
      : [{ type: 'Organization', name: MARCA, url: APP_URL }],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: articleJsonLd }}
      />
      <div className="w-full flex justify-between items-start">
        <Back />
        <Artist artist={artist} />
      </div>

      <TattooImages tattoo={tattoo} />
    </>
  )
}
