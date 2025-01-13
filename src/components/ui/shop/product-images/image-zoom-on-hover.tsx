import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Image as ImageType } from '@/lib/shopify/types'

const generateConfig = (zoom: number) => ({
  initialZoom: zoom,
  minZoom: 1.25,
  maxZoom: 4,
  zoomSpeed: 0.01,
})

type Props = {
  image: ImageType
  defaultZoom?: number
}

export function ImageZoomOnHover({ image, defaultZoom = 2 }: Props) {
  const mergedConfig = generateConfig(defaultZoom)
  const { initialZoom, minZoom, maxZoom, zoomSpeed } = mergedConfig

  const [zoomed, setZoomed] = useState(false)
  const [zoom, setZoom] = useState(initialZoom)
  const [position, setPosition] = useState({ x: '50%', y: '50%' })

  const handleMouseOver = () => {
    setZoomed(true)
  }

  const handleMouseMove = (evt: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomed) return

    const rect = evt.currentTarget.getBoundingClientRect()
    const percentageX = `${((evt.clientX - rect.left) * 100) / rect.width}%`
    const percentageY = `${((evt.clientY - rect.top) * 100) / rect.height}%`

    setPosition({ x: percentageX, y: percentageY })
  }

  const handleMouseOut = () => {
    setZoomed(false)
    setZoom(initialZoom)
  }

  const handleWheel = (evt: React.WheelEvent<HTMLDivElement>) => {
    if (!zoomed) return

    const newZoom = Math.max(
      Math.min(zoom + evt.deltaY * -zoomSpeed, maxZoom),
      minZoom
    )
    setZoom(newZoom)
  }

  const handleTouchStart = (evt: React.TouchEvent<HTMLDivElement>) => {
    evt.preventDefault()
    setZoomed(true)
  }

  const handleTouchMove = (evt: React.TouchEvent<HTMLDivElement>) => {
    if (!zoomed) return

    const rect = evt.currentTarget.getBoundingClientRect()
    let percentageX = ((evt.touches[0].clientX - rect.left) * 100) / rect.width
    let percentageY = ((evt.touches[0].clientY - rect.top) * 100) / rect.height

    percentageX = Math.max(Math.min(percentageX, 100), 0)
    percentageY = Math.max(Math.min(percentageY, 100), 0)

    setPosition({ x: `${percentageX}%`, y: `${percentageY}%` })
  }

  const handleTouchEnd = () => {
    setZoomed(false)
    setZoom(initialZoom)
  }

  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const func = (e: WheelEvent | TouchEvent) => e.preventDefault()
    containerRef.current?.addEventListener('wheel', func)
    containerRef.current?.addEventListener('touchmove', func)
    return () => {
      containerRef.current?.removeEventListener('wheel', func)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      containerRef.current?.removeEventListener('touchmove', func)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="overflow-hidden cursor-zoom-in max-w-[800px] mx-auto border border-border"
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseOut}
      onMouseOver={handleMouseOver}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      <div>
        <Image
          style={{
            transform: `scale(${zoomed ? zoom : 1})`,
            ...(zoomed && {
              transformOrigin: `${position.x} ${position.y}`,
            }),
          }}
          height={image.height}
          width={image.width}
          src={image.url}
          alt={image.altText}
          className="max-h-[500px] transition-transform duration-75 object-cover"
        />
      </div>
    </div>
  )
}
